'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '@/config/site';
import { Logo } from './ui/Logo';
import { ButtonLink } from './ui/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'border-b border-white/10 bg-forest-950/80 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-[76px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="AjoProof home" className="rounded-lg">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative rounded-full px-4 py-2 text-[0.93rem] font-medium text-white/75 transition-colors hover:text-white"
              >
                {item.label}
                {i === 0 && <span className="absolute right-2.5 top-2.5 size-1 rounded-full bg-lime" aria-hidden="true" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={site.links.signIn} className="rounded-full px-4 py-2 text-[0.93rem] font-medium text-white/85 transition-colors hover:text-white">
            Sign In
          </a>
          <ButtonLink href={site.links.getStarted} size="sm" className="px-5">
            Get Started
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ButtonLink href={site.links.getStarted} size="sm" className="max-[380px]:hidden">
            Get Started
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.05] text-white"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-white/[0.07] text-lg font-medium text-white/90"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <ButtonLink href={site.links.signIn} variant="ghost">Sign In</ButtonLink>
            <ButtonLink href={site.links.getStarted}>Get Started</ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
