'use client';

import { m } from 'motion/react';
import { PenLine, MessageSquareText, Landmark, TrendingUp } from 'lucide-react';
import { Container, Eyebrow, Heading } from '../ui/Section';
import { Reveal } from '../ui/Reveal';

const STEPS = [
  { n: '01', icon: PenLine, title: 'Record the Contribution', body: 'The alajo taps the saver’s name and stamps today’s box on the digital Ajo card. Two taps, even with weak network.' },
  { n: '02', icon: MessageSquareText, title: 'Send Instant Proof', body: 'An SMS receipt reaches the saver in seconds, with the amount, the day of the card and the balance. Any phone works.' },
  { n: '03', icon: Landmark, title: 'Secure the Money', body: 'The day’s cash is deposited with a licensed financial partner. Once the deposit is confirmed, every receipt changes to Secured.' },
  { n: '04', icon: TrendingUp, title: 'Build a Savings History', body: 'Months of steady contributions become a verifiable record that the saver can choose to share when applying for credit.' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative overflow-hidden bg-forest-900 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(167,245,138,0.10),transparent)]" aria-hidden="true" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <Heading id="how-title" className="mt-5">Simple for Everyone. Powerful Behind the Scenes.</Heading>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-mist">
            Nothing about Ajo changes for the saver. The alajo still comes by every morning. The difference is that every naira now leaves a trail.
          </p>
        </Reveal>

        <m.ol
          className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ shown: { transition: { staggerChildren: 0.18 } } }}
        >
          {/* connecting line: horizontal on desktop, vertical on phones */}
          <m.span
            aria-hidden="true"
            className="absolute left-[27px] top-7 hidden h-px origin-left bg-gradient-to-r from-lime/70 via-lime/40 to-lime/10 md:left-[7%] md:right-[7%] md:block"
            variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 1.4, ease } } }}
          />
          <m.span
            aria-hidden="true"
            className="absolute bottom-6 left-[27px] top-7 w-px origin-top bg-gradient-to-b from-lime/70 via-lime/35 to-lime/5 md:hidden"
            variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1, transition: { duration: 1.4, ease } } }}
          />

          {STEPS.map((s) => (
            <m.li
              key={s.n}
              className="relative grid grid-cols-[56px_1fr] gap-5 md:block"
              variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            >
              <m.span
                className="relative z-10 grid size-14 place-items-center rounded-2xl border border-lime/30 bg-forest-950 text-lime shadow-[0_0_0_6px_rgba(12,32,19,1)] md:mx-auto"
                variants={{ hidden: { scale: 0.6, rotate: -10 }, shown: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 380, damping: 18 } } }}
              >
                <s.icon className="size-6" strokeWidth={2} aria-hidden="true" />
                <span className="absolute inset-0 animate-[pulse-ring_3.2s_ease-out_infinite] rounded-2xl border border-lime/40" aria-hidden="true" />
              </m.span>
              <div className="md:mt-7 md:text-center">
                <p className="text-sm font-bold tracking-[0.12em] text-lime">{s.n}</p>
                <h3 className="mt-1.5 text-xl font-bold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2.5 text-pretty leading-relaxed text-mist md:mx-auto md:max-w-[17rem]">{s.body}</p>
              </div>
            </m.li>
          ))}
        </m.ol>
      </Container>
      <style>{`@keyframes pulse-ring { 0% { transform: scale(1); opacity: .6 } 70%,100% { transform: scale(1.35); opacity: 0 } }`}</style>
    </section>
  );
}
