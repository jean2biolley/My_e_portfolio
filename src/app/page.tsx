import Image from "next/image";
import { ArrowRight, Download, Brain, Code, Network, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* --- HERO SECTION --- */}
        <section
          id="home"
          className="relative max-w-6xl mx-auto px-6 py-24 md:py-36 grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6 order-2 md:order-1 z-10">
            <h2 className="text-accent uppercase tracking-[0.2em] font-medium text-sm">
              From student to sell-side analyst
            </h2>
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] text-foreground">
              Jean <br /> <span className="italic font-light">de</span> Biolley
            </h1>
            <p className="text-foreground/75 leading-relaxed max-w-lg text-lg">
              Master in Business Engineering student at LSM with experience in
              Financial Analytics. Native trilingual (FR/ES/EN) applying
              stochastic modeling to derivatives pricing. Aspiring to launch my
              career as a Trading floor intern from February to June 2027.
            </p>
            <div className="pt-6 flex flex-wrap gap-4">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white font-medium hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg rounded-sm"
              >
                Explore Experience <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-border text-foreground font-medium hover:border-foreground transition-all duration-300 rounded-sm"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
            <div className="absolute inset-0 bg-muted/60 blur-3xl rounded-full translate-x-12 translate-y-12 h-[300px] w-[300px] md:h-[400px] md:w-[400px] -z-10" />
            <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] overflow-hidden rounded-sm border border-border shadow-2xl bg-muted flex items-center justify-center group overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              {/* Fallback pattern / Placeholder for image */}
              <div className="absolute inset-0 opacity-10 flex items-center justify-center text-[10rem] font-serif font-black text-foreground select-none">
                JdB
              </div>
              <div className="z-10 px-8 text-center delay-100 transition-opacity">
                <span className="text-sm uppercase tracking-widest text-foreground/50 border border-foreground/30 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm shadow-sm group-hover:opacity-0 transition-opacity">
                  [ Headshot Placeholder ]
                </span>
              </div>
              {/* <Image src="/headshot.jpg" alt="Jean de Biolley" fill className="object-cover" /> */}
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE SECTION --- */}
        <section id="experience" className="bg-muted/30 py-24 md:py-36 border-y border-border/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-4xl font-serif font-medium text-foreground mb-4">
                Experience & Proof of Work
              </h2>
              <div className="h-0.5 w-16 bg-accent opacity-50" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative">
              {/* Card 1 */}
              <div className="group bg-white p-10 border border-foreground/10 hover:border-foreground/30 transition-all duration-500 shadow-sm hover:shadow-xl rounded-sm flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-0 bg-accent transition-all duration-500 group-hover:h-full" />
                <div>
                  <h3 className="text-accent text-sm font-semibold tracking-wider uppercase mb-2">Alpha Capital Jr.</h3>
                  <h4 className="text-2xl font-serif font-medium mb-6 text-foreground drop-shadow-sm group-hover:translate-x-1 transition-transform">
                    Sell-side Analyst
                  </h4>
                  <ul className="space-y-4 text-foreground/75 text-base relative">
                    <li className="flex items-start">
                      <span className="mr-3 text-accent mt-1 opacity-70">❖</span>
                      <span>Developing quantitative models in Python for stochastic volatility frameworks.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-accent mt-1 opacity-70">❖</span>
                      <span>Forecasting expected future volatility to identify high-potential trading structures.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-12">
                  <button className="w-full py-4 px-6 bg-transparent border-2 border-accent text-accent font-medium hover:bg-accent hover:text-white transition-all duration-300 rounded-sm inline-flex justify-center items-center gap-2 group-hover:shadow-md">
                    View Volatility Forecast Models <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group bg-white p-10 border border-foreground/10 hover:border-foreground/30 transition-all duration-500 shadow-sm hover:shadow-xl rounded-sm flex flex-col justify-between h-full relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-0 h-1 bg-foreground transition-all duration-500 group-hover:w-full" />
                <div>
                  <h3 className="text-foreground/60 text-sm font-semibold tracking-wider uppercase mb-2">Apis Asset Management</h3>
                  <h4 className="text-2xl font-serif font-medium mb-6 text-foreground hover:text-foreground/80 drop-shadow-sm group-hover:translate-x-1 transition-transform">
                    Financial Analyst Intern
                  </h4>
                  <ul className="space-y-4 text-foreground/75 text-base relative">
                    <li className="flex items-start">
                      <span className="mr-3 text-foreground/40 mt-1 opacity-70">❖</span>
                      <span>Maintained and optimized a comprehensive peer group database analyzing 270+ competitors.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-foreground/40 mt-1 opacity-70">❖</span>
                      <span>Analyzed potential investments strictly aligned with global asset allocation strategies and emerging markets.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 text-foreground/40 text-sm uppercase tracking-widest text-right italic relative">
                  <span className="group-hover:text-accent transition-colors duration-300 inline-block group-hover:-translate-x-2">Proof of Impact &rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- JOURNEY SECTION --- */}
        <section id="journey" className="py-24 md:py-36 bg-background relative overflow-hidden">
          <div className="absolute -left-32 top-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
          
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-4xl font-serif font-medium text-foreground mb-4">
                The Journey
              </h2>
              <div className="h-0.5 w-16 bg-accent opacity-50" />
            </div>

            <div className="grid lg:grid-cols-12 gap-16">
              {/* Education Timeline */}
              <div className="lg:col-span-7">
                <h3 className="text-lg font-medium text-foreground/50 uppercase tracking-widest mb-10 flex items-center gap-3">
                  <Brain className="text-accent" size={20} /> Formal Education
                </h3>
                
                <div className="relative border-l border-border/60 ml-3 md:ml-0 space-y-12">
                  <div className="relative pl-8 md:pl-10 group">
                    <div className="absolute -left-[5px] top-1.5 w-[10px] h-[10px] rounded-full bg-accent ring-4 ring-white shadow-sm transition-transform group-hover:scale-150" />
                    <span className="text-xs font-bold text-accent/80 tracking-widest uppercase mb-2 block">2025 — 2027</span>
                    <h4 className="text-xl font-serif font-medium text-foreground">
                      Master's in Business Engineering
                    </h4>
                    <p className="text-sm text-foreground/60 mb-3">Louvain School of Management (LSM)</p>
                    <p className="text-foreground/80 bg-muted/40 p-4 border-l-2 border-accent/30 text-sm rounded-sm backdrop-blur-sm">
                      <span className="block font-medium mb-1 text-accent">Key Focus:</span>
                      Advanced quantitative modules, notably <strong>Derivatives Pricing</strong> (Mastery of Options payoff replication via BSM and GBM) and <strong>Stochastic Calculus</strong>.
                    </p>
                  </div>

                  <div className="relative pl-8 md:pl-10 group mt-10">
                    <div className="absolute -left-[5px] top-1.5 w-[10px] h-[10px] rounded-full bg-foreground/30 ring-4 ring-white transition-colors group-hover:bg-foreground" />
                    <span className="text-xs font-bold text-foreground/40 tracking-widest uppercase mb-2 block">Foundational</span>
                    <h4 className="text-xl font-serif font-medium text-foreground">
                      Bachelor's Degree
                    </h4>
                    <p className="text-sm text-foreground/60">UCLouvain</p>
                    <p className="text-foreground/75 text-sm mt-3">Rigor in mathematics, economics, and business fundamentals establishing a strong analytic baseline.</p>
                  </div>
                </div>
              </div>

              {/* Tools & Leadership */}
              <div className="lg:col-span-5 space-y-16">
                
                {/* Tech & Tools */}
                <div>
                  <h3 className="text-lg font-medium text-foreground/50 uppercase tracking-widest mb-8 flex items-center gap-3">
                    <Code className="text-accent" size={20} /> Technical Toolkit
                  </h3>
                  <div className="flex flex-wrap gap-2 group cursor-default">
                    {["Python", "R", "Bloomberg Terminal", "AWS", "LaTeX", "Excel Macros / Solver"].map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-4 py-2 border text-sm font-medium transition-all duration-300 rounded-sm hover:-translate-y-1 hover:shadow-md ${
                          skill === "Python" || skill === "Bloomberg Terminal"
                            ? "bg-foreground text-white border-foreground"
                            : "bg-white text-foreground/80 border-border hover:border-foreground/30"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex items-start gap-4 p-5 bg-muted/30 border border-border/50 rounded-sm transition-colors hover:border-accent/40 hover:bg-muted/50">
                    <div className="mt-1">
                      <Trophy className="text-accent" size={24} />
                    </div>
                    <div>
                      <h4 className="font-serif font-medium text-lg">Bloomberg Market Concepts</h4>
                      <p className="text-xs text-foreground/60 uppercase tracking-wider mt-1">Certification Completed</p>
                    </div>
                  </div>
                </div>

                {/* Leadership */}
                <div>
                  <h3 className="text-lg font-medium text-foreground/50 uppercase tracking-widest mb-8 flex items-center gap-3">
                    <Network className="text-accent" size={20} /> Leadership & Character
                  </h3>
                  <div className="space-y-6 text-sm">
                    <div className="group border-b border-border/40 pb-4 transition-all hover:bg-muted/20 hover:px-2 rounded-sm -mx-2 px-2 pt-2">
                       <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">Customer Experience Management</h4>
                       <p className="text-foreground/60 mt-1">AIESEC — Orchestrated international youth exchange processes.</p>
                    </div>
                    <div className="group border-b border-border/40 pb-4 transition-all hover:bg-muted/20 hover:px-2 rounded-sm -mx-2 px-2 pt-2">
                       <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">Scouts d'Europe</h4>
                       <p className="text-foreground/60 mt-1">5+ years organizing camps, instilling resilience, teamwork, and structured planning in youth.</p>
                    </div>
                    <div className="group pb-2 transition-all hover:bg-muted/20 hover:px-2 rounded-sm -mx-2 px-2 pt-2">
                       <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">Red Cross Volunteering</h4>
                       <p className="text-foreground/60 mt-1">Dedicated to active community service and crisis support.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="py-24 md:py-36 bg-foreground text-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-medium mb-4">
                Open to Opportunities
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Seeking a Trading floor internship from February to June 2027.
                Available for networking, discussions on derivatives, and analytical challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-12 bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm backdrop-blur-sm shadow-2xl relative overflow-hidden">
              <div className="absolute -right-32 -top-32 w-64 h-64 bg-accent/30 rounded-full blur-3xl -z-10" />
              
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-lg font-serif mb-2">Email Direct</h3>
                  <a href="mailto:jean2biolley@gmail.com" className="text-white/70 hover:text-accent transition-colors text-sm break-all font-mono">
                    jean2biolley@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-serif mb-2">Phone</h3>
                  <a href="tel:+32484825199" className="text-white/70 hover:text-accent transition-colors text-sm font-mono">
                    +32 484 82 51 99
                  </a>
                </div>
                <div className="pt-8">
                   <p className="text-xs uppercase tracking-widest text-white/30 font-bold mb-4">Location</p>
                   <p className="text-white/80 font-medium font-serif">Brussels, Belgium</p>
                </div>
              </div>

              <div className="md:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
