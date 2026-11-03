import { Bell, ShieldCheck, Signal, Wifi, BatteryFull, ArrowDownLeft, Banknote } from 'lucide-react';
import { AjoGrid } from '../ui/AjoGrid';

/* =====================================================================
   Illustrative AjoProof phone screen for the hero. Not a working app:
   fixed sample data for one saver, Mama Bisi, on day 24 of 31.
   ===================================================================== */

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[228px] sm:w-[300px]" role="img" aria-label="AjoProof on a phone: Mama Bisi's balance of ₦24,000, secured, and her Ajo card with 24 of 31 days paid">
      {/* side buttons */}
      <span className="absolute -left-[3px] top-28 h-10 w-[3px] rounded-l bg-[#2a3a2f]" aria-hidden="true" />
      <span className="absolute -left-[3px] top-44 h-16 w-[3px] rounded-l bg-[#2a3a2f]" aria-hidden="true" />
      <span className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-[#2a3a2f]" aria-hidden="true" />

      <div className="rounded-[46px] bg-gradient-to-b from-[#3a4a3f] via-[#1c2a21] to-[#121c15] p-[3px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85),0_30px_60px_-30px_rgba(167,245,138,0.25)]">
        <div className="rounded-[43px] bg-[#050b07] p-[9px]">
          <div aria-hidden="true" className="relative h-[560px] overflow-hidden rounded-[35px] bg-gradient-to-b from-[#0f2617] via-[#0a1a10] to-[#08140c] sm:h-[636px]">
            {/* dynamic island */}
            <div className="absolute left-1/2 top-2.5 z-10 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />

            <div className="flex items-center justify-between px-6 pt-3.5 text-[11px] font-semibold text-white">
              <span className="num">08:12</span>
              <span className="flex items-center gap-1"><Signal className="size-3" /><Wifi className="size-3" /><BatteryFull className="size-3.5" /></span>
            </div>

            <div className="px-4 pt-5">
              {/* greeting */}
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-full bg-lime text-[12px] font-bold text-forest-950">MB</span>
                <div className="leading-tight">
                  <p className="text-[10.5px] text-mist">Good morning,</p>
                  <p className="text-[13.5px] font-semibold">Mama Bisi</p>
                </div>
                <span className="ml-auto grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.06]"><Bell className="size-3.5" /></span>
              </div>

              {/* balance */}
              <div className="relative mt-4 overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-[#1a4a29] via-[#123520] to-[#0d2816] p-4">
                <div className="absolute -right-10 -top-12 size-36 rounded-full bg-lime/15 blur-2xl" />
                <p className="text-[10.5px] text-mist">Total saved this card</p>
                <p className="num mt-1 text-[30px] font-bold leading-none">₦24,000<span className="text-[18px] text-white/45">.00</span></p>
                <div className="mt-3 flex items-center gap-1.5 text-[10.5px] font-semibold text-lime">
                  <ShieldCheck className="size-3.5" />
                  Secured with a licensed partner
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-mist">
                    <span>Savings progress</span>
                    <span className="num font-semibold text-white">24 / 31 days</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[77%] rounded-full bg-gradient-to-r from-lime-soft to-lime" />
                  </div>
                </div>
              </div>

              {/* ajo card */}
              <div className="mt-4 rounded-[20px] border border-white/10 bg-white/[0.04] p-3.5">
                <div className="mb-2.5 flex items-baseline justify-between">
                  <p className="whitespace-nowrap text-[12.5px] font-semibold">My Ajo Card</p>
                  <p className="whitespace-nowrap text-[10px] text-mist">₦1,000 daily</p>
                </div>
                <AjoGrid paid={24} today={24} />
              </div>

              {/* today */}
              <div className="mt-3 flex items-center gap-3 rounded-2xl bg-lime/[0.1] px-3 py-2.5 ring-1 ring-lime/25">
                <span className="grid size-8 place-items-center rounded-xl bg-lime text-forest-950"><ArrowDownLeft className="size-4" strokeWidth={2.6} /></span>
                <div className="leading-tight">
                  <p className="text-[11.5px] font-semibold">Today&apos;s contribution</p>
                  <p className="text-[10px] text-mist">Day 24 · SMS sent</p>
                </div>
                <p className="num ml-auto whitespace-nowrap text-[13px] font-bold text-lime">+₦1,000</p>
              </div>

              {/* recent */}
              <p className="mt-4 text-[11px] font-semibold text-white/80">Recent</p>
              <ul className="mt-1.5 space-y-1.5">
                {[
                  { d: 'Day 23 · Cash', t: 'Yesterday' },
                  { d: 'Day 22 · Cash', t: 'Sat' },
                ].map((r) => (
                  <li key={r.d} className="flex items-center gap-3 rounded-xl px-1 py-1.5">
                    <span className="grid size-7 place-items-center rounded-lg bg-white/[0.07] text-mist"><Banknote className="size-3.5" /></span>
                    <span className="leading-tight">
                      <span className="block text-[11px] font-medium">{r.d}</span>
                      <span className="block text-[9.5px] text-mist">{r.t} · Secured</span>
                    </span>
                    <span className="num ml-auto text-[11.5px] font-semibold">₦1,000</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
