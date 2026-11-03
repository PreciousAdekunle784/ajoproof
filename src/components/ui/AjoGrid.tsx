import { Check } from 'lucide-react';

/* The 31-day Ajo card: one box per day, stamped in order.
   animate: the stamps land one after another (pure CSS, starts after `delayMs`). */
export function AjoGrid({
  paid = 24, days = 31, today, size = 'md', className = '', animate = true, delayMs = 900,
}: { paid?: number; days?: number; today?: number; size?: 'xs' | 'sm' | 'md'; className?: string; animate?: boolean; delayMs?: number }) {
  const cell = size === 'xs' ? 'rounded-[3px]' : size === 'sm' ? 'rounded-[5px]' : 'rounded-[7px]';
  const step = size === 'xs' ? 28 : 38;
  return (
    <ol className={`grid grid-cols-7 ${size === 'xs' ? 'gap-[3px]' : size === 'sm' ? 'gap-1' : 'gap-[5px]'} ${className}`} aria-label={`${paid} of ${days} days paid`}>
      {Array.from({ length: days }, (_, i) => {
        const day = i + 1;
        const isPaid = day <= paid;
        const isToday = day === today;
        return (
          <li key={day} className={`relative aspect-square ${cell} ${isPaid ? '' : 'border border-white/10 bg-white/[0.03]'}`}>
            {size === 'md' && !isPaid && <span className="absolute left-1 top-0.5 text-[7px] font-semibold text-white/30">{day}</span>}
            {isPaid && (
              <span
                className={`absolute inset-0 grid place-items-center ${cell} ${animate ? 'stamp-anim' : ''} ${
                  isToday ? 'bg-lime text-forest-950 ring-2 ring-lime/40 ring-offset-1 ring-offset-forest-950'
                  : size === 'xs' ? 'bg-lime/85' : 'bg-lime/[0.18] text-lime'
                }`}
                style={animate ? { animationDelay: `${delayMs + i * step + (isToday ? 220 : 0)}ms` } : undefined}
              >
                {size !== 'xs' && <Check className={size === 'sm' ? 'size-2.5' : 'size-3'} strokeWidth={3.2} aria-hidden="true" />}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
