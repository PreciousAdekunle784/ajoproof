'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';

/* Loads only the animation features we use, and turns off movement for
   anyone who has "reduce motion" switched on. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
