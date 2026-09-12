import React from 'react';
import { Compass, BookOpen, Feather, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function AuthorSection() {
  return (
    <section id="autora" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden lg:overflow-visible">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-terracota/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Author Portrait with Warm Architectural Frame */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Background warm architectural offset shadow */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-corten/20 via-cal to-piedra/30 rounded-3xl transform -rotate-1 pointer-events-none" />
            
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-piedra/60 shadow-architectural bg-cal">
              <img
                src="/assets/Foto autora.jpg"
                alt="Evam Queen (Eva Reina) · Arquitecta y escritora"
                className="w-full h-[480px] object-cover object-center filter saturate-[0.95] contrast-[1.02]"
              />
              
              {/* Photo Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-carbon/80 via-carbon/40 to-transparent text-blancoLuz">
                <span className="font-serif text-lg tracking-wide block">Evam Queen</span>
                <span className="text-xs font-sans text-piedra/80 tracking-widest uppercase">
                  Arquitecta · Escritora
                </span>
              </div>
            </div>

            {/* Architectural Compass / Pen Badge */}
            <div className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-blancoLuz border border-piedra/60 shadow-architectural hidden sm:flex items-center gap-3">
              <div className="p-2 rounded-xl bg-corten/10 text-corten">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-sans uppercase tracking-wider text-grafito/60">Vocación dual</div>
                <div className="text-sm font-serif font-medium text-carbon">Estructura y palabra</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Author Manifesto & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-sans tracking-widest uppercase text-corten font-medium block mb-2">
              Sobre la autora
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-carbon leading-tight">
              Arquitecta por profesión.<br />Escritora por necesidad.
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base font-sans text-grafito/85 leading-relaxed">
            <p>
              Soy arquitecta desde mucho antes de comprender que la arquitectura acabaría convirtiéndose en una forma de mirar la vida. Aprendí a observar los espacios, a descubrir lo que sostiene una estructura aunque permanezca oculto, a reconocer dónde se concentran las tensiones y a aceptar que ninguna materia es completamente invulnerable. Con el tiempo comprendí que hacía algo parecido con las personas.
            </p>

            <blockquote className="my-6 pl-5 border-l-2 border-corten py-1">
              <p className="font-serif italic text-lg sm:text-xl text-carbon/95 leading-snug">
                «La arquitectura me enseñó a proyectar hacia fuera.<br />
                La escritura me obligó a hacerlo hacia dentro.<br />
                Y no siempre ha sido cómodo.»
              </p>
            </blockquote>

            <p>
              Escribir ha significado entrar en habitaciones que llevaba años manteniendo cerradas. Mi escritura nace de una sensibilidad profundamente espacial y sensorial: necesito tocar los lugares que imagino, la temperatura de sus paredes, el sonido de una puerta al cerrarse, y al mismo tiempo acercarme a las contradicciones más íntimas de mis personajes.
            </p>

            <div className="p-5 rounded-2xl bg-cal/60 border border-piedra/50 text-sm font-serif italic text-carbon">
              «Soy arquitecta. Soy escritora. Y cada vez estoy menos segura de que sean dos cosas distintas. En ambas busco estructura, equilibrio, emoción, luz y verdad. Y en ambas me sigue fascinando exactamente el mismo instante: aquel en el que una grieta deja de hablarnos únicamente de lo que se ha roto y empieza a mostrarnos lo que todavía puede transformarse.»
            </div>
          </div>

          {/* Social connections */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="https://evamqueen.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-corten text-blancoLuz text-xs font-sans font-medium hover:bg-carbon transition-colors shadow-sm"
            >
              <Feather className="w-4 h-4" />
              <span>Substack de Evam Queen</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.instagram.com/evareinag/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blancoLuz border border-piedra text-carbon text-xs font-sans font-medium hover:border-corten hover:text-corten transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>@evareinag</span>
            </a>

            <a
              href="https://www.instagram.com/casasdeunavida/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blancoLuz border border-piedra text-carbon text-xs font-sans font-medium hover:border-corten hover:text-corten transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>@casasdeunavida</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
