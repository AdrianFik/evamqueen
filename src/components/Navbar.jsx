import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Feather } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Navbar({ onOpenFirstChapter }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-blancoLuz/85 backdrop-blur-md border-b border-piedra/40 shadow-sm py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex flex-col text-left group">
          <span className="font-serif text-xl sm:text-2xl font-normal tracking-[0.2em] text-carbon group-hover:text-corten transition-colors">
            EVAM QUEEN
          </span>
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-grafito/60">
            Arquitectura & Literatura
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-sans tracking-widest uppercase text-grafito/80">
          <a href="#trilogia" className="hover:text-corten transition-colors">
            La trilogía
          </a>
          <a href="#libros" className="hover:text-corten transition-colors">
            Modelos 3D
          </a>
          <a href="#autora" className="hover:text-corten transition-colors">
            La autora
          </a>
          <a href="#opiniones" className="hover:text-corten transition-colors">
            Ecos de lectores
          </a>
        </nav>

        {/* Action Button & Social */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://evamqueen.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-grafito/70 hover:text-corten hover:bg-cal/50 transition-colors"
            title="Substack de Evam Queen"
          >
            <Feather className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/casasdeunavida/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-grafito/70 hover:text-corten hover:bg-cal/50 transition-colors"
            title="Instagram @casasdeunavida"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <button
            onClick={onOpenFirstChapter}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-carbon text-blancoLuz text-xs font-sans tracking-wide hover:bg-corten transition-colors shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-corten" />
            <span>Leer Cap. 1</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-carbon hover:bg-piedra/30 transition-colors"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blancoLuz/95 backdrop-blur-xl border-b border-piedra/60 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-sm font-sans tracking-wider uppercase text-grafito">
            <a
              href="#trilogia"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-corten transition-colors"
            >
              La trilogía
            </a>
            <a
              href="#libros"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-corten transition-colors"
            >
              Modelos 3D
            </a>
            <a
              href="#autora"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-corten transition-colors"
            >
              La autora
            </a>
            <a
              href="#opiniones"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-corten transition-colors"
            >
              Ecos de lectores
            </a>
          </nav>
          <div className="pt-4 border-t border-piedra/40 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFirstChapter();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-carbon text-blancoLuz text-xs font-sans uppercase tracking-widest hover:bg-corten transition-colors"
            >
              <BookOpen className="w-4 h-4 text-corten" />
              <span>Leer capítulo 1</span>
            </button>
            <div className="flex justify-center gap-4 pt-2">
              <a
                href="https://evamqueen.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-grafito/80 hover:text-corten"
              >
                <Feather className="w-4 h-4" />
                <span>Substack</span>
              </a>
              <a
                href="https://www.instagram.com/casasdeunavida/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-grafito/80 hover:text-corten"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>@casasdeunavida</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
