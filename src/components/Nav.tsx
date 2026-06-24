"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import BookDetectionModal from "./BookDetectionModal";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [detectionOpen, setDetectionOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5E7E0]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" aria-label="VideLivre accueil">
            <Logo className="h-8 w-auto" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#comment-ca-marche"
              className="text-sm font-medium text-[#374151] hover:text-[#1B4332] transition-colors"
            >
              Comment ça marche
            </a>
            <a
              href="#fonctionnalites"
              className="text-sm font-medium text-[#374151] hover:text-[#1B4332] transition-colors"
            >
              Fonctionnalités
            </a>

            {/* Test rapide button */}
            <button
              onClick={() => setDetectionOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              Tester la détection
            </button>

            <a
              href="#beta"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-[#1B4332] text-white hover:bg-[#2D6A4F] transition-colors shadow-sm"
            >
              Accéder à la beta
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#E5E7E0] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-[#1B4332] transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-[#1B4332] transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-[#1B4332] transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[#E5E7E0] px-6 py-4 flex flex-col gap-4">
            <a href="#comment-ca-marche" className="text-sm font-medium text-[#374151]" onClick={() => setMenuOpen(false)}>Comment ça marche</a>
            <a href="#fonctionnalites" className="text-sm font-medium text-[#374151]" onClick={() => setMenuOpen(false)}>Fonctionnalités</a>
            <button
              onClick={() => { setMenuOpen(false); setDetectionOpen(true); }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border-2 border-[#1B4332] text-[#1B4332]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              Tester la détection
            </button>
            <a href="#beta" className="inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-[#1B4332] text-white" onClick={() => setMenuOpen(false)}>
              Accéder à la beta
            </a>
          </div>
        )}
      </header>

      {detectionOpen && <BookDetectionModal onClose={() => setDetectionOpen(false)} />}
    </>
  );
}
