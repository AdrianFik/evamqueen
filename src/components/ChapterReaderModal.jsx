import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, ZoomIn, ZoomOut } from 'lucide-react';
import { chaptersData } from '../data/chaptersData';

export default function ChapterReaderModal({ bookId, onClose }) {
  const [fontSize, setFontSize] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 640 ? 16 : 19));
  const chapter = chaptersData[bookId];

  // Chapter 1 starts at page 0 (sample is only Chapter 1)
  const [currentPage, setCurrentPage] = useState(0);

  // Close on Escape key and handle arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && chapter && currentPage < chapter.pages.length - 1) {
        setCurrentPage(p => p + 1);
      }
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        setCurrentPage(p => p - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, chapter, onClose]);

  if (!chapter) return null;

  const paragraphs = (chapter.pages[currentPage] || '')
    .split('\n\n')
    .map(p => p.trim())
    .filter(Boolean);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/80 backdrop-blur-md p-2 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      {/* Reader Container */}
      <div 
        className="relative w-full max-w-4xl h-[92vh] sm:h-[85vh] max-h-[820px] flex flex-col rounded-2xl sm:rounded-3xl bg-[#FAF6EF] text-[#1C1B1A] border border-piedra/60 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Architectural Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-piedra/40 bg-cal/60">
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden">
            <div className="p-1.5 sm:p-2 rounded-xl bg-corten/10 text-corten shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-medium tracking-wide text-carbon truncate">
                {chapter.title}
              </h3>
              <p className="text-[11px] sm:text-xs font-sans text-grafito/70 uppercase tracking-wider truncate">
                {chapter.subtitle}
              </p>
            </div>
          </div>

          {/* Controls: Font size & Close */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="flex items-center border border-piedra/60 rounded-xl p-0.5 sm:p-1 bg-blancoLuz/80 shadow-sm">
              <button
                onClick={() => setFontSize(s => Math.max(14, s - 2))}
                className="p-1 text-grafito/70 hover:text-corten transition-colors"
                title="Reducir fuente"
              >
                <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <span className="text-[11px] sm:text-xs px-1 sm:px-2 font-mono text-grafito/60">{fontSize}px</span>
              <button
                onClick={() => setFontSize(s => Math.min(26, s + 2))}
                className="p-1 text-grafito/70 hover:text-corten transition-colors"
                title="Aumentar fuente"
              >
                <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl text-grafito/60 hover:text-carbon hover:bg-piedra/30 transition-colors"
              aria-label="Cerrar visor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reading Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-12 md:px-20 py-5 sm:py-8 space-y-4 sm:space-y-6">
          <div className="max-w-2xl mx-auto">
            {/* Page indicator */}
            <div className="text-center mb-4 sm:mb-6">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-corten font-sans font-medium">
                Página {currentPage + 1} de {chapter.pages.length}
              </span>
              <div className="w-12 h-0.5 bg-corten/30 mx-auto mt-1.5 sm:mt-2" />
            </div>

            {/* Current Page Content */}
            <div 
              className="font-serif text-carbon/90 select-text space-y-4 text-left sm:text-justify leading-relaxed"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
            >
              {currentPage === 0 && (
                <div className="text-center mb-8 pb-5 border-b border-piedra/40">
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-corten font-sans font-semibold block mb-2">
                    Capítulo 1
                  </span>
                  <h4 className="font-serif text-2xl sm:text-4xl font-bold text-carbon tracking-tight">
                    {chapter.chapterTitle || (bookId === 'book1' ? 'El porche de los sucesos' : 'El Viento de Roma')}
                  </h4>
                </div>
              )}

              {paragraphs.length > 0 ? (
                paragraphs.map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))
              ) : (
                <div className="text-center italic text-grafito/50 py-12">
                  (Página en blanco)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation Toolbar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-4 border-t border-piedra/40 bg-cal/60 gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-sans font-medium transition-all ${
              currentPage === 0
                ? 'text-grafito/30 cursor-not-allowed'
                : 'text-carbon bg-blancoLuz border border-piedra hover:border-corten hover:text-corten shadow-sm'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline sm:inline">Página anterior</span>
            <span className="xs:hidden sm:hidden">Anterior</span>
          </button>

          {/* Quick Page Indicator */}
          <span className="font-mono text-xs text-grafito/60">
            {currentPage + 1} / {chapter.pages.length}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(chapter.pages.length - 1, p + 1))}
            disabled={currentPage === chapter.pages.length - 1}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-sans font-medium transition-all ${
              currentPage === chapter.pages.length - 1
                ? 'text-grafito/30 cursor-not-allowed'
                : 'text-carbon bg-blancoLuz border border-piedra hover:border-corten hover:text-corten shadow-sm'
            }`}
          >
            <span className="hidden xs:inline sm:inline">Siguiente página</span>
            <span className="xs:hidden sm:hidden">Siguiente</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
