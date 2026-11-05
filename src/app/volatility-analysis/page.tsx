"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import type Plotly from "plotly.js-dist-min";
import {
  ArrowLeft,
  Search,
  Loader2,
  Activity,
  AlertCircle,
} from "lucide-react";
import Footer from "@/components/Footer";

interface SurfaceData {
  x: number[];
  y: number[];
  z: number[][];
}

interface VolatilityResponse {
  ticker?: string;
  lastPrice: number;
  historicalVol: number;
  expectedReturn: number;
  surface?: SurfaceData;
  x?: number[];
  y?: number[];
  z?: number[][];
  error?: string;
}

export default function VolatilityAnalysisPage() {
  const [ticker, setTicker] = useState<string>("AAPL");
  const [activeTicker, setActiveTicker] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VolatilityResponse | null>(null);
  const plotContainerRef = useRef<HTMLDivElement | null>(null);

  const fetchVolatilityData = async (symbol: string) => {
    const cleanTicker = symbol.trim().toUpperCase();
    if (!cleanTicker) {
      setError("Please enter a valid stock ticker (e.g., AAPL).");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/volatility?ticker=${encodeURIComponent(cleanTicker)}`
      );
      const result: VolatilityResponse = await response.json();

      if (!response.ok || result.error) {
        throw new Error(
          result.error || `Unable to retrieve data for ${cleanTicker}.`
        );
      }

      setData(result);
      setActiveTicker(result.ticker || cleanTicker);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while fetching option surface data.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchVolatilityData(ticker);
  };

  // Render interactive 3D Surface Plot with Plotly.js when data updates
  useEffect(() => {
    if (!data || !plotContainerRef.current) return;

    const surface = data.surface || {
      x: data.x || [],
      y: data.y || [],
      z: data.z || [],
    };

    if (!surface.x.length || !surface.y.length || !surface.z.length) return;

    let isMounted = true;
    const container = plotContainerRef.current;

    import("plotly.js-dist-min").then((PlotlyModule) => {
      if (!isMounted || !container) return;
      const Plotly = PlotlyModule.default || PlotlyModule;

      const colorscale: [number, string][] = [
        [0, "#f5ebe1"],
        [0.25, "#c59b76"],
        [0.5, "#8c5c32"],
        [0.75, "#5c3d20"],
        [1, "#2a190b"],
      ];

      const trace = {
        type: "surface" as const,
        x: surface.x,
        y: surface.y,
        z: surface.z,
        colorscale,
        colorbar: {
          title: {
            text: "Implied Vol",
            font: { family: "Inter, sans-serif", size: 12, color: "#1F1F1F" },
          },
          tickformat: ".0%",
          thickness: 16,
          len: 0.75,
        },
        contours: {
          z: {
            show: true,
            usecolormap: true,
            highlightcolor: "#4A3018",
            project: { z: true },
          },
        },
        hovertemplate:
          "<b>Strike (X):</b> $%{x:.2f}<br>" +
          "<b>Maturity (Y):</b> %{y:.2f} yrs<br>" +
          "<b>Implied Vol (Z):</b> %{z:.2%}<extra></extra>",
      } as unknown as Plotly.Data;

      const layout: Partial<Plotly.Layout> = {
        autosize: true,
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        margin: { l: 10, r: 10, b: 10, t: 40 },
        title: {
          text: `${activeTicker} — Implied Volatility Surface (Call Options)`,
          font: {
            family: "Playfair Display, Georgia, serif",
            size: 18,
            color: "#1F1F1F",
          },
        },
        scene: {
          xaxis: {
            title: { text: "Strike Price ($)" },
            gridcolor: "#e5e5e5",
            zerolinecolor: "#e5e5e5",
            showbackground: true,
            backgroundcolor: "#fafafa",
          },
          yaxis: {
            title: { text: "Maturity (Years)" },
            gridcolor: "#e5e5e5",
            zerolinecolor: "#e5e5e5",
            showbackground: true,
            backgroundcolor: "#fafafa",
          },
          zaxis: {
            title: { text: "Implied Volatility" },
            tickformat: ".0%",
            gridcolor: "#e5e5e5",
            zerolinecolor: "#e5e5e5",
            showbackground: true,
            backgroundcolor: "#fafafa",
          },
          camera: {
            eye: { x: 1.55, y: -1.65, z: 1.15 },
          },
        },
      };

      const config: Partial<Plotly.Config> = {
        responsive: true,
        displaylogo: false,
        modeBarButtonsToRemove: ["resetCameraLastSave3d"],
      };

      Plotly.newPlot(container, [trace], layout, config);
    });

    return () => {
      isMounted = false;
      import("plotly.js-dist-min")
        .then((PlotlyModule) => {
          const Plotly = PlotlyModule.default || PlotlyModule;
          if (container) {
            Plotly.purge(container);
          }
        })
        .catch(() => { });
    };
  }, [data, activeTicker]);

  // Formatters
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);

  const formatPercent = (val: number) => `${(val * 100).toFixed(2)}%`;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Top Minimal Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border/60 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/#experience"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/75 hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            Alpha Capital Junior • Quantitative Tool
          </span>
        </div>
      </header>

      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-12 md:py-16">
        {/* Title & Description */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-4">
            Volatility Analysis
          </h1>
          <div className="h-0.5 w-16 bg-accent opacity-50 mb-5" />
          <p className="text-foreground/70 leading-relaxed text-base">
            Analyze 1-year realized historical volatility, annualized expected log
            return, and the 3D implied volatility term-structure across strike
            prices and option maturities.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="bg-muted/40 border border-border p-6 rounded-sm mb-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
          >
            <div className="relative flex-grow">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40"
              />
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                placeholder="Enter stock ticker (e.g., AAPL, MSFT, NVDA, SPY)"
                aria-label="Stock Ticker"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-border focus:border-accent focus:outline-none text-foreground font-mono uppercase tracking-wider text-sm rounded-sm transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-accent text-white font-medium text-sm tracking-wide hover:bg-accent-hover disabled:opacity-60 transition-all duration-300 rounded-sm inline-flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Fetching...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>

          {/* Quick presets */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-foreground/60">
            <span className="uppercase tracking-wider font-medium mr-1">
              Quick tickers:
            </span>
            {["AAPL", "MSFT", "NVDA", "SPY", "TSLA"].map((preset) => (
              <button
                key={preset}
                type="button"
                disabled={loading}
                onClick={() => {
                  setTicker(preset);
                  fetchVolatilityData(preset);
                }}
                className="px-2.5 py-1 bg-white border border-border hover:border-accent hover:text-accent font-mono rounded-sm transition-colors disabled:opacity-50"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-10 p-5 bg-red-50/80 border border-red-200 text-red-900 rounded-sm flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold">Unable to load volatility analysis</p>
              <p className="text-red-800/90 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Loading Skeleton State */}
        {loading && (
          <div className="space-y-8 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="bg-white border border-border p-6 rounded-sm h-32 flex flex-col justify-between"
                >
                  <div className="h-3 w-36 bg-muted rounded" />
                  <div className="h-8 w-28 bg-muted rounded" />
                  <div className="h-2.5 w-24 bg-muted/70 rounded" />
                </div>
              ))}
            </div>
            <div className="bg-white border border-border rounded-sm h-[560px] flex flex-col items-center justify-center gap-3">
              <Loader2 size={32} className="animate-spin text-accent" />
              <p className="text-sm text-foreground/60 font-medium">
                Fetching 1Y price history & option chains for {ticker.trim().toUpperCase()}...
              </p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {!loading && data && (
          <div className="space-y-10">
            {/* Three Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Metric 1: Last Stock Price */}
              <div className="bg-white border border-foreground/10 p-7 rounded-sm shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                <div className="text-foreground/60 text-xs uppercase tracking-widest font-semibold mb-3">
                  Last Stock Price
                </div>
                <div className="text-3xl font-serif font-medium text-foreground">
                  {formatCurrency(data.lastPrice)}
                </div>
                <p className="text-xs text-foreground/50 mt-2">
                  Latest closing spot price ({activeTicker})
                </p>
              </div>

              {/* Metric 2: Historical Standard Deviation (Annualized) */}
              <div className="bg-white border border-foreground/10 p-7 rounded-sm shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                <div className="text-foreground/60 text-xs uppercase tracking-widest font-semibold mb-3">
                  Historical Std Dev (Annualized)
                </div>
                <div className="text-3xl font-serif font-medium text-foreground">
                  {formatPercent(data.historicalVol)}
                </div>
                <p className="text-xs text-foreground/50 mt-2">
                  1Y daily log returns • σ × √252
                </p>
              </div>

              {/* Metric 3: Expected Return (Based on historical data) */}
              <div className="bg-white border border-foreground/10 p-7 rounded-sm shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                <div className="text-foreground/60 text-xs uppercase tracking-widest font-semibold mb-3">
                  Expected Return (Annualized)
                </div>
                <div
                  className={`text-3xl font-serif font-medium ${data.expectedReturn >= 0
                    ? "text-emerald-800"
                    : "text-red-800"
                    }`}
                >
                  {data.expectedReturn >= 0 ? "+" : ""}
                  {formatPercent(data.expectedReturn)}
                </div>
                <p className="text-xs text-foreground/50 mt-2">
                  1Y mean daily log return × 252
                </p>
              </div>
            </div>

            {/* 3D Implied Volatility Surface Plot Container */}
            <div className="bg-white border border-foreground/10 rounded-sm shadow-sm p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-2 border-b border-border/60">
                <div>
                  <h2 className="text-xl font-serif font-medium text-foreground">
                    3D Implied Volatility Surface
                  </h2>
                  <p className="text-xs text-foreground/60 mt-0.5">
                    Filtered call options (5% ≤ IV ≤ 120%, strikes within ±30% of
                    spot) across upcoming expirations. Drag to rotate, scroll to
                    zoom.
                  </p>
                </div>
                <span className="text-xs font-mono uppercase px-3 py-1 bg-muted border border-border rounded-sm text-foreground/70 self-start sm:self-auto">
                  Ticker: {activeTicker}
                </span>
              </div>

              <div
                ref={plotContainerRef}
                className="w-full h-[560px] md:h-[640px]"
              />
            </div>
          </div>
        )}

        {/* Empty Initial State */}
        {!loading && !data && !error && (
          <div className="bg-white border border-border/80 rounded-sm p-12 text-center">
            <Activity
              size={36}
              className="mx-auto text-accent/60 mb-4"
              strokeWidth={1.5}
            />
            <h2 className="text-xl font-serif font-medium text-foreground mb-2">
              Ready to Model Implied Volatility
            </h2>
            <p className="text-sm text-foreground/60 max-w-md mx-auto">
              Enter a stock ticker above and click <strong>Submit</strong> to
              compute 1-year historical metrics and render the interactive 3D
              implied volatility surface.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
