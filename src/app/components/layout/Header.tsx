"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Gallery", href: "/gallery" },
  { label: "Prices for services", href: "/prices" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`px-6 py-5 md:px-12 ${
        transparent ? "bg-transparent" : "bg-card-brown rounded-b-3xl"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
  <Image
    src="/logo.png"
    alt="BIO CWT"
    width={160}
    height={64}
    className="h-10 md:h-12 w-auto brightness-0 invert"
  />
</Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground font-semibold hover:text-accent-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <MenuIcon />
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden flex flex-col gap-4 mt-6 pb-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function LogoIcon() {
  return (
    <div className="w-10 h-10 border-2 border-foreground rounded-lg flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path d="M0 10 Q10 5 20 15 T40 12" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M0 20 Q12 15 20 25 T40 22" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M0 30 Q10 25 20 32 T40 30" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h12M4 12h16M4 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}