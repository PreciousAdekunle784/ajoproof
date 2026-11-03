import { site } from '@/config/site';
import { Container } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { ButtonLink } from '../ui/Button';
import { AjoGrid } from '../ui/AjoGrid';

const STRIPS = [0.3, 0.5, 0.4, 0.7, 0.55, 0.8, 0.6, 0.75, 0.45, 0.6, 0.35];

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[32px] bg-forest-900 py-24 sm:rounded-[40px] sm:py-32">
        <div
          className="pointer-events-none absolute inset-0 flex"
          aria-hidden="true"
          style={{ WebkitMaskImage: 'radial-gradient(70% 90% at 50% 100%, #000, transparent 75%)', maskImage: 'radial-gradient(70% 90% at 50% 100%, #000, transparent 75%)' }}
        >
          {STRIPS.map((o, i) => (
            <div key={i} className={`h-full flex-1 border-l border-white/[0.04] ${i % 2 ? 'max-md:hidden' : ''}`}
              style={{ background: `linear-gradient(90deg, transparent, rgba(167,245,138,${(o * 0.14).toFixed(3)}))` }} />
          ))}
        </div>
        <div className="pointer-events-none absolute bottom-[-40%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(167,245,138,0.25),transparent)]" aria-hidden="true" />
        <Container className="relative text-center">
          <Reveal className="mx-auto max-w-3xl">
            <div className="mx-auto w-[150px] rounded-2xl border border-white/12 bg-white/[0.05] p-3" aria-hidden="true">
              <AjoGrid paid={31} size="xs" animate={false} />
            </div>
            <h2 id="cta-title" className="mt-8 text-balance text-[2.3rem] font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
              The Future of Ajo Is Still Ajo. <span className="text-proof">Just With Proof.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-pretty text-lg text-mist">Bring transparency and confidence to every contribution.</p>
            <ButtonLink href={site.links.getStarted} arrow size="lg" className="mt-10">Get Started With AjoProof</ButtonLink>
            <p className="mt-5 text-sm text-white/55">Savers need no smartphone. Receipts arrive by SMS.</p>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
