'use client';

import { m } from 'motion/react';

/* Scroll-triggered reveal: a short rise and fade, once. */
export function Reveal({
  children, delay = 0, y = 24, className, as = 'div',
}: { children: React.ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'article' }) {
  const C = as === 'li' ? m.li : as === 'article' ? m.article : m.div;
  return (
    <C
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </C>
  );
}
