from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from datetime import datetime, timezone
import json
import numpy as np
import pandas as pd
import yfinance as yf


def calculate_bs_vega(S: float, K: np.ndarray, T: float, sigma: np.ndarray, r: float = 0.045) -> np.ndarray:
    """
    Calculate Black-Scholes Vega (dollar change per 1% change in Implied Volatility).
    Vega = (S * N'(d1) * sqrt(T)) / 100
    where d1 = (ln(S / K) + (r + 0.5 * sigma^2) * T) / (sigma * sqrt(T))
    """
    T_safe = max(float(T), 1e-6)
    sigma_safe = np.maximum(sigma, 1e-6)
    sqrt_T = np.sqrt(T_safe)
    d1 = (np.log(S / K) + (r + 0.5 * sigma_safe ** 2) * T_safe) / (sigma_safe * sqrt_T)
    n_prime_d1 = (1.0 / np.sqrt(2.0 * np.pi)) * np.exp(-0.5 * d1 ** 2)
    vega = (S * n_prime_d1 * sqrt_T) / 100.0
    return vega


def build_volatility_payload(ticker_symbol: str, option_type: str = "call") -> dict:
    ticker_clean = ticker_symbol.strip().upper()
    if not ticker_clean:
        raise ValueError("Ticker parameter is required.")

    opt_type_clean = option_type.strip().lower() if option_type else "call"
    if opt_type_clean not in ("call", "put"):
        opt_type_clean = "call"

    stock = yf.Ticker(ticker_clean)

    # 1. Fetch 1 year of daily historical data
    hist = stock.history(period="1y", interval="1d")
    if hist is None or hist.empty or "Close" not in hist.columns:
        raise ValueError(f"No historical price data found for ticker '{ticker_clean}'.")

    close_prices = hist["Close"].dropna()
    if len(close_prices) < 2:
        raise ValueError(f"Insufficient historical data for ticker '{ticker_clean}'.")

    last_price = float(close_prices.iloc[-1])

    # Daily log returns
    log_returns = np.log(close_prices / close_prices.shift(1)).dropna()
    historical_vol = float(log_returns.std(ddof=1) * np.sqrt(252))
    expected_return = float(log_returns.mean() * 252)

    # 2. Fetch option chains for the next 5-10 expirations
    expirations = getattr(stock, "options", None)
    if not expirations:
        raise ValueError(f"No listed options chains available for '{ticker_clean}'.")

    selected_expirations = list(expirations[:10])
    now_utc = datetime.now(timezone.utc)

    curves = []
    all_filtered_strikes = []
    smile_data = {}

    for exp_str in selected_expirations:
        try:
            exp_dt = datetime.strptime(exp_str, "%Y-%m-%d").replace(
                hour=21, minute=0, second=0, tzinfo=timezone.utc
            )
            time_to_maturity = (exp_dt - now_utc).total_seconds() / (365.25 * 86400.0)
            if time_to_maturity <= 0:
                continue

            opt = stock.option_chain(exp_str)
            options_df = opt.puts if opt_type_clean == "put" else opt.calls
            if options_df is None or options_df.empty:
                continue

            df = options_df[["strike", "impliedVolatility"]].dropna().copy()
            # Filter out penny/illiquid options (IV < 5% or > 120%)
            df = df[(df["impliedVolatility"] >= 0.05) & (df["impliedVolatility"] <= 1.20)]
            # Filter out strikes too far from the spot price (+/- 30% around spot)
            df = df[(df["strike"] >= last_price * 0.70) & (df["strike"] <= last_price * 1.30)]

            if len(df) < 3:
                continue

            df = df.groupby("strike", as_index=False)["impliedVolatility"].mean().sort_values("strike")
            strikes = df["strike"].to_numpy(dtype=float)
            ivs = df["impliedVolatility"].to_numpy(dtype=float)

            curves.append((float(round(time_to_maturity, 4)), strikes, ivs))
            all_filtered_strikes.extend(strikes.tolist())
            smile_data[exp_str] = {
                "strikes": [round(float(s), 2) for s in strikes],
                "impliedVolatilities": [round(float(iv), 6) for iv in ivs],
            }
        except Exception:
            continue

    if len(curves) < 2 or len(all_filtered_strikes) < 3:
        raise ValueError(
            f"Insufficient clean option chain data for '{ticker_clean}' after filtering."
        )

    # Construct a regular 2D grid for Plotly's 3D Surface Plot:
    # x: 1D array of Strike prices
    # y: 1D array of Maturities (Years)
    # z: 2D array (len(y) x len(x)) of Implied Volatilities
    min_strike = float(np.percentile(all_filtered_strikes, 5))
    max_strike = float(np.percentile(all_filtered_strikes, 95))
    if max_strike <= min_strike:
        min_strike = float(min(all_filtered_strikes))
        max_strike = float(max(all_filtered_strikes))

    num_strikes = 40
    x_grid = np.linspace(min_strike, max_strike, num_strikes)
    y_grid = []
    z_grid = []
    z_vega_grid = []

    for maturity, strikes, ivs in curves:
        interpolated_iv = np.interp(x_grid, strikes, ivs)
        vega_row = calculate_bs_vega(last_price, x_grid, maturity, interpolated_iv, r=0.045)
        y_grid.append(maturity)
        z_grid.append([round(float(val), 6) for val in interpolated_iv])
        z_vega_grid.append([round(float(val), 6) for val in vega_row])

    x_list = [round(float(val), 2) for val in x_grid]

    surface_data = {
        "x": x_list,
        "y": y_grid,
        "z": z_grid,
        "z_vega": z_vega_grid,
    }

    return {
        "ticker": ticker_clean,
        "optionType": opt_type_clean,
        "lastPrice": round(last_price, 2),
        "historicalVol": round(historical_vol, 6),
        "expectedReturn": round(expected_return, 6),
        "surface": surface_data,
        "smileData": smile_data,
        "x": x_list,
        "y": y_grid,
        "z": z_grid,
        "z_vega": z_vega_grid,
    }


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_url = urlparse(self.path)
        query_params = parse_qs(parsed_url.query)
        ticker = query_params.get("ticker", [""])[0]
        option_type = query_params.get("optionType", ["call"])[0]

        if not ticker or not ticker.strip():
            self._send_json(400, {"error": "Missing required 'ticker' query parameter."})
            return

        try:
            payload = build_volatility_payload(ticker, option_type)
            self._send_json(200, payload)
        except ValueError as ve:
            self._send_json(400, {"error": str(ve)})
        except Exception as exc:
            self._send_json(
                500,
                {"error": f"Failed to fetch volatility data for '{ticker.upper()}': {str(exc)}"},
            )

    def _send_json(self, status_code: int, data: dict):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "s-maxage=300, stale-while-revalidate=600")
        self.end_headers()
        self.wfile.write(body)

