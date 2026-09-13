import React from 'react';
import { trilogyOverview } from '../data/booksData';
import { MapPin } from 'lucide-react';

export default function TrilogyIntro() {
  return (
    <section id="trilogia" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Architectural Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-corten/5 via-cal/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header: Exact replica of reference mockup */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <span className="text-xs font-sans tracking-[0.25em] uppercase text-corten font-medium">
          El universo de la saga
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-carbon tracking-tight">
          Materia de lo que somos
        </h2>
        <div className="pt-2 space-y-2">
          <p className="font-serif italic text-lg sm:text-xl text-grafito/90 max-w-2xl mx-auto leading-relaxed">
            «Hay materiales con los que construimos casas.<br />
            Y otros con los que terminamos construyéndonos a nosotros mismos.»
          </p>
          <p className="font-sans text-sm sm:text-base text-grafito/75 max-w-xl mx-auto leading-relaxed pt-2 font-light">
            ¿Hasta qué punto podemos elegir quiénes seremos cuando otros comenzaron a construirnos antes de que pudiéramos decidir?
          </p>
        </div>
      </div>

      {/* 3 Material Cards: Exact visual representation from user's reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
        {trilogyOverview.materials.map((mat) => (
          <div
            key={mat.name}
            className="group relative p-8 sm:p-9 rounded-3xl bg-blancoLuz/90 border border-piedra/60 hover:border-corten/60 transition-all duration-500 shadow-sm hover:shadow-architectural flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle paper/mineral texture overlay */}
            <div className="absolute inset-0 bg-mineral-grid opacity-30 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Material Artwork Illustration: organically integrated into the card without any inner box */}
              <div className="w-full h-48 flex items-center justify-center overflow-visible group-hover:scale-105 transition-transform duration-500">
                <img
                  src={mat.image}
                  alt={`Representación de ${mat.name}`}
                  className="max-h-full max-w-full object-contain mix-blend-multiply filter contrast-[1.02]"
                />
              </div>

              {/* Header inside card */}
              <div className="space-y-1">
                <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-grafito/60 block">
                  {mat.concept}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl tracking-widest uppercase text-carbon">
                  {mat.name}
                </h3>
              </div>

              {/* Description */}
              <p className="font-sans text-sm text-grafito/85 leading-relaxed font-light">
                {mat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Two Protagonists: Highly Visual Cards with Photographic Portraits */}
      <div className="bg-cal/50 rounded-3xl p-6 sm:p-10 lg:p-14 border border-piedra/50 shadow-architectural">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-grafito/60 block mb-2">
            Dos personajes · dos geografías
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-carbon font-normal">
            Anna y Shady: la búsqueda compartida de un hogar
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {trilogyOverview.protagonists.map((char) => (
            <div
              key={char.name}
              className="group flex flex-col sm:flex-row gap-6 p-6 sm:p-7 rounded-2xl bg-blancoLuz/95 border border-piedra/60 shadow-sm hover:shadow-architectural transition-all duration-300"
            >
              {/* Character Portrait Image */}
              <div className="w-full sm:w-48 h-64 sm:h-auto shrink-0 rounded-xl overflow-hidden border border-piedra/50 bg-piedra/20 relative shadow-inner">
                <img
                  src={char.image}
                  alt={`Retrato de ${char.name}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter saturate-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/50 via-transparent to-transparent sm:hidden" />
                <span className="absolute bottom-3 left-3 sm:hidden text-blancoLuz font-serif text-lg font-medium">
                  {char.name}
                </span>
              </div>

              {/* Character Text & Bio */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-serif text-2xl sm:text-3xl text-carbon font-medium">
                      {char.name}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans text-corten font-medium bg-corten/10 px-3 py-1 rounded-full shrink-0">
                      <MapPin className="w-3 h-3" />
                      {char.origin}
                    </span>
                  </div>

                  <blockquote className="italic font-serif text-sm sm:text-base text-terracota border-l-2 border-terracota/60 pl-3 mb-3 leading-snug">
                    «{char.quote}»
                  </blockquote>

                  <p className="font-sans text-xs sm:text-sm text-grafito/80 leading-relaxed font-light">
                    {char.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-piedra/30 flex items-center justify-end text-[11px] font-sans text-grafito/50">
                  <span className="font-serif italic text-corten">{char.name === 'Anna' ? 'Europa dividida' : 'Construir para salvarse'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Trilogy Conflict Thought */}
        <div className="mt-12 text-center max-w-2xl mx-auto p-6 rounded-2xl bg-blancoLuz border border-piedra/60 shadow-sm">
          <p className="font-serif italic text-base sm:text-lg text-carbon/90 leading-relaxed">
            «{trilogyOverview.conflictQuote}»
          </p>
        </div>
      </div>
    </section>
  );
}
