import React, { useState } from 'react';
import { booksData } from '../data/booksData';
import Book3DViewer from './Book3DViewer';
import { BookOpen, ExternalLink, Sparkles, ArrowUpRight, CheckCircle2, Calendar } from 'lucide-react';

export default function TrilogyShowcase({ onOpenChapter }) {
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const currentBook = booksData[selectedBookIndex];

  return (
    <section id="libros" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Subtitle / Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-sans tracking-widest uppercase bg-corten/10 text-corten border border-corten/20 mb-3">
          Modelos tridimensionales · trilogía
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-normal text-carbon tracking-tight mb-4">
          La trilogía en el espacio
        </h2>
        <p className="font-sans text-sm md:text-base text-grafito/80 leading-relaxed">
          Explora los volúmenes de la saga como piezas arquitectónicas. Puedes rotar cada libro 360°,
          inspeccionar sus cubiertas, examinar sus planos y adentrarte en sus primeros capítulos.
        </p>
      </div>

      {/* Book Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
        {booksData.map((book, idx) => {
          const isSelected = selectedBookIndex === idx;
          return (
            <button
              key={book.id}
              onClick={() => setSelectedBookIndex(idx)}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm font-sans transition-all duration-300 ${
                isSelected
                  ? 'bg-carbon text-blancoLuz border-carbon shadow-architectural scale-[1.02]'
                  : 'bg-blancoLuz/80 text-grafito border-piedra/60 hover:border-corten hover:bg-cal/40'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-serif font-bold ${
                isSelected ? 'bg-corten text-blancoLuz' : 'bg-piedra/60 text-carbon'
              }`}>
                {book.roman}
              </span>
              <div className="text-left">
                <div className="font-medium leading-none">{book.title}</div>
                <div className={`text-[11px] mt-1 ${isSelected ? 'text-stone-300' : 'text-grafito/60'}`}>
                  {book.status}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-blancoLuz/70 rounded-3xl p-6 md:p-10 border border-piedra/50 shadow-architectural">
        {/* Left Column: 3D Book Viewer */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <Book3DViewer
            currentBook={currentBook}
            onOpenChapter={() => onOpenChapter(currentBook.id)}
          />
        </div>

        {/* Right Column: Architectural Dossier / Book Details */}
        <div className="lg:col-span-6 space-y-6">
          {/* Status & Series Info */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-sans font-medium border ${currentBook.statusBadge}`}>
              {currentBook.yearLabel}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-sans bg-cal border border-piedra text-grafito/80">
              Elemento: {currentBook.element}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div>
            <span className="text-xs uppercase tracking-widest text-corten font-sans block mb-1">
              Volumen {currentBook.roman} · Trilogía Tierra · Metal · Sangre
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-carbon font-normal leading-tight">
              {currentBook.title}
            </h3>
            <p className="font-serif italic text-lg text-terracota mt-1">
              {currentBook.subtitle}
            </p>
          </div>

          {/* Core Quote */}
          <blockquote className="pl-4 border-l-2 border-corten py-1">
            <p className="font-serif italic text-base md:text-lg text-carbon/90 leading-relaxed">
              "{currentBook.quote}"
            </p>
          </blockquote>

          {/* Synopsis */}
          <div className="text-sm font-sans text-grafito/90 leading-relaxed space-y-3">
            <p>{currentBook.synopsis}</p>
            <p className="text-xs text-grafito/70 italic bg-cal/50 p-3 rounded-lg border-l-2 border-piedra">
              {currentBook.closingNote}
            </p>
          </div>

          {/* Themes Pills */}
          <div>
            <span className="text-xs font-sans uppercase tracking-wider text-grafito/60 block mb-2">
              Ejes temáticos:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentBook.themes.map((theme, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-sans bg-piedra/30 text-carbon/80 border border-piedra/40"
                >
                  #{theme}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            {/* Primary Action */}
            <a
              href={currentBook.primaryCtaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-corten text-blancoLuz text-sm font-sans font-medium hover:bg-carbon transition-all duration-300 shadow-corten hover:shadow-architectural"
            >
              <span>{currentBook.primaryCtaText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Secondary Action: Read Chapter 1 or Substack */}
            {currentBook.hasChapter ? (
              <button
                onClick={() => onOpenChapter(currentBook.id)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blancoLuz border border-piedra text-carbon text-sm font-sans font-medium hover:border-corten hover:text-corten transition-all duration-300"
              >
                <BookOpen className="w-4 h-4 text-corten" />
                <span>{currentBook.secondaryCtaText}</span>
              </button>
            ) : (
              <a
                href="https://evamqueen.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blancoLuz border border-piedra text-carbon text-sm font-sans font-medium hover:border-corten hover:text-corten transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-corten" />
                <span>{currentBook.secondaryCtaText}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
