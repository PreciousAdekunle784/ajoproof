import { ArrowRight } from 'lucide-react';

type Variant = 'primary' | 'ghost' | 'dark' | 'outline-dark';

const styles: Record<Variant, string> = {
  primary: 'bg-lime text-forest-950 hover:bg-lime-soft shadow-[0_10px_30px_-10px_rgba(167,245,138,0.55)]',
  ghost: 'text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/25',
  dark: 'bg-forest-950 text-white hover:bg-forest-800',
  'outline-dark': 'text-forest-950 border border-forest-950/15 hover:border-forest-950/35 hover:bg-forest-950/[0.04]',
};

/** A link that looks like a button (every CTA on this page navigates somewhere). */
export function ButtonLink({
  href, children, variant = 'primary', arrow = false, className = '', size = 'md',
}: {
  href: string; children: React.ReactNode; variant?: Variant; arrow?: boolean; className?: string; size?: 'sm' | 'md' | 'lg';
}) {
  const pad = size === 'sm' ? 'h-10 pl-4 pr-4 text-sm' : size === 'lg' ? 'h-14 pl-7 text-base' : 'h-12 pl-6 text-[0.95rem]';
  const withArrow = arrow ? (size === 'lg' ? 'pr-2' : 'pr-1.5') : size === 'lg' ? 'pr-7' : size === 'sm' ? '' : 'pr-6';
  return (
    <a
      href={href}
      className={`group inline-flex select-none items-center justify-center gap-3 rounded-full font-semibold transition-all duration-200 ease-out active:scale-[0.97] ${pad} ${withArrow} ${styles[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className={`grid place-items-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5 ${
            size === 'lg' ? 'size-10' : 'size-9'
          } ${variant === 'primary' ? 'bg-forest-950 text-lime' : 'bg-lime text-forest-950'}`}
        >
          <ArrowRight className="size-4" strokeWidth={2.4} />
        </span>
      )}
    </a>
  );
}
