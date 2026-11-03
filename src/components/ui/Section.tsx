export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = 'dark' }: { children: React.ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] ${
        tone === 'dark' ? 'border border-white/12 bg-white/[0.05] text-lime-soft' : 'border border-forest-950/10 bg-white text-forest-800'
      }`}
    >
      <span className={`size-1.5 rounded-full ${tone === 'dark' ? 'bg-lime' : 'bg-forest-800'}`} aria-hidden="true" />
      {children}
    </p>
  );
}

export function Heading({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <h2 id={id} className={`text-balance text-[2.1rem] font-bold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.4rem] ${className}`}>
      {children}
    </h2>
  );
}
