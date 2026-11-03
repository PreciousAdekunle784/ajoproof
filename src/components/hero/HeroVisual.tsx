import { PhoneMockup } from './PhoneMockup';
import { TodayCollectionCard, ReceiptCard, MonthlySavingsCard, SmsPill, CurvedArrow } from './FloatingCards';

/* The phone as anchor, cards drifting around it at their own pace.
   All CSS: the entrance paints before JavaScript loads and the drift runs on
   the compositor. Both stop for reduced-motion users. */

function Float({ children, amp = 8, duration = 6, delay = 0 }: { children: React.ReactNode; amp?: number; duration?: number; delay?: number }) {
  return (
    <div className="float" style={{ ['--amp' as string]: `${amp}px`, ['--dur' as string]: `${duration}s`, ['--delay' as string]: `${delay}s` }}>
      {children}
    </div>
  );
}

const enter = (ms: number) => ({ animationDelay: `${ms}ms` });

export function HeroVisual() {
  return (
    <div className="relative mx-auto mt-12 h-[580px] w-full max-w-[1120px] sm:mt-16 sm:h-[640px]">
      {/* Phone */}
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 animate-rise" style={enter(450)}>
        <Float amp={10} duration={7}>
          <PhoneMockup />
        </Float>
      </div>

      {/* Left: today's collection */}
      <div className="absolute left-3 top-10 z-20 animate-rise sm:left-[calc(50%-400px)] sm:top-14 lg:left-[calc(50%-470px)] lg:top-12" style={enter(700)}>
        <Float amp={9} duration={6.2} delay={0.4}>
          <TodayCollectionCard />
        </Float>
      </div>
      <CurvedArrow className="absolute left-[calc(50%-235px)] top-[-6px] hidden w-[78px] animate-rise lg:block" />

      {/* Right: SMS receipt */}
      <div className="absolute right-3 top-[318px] z-20 animate-rise sm:right-[calc(50%-410px)] sm:top-24 lg:right-[calc(50%-480px)] lg:top-20" style={enter(850)}>
        <Float amp={11} duration={6.8} delay={0.9}>
          <ReceiptCard />
        </Float>
      </div>
      <CurvedArrow flip className="absolute right-[calc(50%-235px)] top-[14px] hidden w-[78px] animate-rise lg:block" />

      {/* Lower left: the Ajo card */}
      <div className="absolute left-3 top-[400px] z-20 hidden animate-rise sm:block sm:left-[calc(50%-370px)] sm:top-[370px] lg:left-[calc(50%-420px)] lg:top-[360px]" style={enter(1000)}>
        <Float amp={7} duration={5.6} delay={1.3}>
          <MonthlySavingsCard />
        </Float>
      </div>

      {/* Lower right: receipt pill */}
      <div className="absolute right-[calc(50%-400px)] top-[430px] z-20 hidden animate-rise md:block lg:right-[calc(50%-440px)] lg:top-[440px]" style={enter(1150)}>
        <Float amp={6} duration={6} delay={0.2}>
          <SmsPill />
        </Float>
      </div>
    </div>
  );
}
