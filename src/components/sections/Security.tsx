import { ShieldCheck, Store, UserRound, Landmark, FileCheck2, ArrowDown } from 'lucide-react';
import { Container, Eyebrow, Heading } from '../ui/Section';
import { Reveal } from '../ui/Reveal';

const POINTS = [
  { title: 'AjoProof never holds savers’ money', body: 'Funds are deposited with and held by licensed financial partners. We are the record, not the vault.' },
  { title: 'Every contribution shows where it is', body: 'Each payment is labelled With collector or Secured, on the saver’s receipt and on the collector’s screen.' },
  { title: 'Secured means confirmed', body: 'A contribution becomes Secured only after the partner confirms the deposit, never just because someone says so.' },
  { title: 'Histories are shared only with consent', body: 'A lender sees a saver’s history only when the saver chooses to share it, with the phone number masked.' },
];

const FLOW = [
  { icon: UserRound, who: 'Saver', what: 'Pays ₦1,000 in cash or by transfer', status: null },
  { icon: Store, who: 'Collector (alajo)', what: 'Records it and the saver gets an SMS', status: 'With collector' },
  { icon: Landmark, who: 'Licensed financial partner', what: 'Receives the deposit and holds the funds', status: 'Secured' },
];

export function Security() {
  return (
    <section aria-labelledby="security-title" className="relative overflow-hidden bg-forest-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(167,245,138,0.12),transparent)]" aria-hidden="true" />
      <Container className="relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Security and transparency</Eyebrow>
            <Heading id="security-title" className="mt-5">Your Money. Accounted For.</Heading>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-mist">
              AjoProof does not hold customer funds. Money is deposited with licensed financial partners, while AjoProof provides the
              digital records, the receipts and the visibility, so everyone can see where every contribution stands.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.06 * i}>
                <ShieldCheck className="size-5 text-lime" aria-hidden="true" />
                <h3 className="mt-3 font-bold tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-mist">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1} className="lg:pt-6">
          <figure className="glass-strong rounded-[32px] p-6 sm:p-8" aria-labelledby="flow-caption">
            <figcaption id="flow-caption" className="text-sm font-semibold text-white/70">Where a ₦1,000 contribution goes</figcaption>
            <ol className="mt-6">
              {FLOW.map((f, i) => (
                <li key={f.who}>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-forest-950/50 p-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-lime"><f.icon className="size-5" aria-hidden="true" /></span>
                    <div className="min-w-0 leading-tight">
                      <p className="font-semibold">{f.who}</p>
                      <p className="mt-1 text-sm text-mist">{f.what}</p>
                    </div>
                    {f.status && (
                      <span className={`ml-auto shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${f.status === 'Secured' ? 'bg-lime text-forest-950' : 'border border-white/20 text-white/80'}`}>
                        {f.status}
                      </span>
                    )}
                  </div>
                  {i < FLOW.length - 1 && (
                    <div className="flex justify-center py-1.5 text-white/35" aria-hidden="true"><ArrowDown className="size-4" /></div>
                  )}
                </li>
              ))}
            </ol>
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-dashed border-lime/40 bg-lime/[0.06] p-4">
              <FileCheck2 className="mt-0.5 size-5 shrink-0 text-lime" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-white/85">
                <span className="font-semibold text-white">AjoProof, at every step:</span> the record of each payment, the SMS receipt, and the status everyone can see.
              </p>
            </div>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
