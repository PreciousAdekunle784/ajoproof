/* AjoProof wordmark: a stamped day box (the Ajo card) + the name. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#A7F58A" />
        <g fill="none" stroke="#07140D" strokeWidth="1.6" opacity=".45">
          <rect x="6" y="6" width="8.5" height="8.5" rx="2" />
          <rect x="17.5" y="6" width="8.5" height="8.5" rx="2" />
          <rect x="6" y="17.5" width="8.5" height="8.5" rx="2" />
        </g>
        <rect x="17.5" y="17.5" width="8.5" height="8.5" rx="2" fill="#07140D" />
        <path d="M19.6 21.9l1.7 1.7 3-3.3" fill="none" stroke="#A7F58A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[1.3rem] font-bold tracking-[-0.03em]">
        Ajo<span className="text-lime-soft">Proof</span>
      </span>
    </span>
  );
}
