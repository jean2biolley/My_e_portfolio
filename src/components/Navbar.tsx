"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Experience", href: "#experience" },
    { name: "Core Competencies", href: "#skills" },
    { name: "Journey", href: "#journey" },
    { name: "CV", href: "https://github.com/jean2biolley/cv/blob/main/cv_jeandebiolley.pdf", external: true },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="#home" className="text-xl font-serif font-bold text-foreground">
          JdB.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="bg-black text-white px-6 py-2.5 text-sm font-medium hover:bg-black/80 transition-colors"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md border-t border-border py-4 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="bg-black text-white px-6 py-3 text-base font-medium text-center hover:bg-black/80 transition-colors mt-2"
          >
            Get in touch
          </Link>
        </div>
      )}
    </nav>
  );
}
