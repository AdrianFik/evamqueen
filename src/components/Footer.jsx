import React, { useState } from 'react';
import { Feather, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        window.open(`https://evamqueen.substack.com/`, '_blank');
      }, 800);
    }
  };

  return (
    <footer className="relative bg-[#1C1B1A] text-blancoLuz pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#34312E]">
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-mineral-grid pointer-events-none opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* Newsletter / Substack Call to Action */}
        <div className="max-w-3xl mx-auto text-center space-y-6 p-8 sm:p-12 rounded-3xl bg-[#34312E]/40 border border-stone-800/80 backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-corten/20 text-corten border border-corten/30 text-xs font-sans uppercase tracking-widest">
            <Feather className="w-3.5 h-3.5" />
            <span>El cuaderno de notas · Substack</span>
          </div>
          
          <h3 className="font-serif text-2xl sm:text-4xl text-blancoLuz font-normal">
            Reflexiones sobre espacios, heridas y literatura
          </h3>
          
          <p className="font-sans text-sm sm:text-base text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
            Acompaña a Eva en el proceso de escritura de <em>Arquitectos del destino</em> y recibe cartas íntimas sobre arquitectura, libros y procesos de vida en su Substack <strong>@evamqueen</strong>.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-corten/30 border border-corten text-stone-100 text-sm font-sans animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-corten" />
              <span>Redirigiendo al Substack oficial de Eva...</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Introduce tu correo electrónico"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#1C1B1A] border border-stone-700 text-sm font-sans text-blancoLuz placeholder-stone-500 focus:outline-none focus:border-corten transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-corten text-blancoLuz text-sm font-sans font-medium hover:bg-terracota transition-colors whitespace-nowrap shadow-corten"
              >
                <span>Suscribirme</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Main Footer Links & Architecture Statement */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-12 border-t border-stone-800 text-sm font-sans text-stone-400">
          {/* Brand & Manifesto */}
          <div className="md:col-span-6 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] text-blancoLuz block">
              EVAM QUEEN
            </span>
            <p className="font-serif italic text-base text-stone-300 max-w-md leading-relaxed">
              «La arquitectura aporta la estructura, el tiempo deja la cicatriz, las personas introducen el calor y la luz recuerda, incluso en la estancia más herida, que mañana volverá a amanecer.»
            </p>
          </div>

          {/* Saga Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-stone-200 font-medium">
              Trilogía Tierra · Metal · Sangre
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#libros" className="hover:text-corten transition-colors">
                  I · Casas de una vida (Publicado)
                </a>
              </li>
              <li>
                <a href="#libros" className="hover:text-corten transition-colors">
                  II · Rutas de fuego y viento (Publicado)
                </a>
              </li>
              <li>
                <a href="#libros" className="hover:text-corten transition-colors">
                  III · Arquitectos del destino (En planos)
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-stone-200 font-medium">
              Canales oficiales
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://evamqueen.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-corten transition-colors"
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>Substack: @evamqueen</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/casasdeunavida/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-corten transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram: @casasdeunavida</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/evareinag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-corten transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram personal: @evareinag</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans gap-4">
          <p>© {new Date().getFullYear()} Evam Queen (Eva Reina). Todos los derechos reservados.</p>
          <p className="font-mono text-[11px] text-stone-600">
            Diseño arquitectónico y literario · Trilogía Tierra · Metal · Sangre
          </p>
        </div>
      </div>
    </footer>
  );
}
