import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, ZoomIn, ZoomOut, Bookmark } from 'lucide-react';
import { chaptersData } from '../data/chaptersData';

export default function ChapterReaderModal({ bookId, onClose }) {
  const [fontSize, setFontSize] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 640 ? 16 : 19));
  const chapter = chaptersData[bookId];

  // Default to Chapter 1 start page if available
  const initialPage = bookId === 'book1' ? 6 : 8; // 0-indexed: Book 1 pg 7, Book 2 pg 9
  const [currentPage, setCurrentPage] = useState(initialPage);

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

  // Bookmarks / Quick sections
  const quickSections = bookId === 'book1' 
    ? [
        { label: 'Portada', page: 0 },
        { label: 'Dedicatoria', page: 3 },
        { label: 'Prefacio', page: 4 },
        { label: 'Capítulo 1', page: 6 }
      ]
    : [
        { label: 'Portada', page: 1 },
        { label: 'Dedicatoria', page: 4 },
        { label: 'Prefacio', page: 5 },
        { label: 'Capítulo 1', page: 8 }
      ];

  // Clean raw page text by removing repetitive running headers
  const formatPageContent = (text) => {
    if (!text) return '';
    const lines = text.split('\n');
    const filtered = lines.filter(l => {
      const trim = l.trim();
      return (
        trim !== 'EVAM QUEEN' &&
        trim !== 'CASAS DE UNA VIDA' &&
        trim !== 'RUTAS DE FUEGO Y VIENTO' &&
        !/^\d+$/.test(trim) // remove standalone page number lines
      );
    });
    return filtered.join('\n').trim();
  };

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

        {/* Quick Section Jump Pills */}
        <div className="px-6 py-2 border-b border-piedra/30 bg-cal/30 flex items-center gap-2 overflow-x-auto text-xs font-sans">
          <span className="text-grafito/50 flex items-center gap-1 text-[11px] uppercase tracking-wider mr-1">
            <Bookmark className="w-3 h-3 text-corten" />
            Sección:
          </span>
          {quickSections.map((sec) => (
            <button
              key={sec.label}
              onClick={() => setCurrentPage(sec.page)}
              className={`px-3 py-1 rounded-lg border transition-colors ${
                currentPage >= sec.page && 
                (quickSections.find((_, i) => i > quickSections.indexOf(sec))?.page > currentPage || sec === quickSections[quickSections.length - 1])
                  ? 'bg-carbon text-blancoLuz border-carbon shadow-sm'
                  : 'bg-blancoLuz/80 text-grafito/80 border-piedra/50 hover:border-corten'
              }`}
            >
              {sec.label}
            </button>
          ))}
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
              className="font-serif text-carbon/90 whitespace-pre-line select-text"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.75 }}
            >
              {formatPageContent(chapter.pages[currentPage]) || (
                <div className="text-center italic text-grafito/50 py-12">
                  (Página en blanco o portadilla)
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
