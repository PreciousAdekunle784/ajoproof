import { ArrowRight, Sprout } from 'lucide-react';
import { site } from '@/config/site';
import { ButtonLink } from '../ui/Button';
import { HeroBackground } from './HeroBackground';
import { HeroVisual } from './HeroVisual';

/* Hero entrance is CSS keyframes (animate-rise) so the headline paints before
   JavaScript loads: good for slow networks and for LCP. */
const at = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-[112px] sm:pt-[140px]">
      <HeroBackground />
      <div className="relative z-10 mx-auto flex max-w-[1240px] flex-col items-center px-5 text-center sm:px-8">
        <p className="glass inline-flex animate-rise items-center gap-2 rounded-full px-4 py-1.5 text-[0.82rem] font-medium text-white/85" style={at(0)}>
          <Sprout className="size-4 text-lime" aria-hidden="true" />
          Built for the Ajo Economy
        </p>

        <h1 id="hero-title" className="mt-6 text-balance text-[clamp(2.35rem,11.2vw,2.9rem)] font-bold leading-[1.04] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
          <span className="block animate-slide" style={at(40)}>Your Ajo.</span>
          <span className="block animate-slide" style={at(120)}>
            Now With <span className="text-proof">Proof.</span>
          </span>
        </h1>

        <p className="mt-6 max-w-[34rem] animate-rise text-pretty text-[1.05rem] leading-relaxed text-mist sm:text-lg" style={at(340)}>
          Every contribution recorded. Every payment accounted for. Every savings journey backed by proof.
        </p>

        <div className="mt-9 flex w-full animate-rise flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row" style={at(460)}>
          <ButtonLink href={site.links.getStarted} arrow className="w-full sm:w-auto">Get Started</ButtonLink>
          <a
            href="#how-it-works"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-[0.95rem] font-semibold text-white/90 transition-colors hover:text-white sm:w-auto"
          >
            See How It Works
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
      <HeroVisual />
    </section>
  );
}
