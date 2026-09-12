import React from 'react';
import { ArrowDown, Box, Sparkles, BookOpen } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden">
      {/* Background Architectural Grid & Light Leak */}
      <div className="absolute inset-0 bg-mineral-grid pointer-events-none opacity-50" />
      <div className="absolute top-0 inset-x-0 h-96 light-beam-overlay pointer-events-none" />

      {/* Subtle Central Architectural Line / Crack that admits light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-corten/60 via-corten/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Architectural Series Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cal/80 border border-piedra/60 text-xs md:text-sm font-sans tracking-widest uppercase text-grafito shadow-sm">
          <span className="w-2 h-2 rounded-full bg-corten animate-pulse" />
          <span>Trilogía · Tierra · Metal · Sangre</span>
        </div>

        {/* Central Author Manifesto / Epigraph */}
        <div className="space-y-4">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-carbon tracking-tight leading-[1.18]">
            «Escribo como aprendí a proyectar: anticipando lo invisible, la estructura que sostiene a aquello que sí se ve.»
          </h1>
          <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-corten font-medium">
            Evam Queen · Arquitecta y escritora
          </p>
        </div>

        {/* Premise Description */}
        <p className="font-sans text-base sm:text-lg text-grafito/80 max-w-2xl mx-auto leading-relaxed font-light">
          Hay materiales con los que construimos casas. Y otros con los que terminamos construyéndonos a nosotros mismos.
          Descubre una saga donde las grietas no son solo cicatrices, sino los lugares por donde vuelve a entrar la luz.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#libros"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-carbon text-blancoLuz font-sans text-sm font-medium tracking-wide hover:bg-corten transition-all duration-300 shadow-architectural hover:shadow-corten"
          >
            <Box className="w-4 h-4 text-corten group-hover:text-blancoLuz transition-colors" />
            <span>Explorar libros en 3D</span>
          </a>

          <a
            href="#trilogia"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blancoLuz/80 border border-piedra text-carbon font-sans text-sm font-medium tracking-wide hover:border-corten hover:text-corten transition-all duration-300 backdrop-blur-sm"
          >
            <BookOpen className="w-4 h-4 text-terracota" />
            <span>El universo de la obra</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-12">
          <a
            href="#trilogia"
            className="inline-flex flex-col items-center gap-2 text-xs font-sans tracking-widest uppercase text-grafito/50 hover:text-corten transition-colors"
          >
            <span>Desciende al espacio</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-corten" />
          </a>
        </div>
      </div>
    </section>
  );
}
