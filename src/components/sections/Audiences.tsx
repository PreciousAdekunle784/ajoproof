import { Check, ShieldCheck, Lock, Landmark } from 'lucide-react';
import { site } from '@/config/site';
import { Container, Eyebrow, Heading } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { ButtonLink } from '../ui/Button';

/* Three panels, three mockups. All figures are sample data for illustration. */

function Points({ items, tone }: { items: string[]; tone: 'dark' | 'light' }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 leading-snug">
          <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${tone === 'dark' ? 'bg-lime text-forest-950' : 'bg-forest-950 text-lime'}`}>
            <Check className="size-3" strokeWidth={3.2} aria-hidden="true" />
          </span>
          <span className={tone === 'dark' ? 'text-white/85' : 'text-forest-950/80'}>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function CollectorMockup() {
  const rows = [
    { name: 'Mama Bisi', amt: '₦1,000', day: '24/31', paid: true },
    { name: 'Iya Tunde', amt: '₦500', day: '18/31', paid: true },
    { name: 'Baba Ayo', amt: '₦2,000', day: '25/31', paid: false },
    { name: 'Kemi O.', amt: '₦1,000', day: '21/31', paid: false },
  ];
  return (
    <div className="rounded-[24px] border border-white/10 bg-forest-950/70 p-4" aria-hidden="true">
      <div className="flex items-end justify-between border-b border-white/10 pb-3">
        <div>
          <p className="text-[11px] text-mist">Cash with you today</p>
          <p className="num text-2xl font-bold">₦14,500</p>
        </div>
        <span className="rounded-full bg-lime px-3 py-1.5 text-[11px] font-bold text-forest-950">Bank the day</span>
      </div>
      <ul className="mt-2">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-3 border-b border-white/[0.06] py-2.5 last:border-0">
            <span className="grid size-8 place-items-center rounded-full bg-white/[0.08] text-[11px] font-bold">{r.name.split(' ').map((w) => w[0]).join('')}</span>
            <span className="leading-tight">
              <span className="block text-[13px] font-semibold">{r.name}</span>
              <span className="num block text-[11px] text-mist">{r.amt} · Day {r.day}</span>
            </span>
            <span className={`ml-auto rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${r.paid ? 'bg-lime/15 text-lime' : 'border border-white/15 text-white/60'}`}>
              {r.paid ? 'Paid today' : 'Not yet'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SaverMockup() {
  return (
    <div className="rounded-[24px] bg-white p-4 shadow-[0_20px_40px_-30px_rgba(7,20,13,0.5)]" aria-hidden="true">
      <div className="flex items-center gap-2.5 border-b border-forest-950/[0.07] pb-3">
        <span className="grid size-8 place-items-center rounded-full bg-forest-950 text-[11px] font-bold text-lime">AP</span>
        <span className="leading-tight">
          <span className="block text-[13px] font-semibold">AjoProof</span>
          <span className="block text-[11px] text-moss">Text message · any phone</span>
        </span>
      </div>
      <div className="mt-3 space-y-2.5 text-[12.5px] leading-snug">
        <p className="max-w-[92%] rounded-2xl rounded-bl-md bg-paper px-3.5 py-2.5">
          AjoProof: ₦1,000 received from Mama Bisi. Day 24 of 31. Balance ₦24,000. Status: With collector.
          <span className="mt-1 block text-[10.5px] text-moss">07:42</span>
        </p>
        <p className="max-w-[92%] rounded-2xl rounded-bl-md bg-paper px-3.5 py-2.5">
          Your ₦1,000 for today is now secured with our partner bank.
          <span className="mt-1 flex items-center gap-1 text-[10.5px] font-semibold text-forest-800">
            <ShieldCheck className="size-3" /> 18:10 · Secured
          </span>
        </p>
      </div>
    </div>
  );
}

function LenderMockup() {
  const rows: [string, string][] = [['Months active', '6'], ['On-time rate', '97%'], ['Average monthly saved', '₦29,800'], ['Longest streak', '58 days']];
  return (
    <div className="rounded-[24px] border border-forest-950/[0.08] bg-paper p-4" aria-hidden="true">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-moss">Savings history · sample</p>
          <p className="mt-1 text-[15px] font-bold">M. Adewale · Kuto</p>
          <p className="num text-[11px] text-moss">0803 XXX 2024</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-forest-950 px-2.5 py-1 text-[10.5px] font-semibold text-lime"><Lock className="size-3" />Shared with consent</span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-2">
        {rows.map(([k, v]) => (
          <div key={k} className="rounded-xl bg-white px-3 py-2.5">
            <dt className="text-[10.5px] text-moss">{k}</dt>
            <dd className="num text-lg font-bold">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex gap-[3px]">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="h-6 flex-1 rounded-md bg-forest-800" style={{ opacity: [0.85, 1, 0.9, 1, 0.95, 1][i] }} />
        ))}
      </div>
      <p className="mt-1.5 flex justify-between text-[10px] text-moss"><span>May</span><span>Oct</span></p>
    </div>
  );
}

export function Audiences() {
  return (
    <section aria-labelledby="audiences-title" className="bg-paper py-24 text-forest-950 sm:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow tone="light">Who it&apos;s for</Eyebrow>
          <Heading id="audiences-title" className="mt-5">Built for Three People.</Heading>
          <p className="mt-5 max-w-xl text-pretty text-lg text-moss">One record, read three ways. The collector keeps the book, the saver holds the proof, and a lender sees only what the saver chooses to share.</p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Reveal as="article" className="lg:row-span-1">
            <div id="collectors" className="flex h-full scroll-mt-28 flex-col rounded-[32px] bg-forest-950 p-7 text-white sm:p-8">
              <p className="text-sm font-semibold text-lime">For Collectors</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.025em]">Manage your Ajo business with confidence.</h3>
              <Points tone="dark" items={['Record every payment in two taps', 'SMS receipts go out for you', 'Bank the day and watch every payment turn Secured', 'Pay out each card with your commission worked out']} />
              <div className="mt-8"><CollectorMockup /></div>
              <ButtonLink href={site.links.getStarted} arrow className="mt-7 self-start">Start as a collector</ButtonLink>
            </div>
          </Reveal>

          <Reveal as="article" delay={0.08}>
            <div id="savers" className="flex h-full scroll-mt-28 flex-col rounded-[32px] bg-lime-soft p-7 sm:p-8">
              <p className="text-sm font-semibold text-forest-800">For Savers</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.025em]">Know exactly where your money stands.</h3>
              <Points tone="light" items={['An SMS for every payment, on any phone', 'See if your money is with your collector or secured', 'A savings history that belongs to you']} />
              <div className="mt-8"><SaverMockup /></div>
              <ButtonLink href={site.links.savers} variant="dark" arrow className="mt-7 self-start">How it works for savers</ButtonLink>
            </div>
          </Reveal>

          <Reveal as="article" delay={0.16}>
            <div id="lenders" className="flex h-full scroll-mt-28 flex-col rounded-[32px] border border-forest-950/[0.08] bg-white p-7 sm:p-8">
              <p className="flex items-center gap-2 text-sm font-semibold text-forest-800"><Landmark className="size-4" aria-hidden="true" />For Lenders</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.025em]">Discover reliable savers through verified financial histories.</h3>
              <Points tone="light" items={['Daily savings records for people with no bank statement', 'Only histories that savers choose to share', 'Phone numbers stay masked']} />
              <div className="mt-8"><LenderMockup /></div>
              <ButtonLink href={site.links.lenders} variant="outline-dark" arrow className="mt-7 self-start">Talk to us</ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
