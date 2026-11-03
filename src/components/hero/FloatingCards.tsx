import { BadgeCheck, MessageSquareText, ArrowUpRight } from 'lucide-react';
import { AjoGrid } from '../ui/AjoGrid';

/* Illustrative cards around the hero phone. Sample data only. */

const ACTIVITY = [38, 52, 44, 70, 58, 82, 100]; // relative heights of the 7-day activity bars

export function TodayCollectionCard() {
  return (
    <div className="w-[146px] rounded-[20px] bg-gradient-to-br from-[#F1FFEA] via-[#DDFBCF] to-[#C7FFB1] p-3.5 text-forest-950 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.6)] sm:w-[250px] sm:rounded-[26px] sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold sm:text-[13px]">Today&apos;s Collection</p>
        <span className="flex items-center gap-1 rounded-full bg-forest-950/[0.08] px-1.5 py-0.5 text-[9px] font-semibold sm:px-2 sm:text-[10.5px]">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-forest-800/60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-forest-800" />
          </span>
          Live
        </span>
      </div>
      <p className="num mt-2 text-[26px] font-bold leading-none tracking-[-0.04em] sm:mt-3 sm:text-[40px]">₦24,000</p>
      <p className="mt-1.5 text-[10px] font-medium text-forest-800/75 sm:text-[12.5px]">24 contributions recorded</p>
      <div className="mt-3 flex h-7 items-end gap-1 sm:mt-4 sm:h-10 sm:gap-1.5" aria-hidden="true">
        {ACTIVITY.map((h, i) => (
          <span key={i} className={`flex-1 rounded-[3px] ${i === ACTIVITY.length - 1 ? 'bg-forest-950' : 'bg-forest-950/20'}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function ReceiptCard() {
  return (
    <div className="glass-strong w-[156px] rounded-[20px] max-sm:bg-forest-950/85 p-3.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] sm:w-[262px] sm:rounded-[26px] sm:p-5">
      <span className="inline-flex rounded-full border border-white/12 bg-white/[0.07] px-2.5 py-1 text-[9px] font-medium text-white/80 sm:text-[11px]">
        SMS receipt · 07:42
      </span>
      <p className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-lime sm:mt-3.5 sm:text-[13px]">
        <BadgeCheck className="size-3.5 sm:size-4" strokeWidth={2.4} aria-hidden="true" />
        Payment Confirmed
      </p>
      <p className="mt-1.5 text-[11px] text-mist sm:mt-2 sm:text-[13px]">Mama Bisi</p>
      <p className="num whitespace-nowrap text-[22px] font-bold leading-tight tracking-[-0.03em] sm:text-[32px]">₦1,000 <span className="text-[11px] font-semibold tracking-normal text-mist sm:text-[14px]">received</span></p>
      <dl className="mt-2.5 space-y-1 border-t border-white/10 pt-2.5 text-[10px] sm:mt-3.5 sm:space-y-1.5 sm:pt-3 sm:text-[12px]">
        <div className="flex justify-between"><dt className="text-mist">Progress</dt><dd className="num font-semibold">Day 24 of 31</dd></div>
        <div className="flex justify-between">
          <dt className="text-mist">Status</dt>
          <dd className="flex items-center gap-1.5 font-semibold text-lime"><span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />Secured</dd>
        </div>
      </dl>
    </div>
  );
}

export function MonthlySavingsCard() {
  return (
    <div className="glass w-[172px] rounded-[22px] p-3.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] sm:w-[220px] sm:p-4">
      <div className="flex items-center justify-between">
        <p className="text-[10.5px] font-medium text-mist sm:text-[11.5px]">Monthly Savings</p>
        <span className="grid size-6 place-items-center rounded-full bg-white text-forest-950" aria-hidden="true"><ArrowUpRight className="size-3.5" strokeWidth={2.6} /></span>
      </div>
      <p className="num mt-1.5 text-[18px] font-bold leading-none tracking-[-0.03em] sm:text-[22px]">
        ₦24,000 <span className="text-[12px] font-semibold text-white/45 sm:text-[14px]">/ ₦31,000</span>
      </p>
      <AjoGrid paid={24} size="xs" className="mt-3" delayMs={1400} />
    </div>
  );
}

export function SmsPill() {
  return (
    <div className="flex items-center gap-3 rounded-full bg-lime py-1.5 pl-4 pr-1.5 text-forest-950 shadow-[0_18px_40px_-14px_rgba(167,245,138,0.6)]">
      <span className="text-[13px] font-semibold">Receipt sent by SMS</span>
      <span className="grid size-8 place-items-center rounded-full bg-forest-950 text-lime" aria-hidden="true"><MessageSquareText className="size-4" /></span>
    </div>
  );
}

/* Hand-drawn connector arrows, like a note pointing at the phone. */
export function CurvedArrow({ flip = false, className = '' }: { flip?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 90 46" fill="none" className={`${className} ${flip ? '-scale-x-100' : ''}`} aria-hidden="true">
      <path d="M4 40C14 16 38 5 70 9" stroke="rgba(255,255,255,0.65)" strokeWidth="1.6" strokeLinecap="round" className="arrow-path" />
      <path d="M62 2.5l9 6.6-8.4 7" stroke="rgba(255,255,255,0.65)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
