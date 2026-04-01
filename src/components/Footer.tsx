import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white text-sm py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="font-serif italic font-bold text-lg text-foreground mb-1 block">JdB.</span>
          <p className="text-foreground/60 w-full max-w-sm">From student to sell-side analyst</p>
        </div>

        <div className="flex gap-6 items-center flex-wrap">
          <a
            href="https://www.linkedin.com/in/jean-de-biolley-843099223/"

            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
          <a
            href="https://github.com/jean2biolley"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors"
          >
            <Github size={18} /> GitHub
          </a>
          <a
            href="mailto:jean2biolley@gmail.com"
            className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors"
          >
            <Mail size={18} /> jean2biolley@gmail.com
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-muted/50 text-center md:text-left text-xs text-foreground/40 font-medium tracking-wider uppercase">
        © {new Date().getFullYear()} Jean de Biolley. All rights reserved.
      </div>
    </footer>
  );
}
