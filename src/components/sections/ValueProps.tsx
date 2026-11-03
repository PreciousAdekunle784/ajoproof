import { NotebookPen, MessageSquareText, ShieldCheck, Check } from 'lucide-react';
import { Container, Eyebrow, Heading } from '../ui/Section';
import { Reveal } from '../ui/Reveal';

const FEATURES = [
  {
    icon: NotebookPen,
    title: 'Digital Records',
    body: 'Every contribution gets recorded the moment it is collected: who paid, how much, which day of the card.',
    detail: (
      <ul className="space-y-1.5 text-[12px]">
        {[['Mama Bisi', '₦1,000', 'Day 24'], ['Iya Tunde', '₦500', 'Day 18'], ['Baba Ayo', '₦2,000', 'Day 25']].map(([n, a, d]) => (
          <li key={n} className="flex items-center justify-between rounded-lg bg-forest-950/[0.04] px-2.5 py-1.5">
            <span className="font-medium">{n}</span>
            <span className="num text-moss">{d}</span>
            <span className="num font-semibold">{a}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: MessageSquareText,
    title: 'Instant Receipts',
    body: 'Every saver gets proof of payment by SMS within seconds. Any phone works. No app, no data needed.',
    detail: (
      <div className="rounded-2xl rounded-bl-sm bg-forest-950 p-3 text-[11.5px] leading-snug text-white/90">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-lime">AjoProof · SMS</p>
        ₦1,000 received from Mama Bisi. Day 24 of 31. Balance ₦24,000.
      </div>
    ),
  },
  {
    icon: ShieldCheck,
    title: 'Secured Contributions',
    body: 'When cash is deposited with a licensed financial partner, the deposit is tracked, confirmed, and every receipt updates.',
    detail: (
      <div className="flex items-center gap-2 text-[11.5px] font-semibold">
        <span className="rounded-full border border-forest-950/15 px-2.5 py-1 text-moss">With collector</span>
        <span className="h-px flex-1 bg-gradient-to-r from-forest-950/15 to-forest-800" aria-hidden="true" />
        <span className="inline-flex items-center gap-1 rounded-full bg-forest-800 px-2.5 py-1 text-lime"><Check className="size-3" strokeWidth={3} aria-hidden="true" />Secured</span>
      </div>
    ),
  },
];

export function ValueProps() {
  return (
    <section aria-labelledby="value-title" className="relative bg-paper py-24 text-forest-950 sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <Reveal>
            <Eyebrow tone="light">Why AjoProof</Eyebrow>
            <Heading id="value-title" className="mt-5">An Age-Old Savings Habit. A Smarter Way to Protect It.</Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-pretty text-lg leading-relaxed text-moss">
              Ajo already works. Traders trust their alajo with money every single day. What has always been missing is a record
              anyone can check. AjoProof adds transparency, accountability and digital records to the tradition, without changing how it runs.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal as="li" key={f.title} delay={0.08 * i}>
              <article className="group flex h-full flex-col rounded-[28px] border border-forest-950/[0.08] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest-800/25 hover:shadow-[0_24px_50px_-28px_rgba(7,20,13,0.35)] sm:p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-lime-soft text-forest-950 transition-transform duration-300 group-hover:scale-105">
                  <f.icon className="size-5" strokeWidth={2.2} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-[-0.02em]">{f.title}</h3>
                <p className="mt-2.5 leading-relaxed text-moss">{f.body}</p>
                <div className="mt-auto pt-7" aria-hidden="true">{f.detail}</div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
