import React, { useState } from 'react';
import { testimonialsData } from '../data/testimonialsData';
import { MessageCircle, ZoomIn, X, Heart } from 'lucide-react';

export default function ReaderOpinions() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="opiniones" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans tracking-widest uppercase bg-cal border border-piedra text-grafito/80">
          <MessageCircle className="w-3.5 h-3.5 text-corten" />
          Ecos de lectores · autenticidad
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-carbon">
          Las palabras que llegan de vuelta
        </h2>
        <p className="font-sans text-sm sm:text-base text-grafito/80 max-w-2xl mx-auto leading-relaxed">
          Los libros cobran vida cuando alguien los habita. Mensajes directos y espontáneos de quienes
          ya han recorrido las páginas de la saga.
        </p>
      </div>

      {/* Styled Mosaic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonialsData.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col justify-between rounded-2xl bg-[#1C1B1A] text-blancoLuz border border-[#34312E] overflow-hidden shadow-architectural hover:border-corten/60 transition-all duration-300"
          >
            {/* Top info */}
            <div className="p-5 pb-3">
              <div className="flex items-center justify-between text-xs text-piedra/60 mb-2">
                <span className="px-2 py-0.5 rounded bg-[#34312E]/60 text-stone-300 font-mono text-[10px]">
                  {item.tag}
                </span>
                <span className="flex items-center gap-1 text-corten">
                  <Heart className="w-3 h-3 fill-current" />
                </span>
              </div>
              <p className="font-serif italic text-base text-stone-100 leading-snug">
                «{item.highlight}»
              </p>
            </div>

            {/* Original Screenshot Container */}
            <div
              onClick={() => setSelectedImage(item.image)}
              className="relative cursor-pointer overflow-hidden bg-black/40 border-t border-b border-[#34312E]/80 group/img mx-4 rounded-xl"
            >
              <img
                src={item.image}
                alt="Opinión de lector en WhatsApp"
                className="w-full h-56 object-cover object-top filter brightness-95 contrast-105 group-hover/img:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-carbon/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-blancoLuz text-xs font-sans backdrop-blur-[2px]">
                <ZoomIn className="w-4 h-4 text-corten" />
                <span>Ampliar captura original</span>
              </div>
            </div>

            {/* Footer reader tag */}
            <div className="p-4 pt-3 flex items-center justify-between text-xs font-sans text-stone-400">
              <span>{item.reader}</span>
              <button
                onClick={() => setSelectedImage(item.image)}
                className="text-[11px] text-corten hover:underline"
              >
                Ver captura completa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-xl max-h-[90vh] bg-[#1C1B1A] rounded-2xl overflow-hidden border border-[#34312E] p-2 shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-carbon/80 text-blancoLuz hover:bg-corten transition-colors z-10"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage}
              alt="Captura de WhatsApp original"
              className="w-auto max-h-[84vh] object-contain rounded-xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
