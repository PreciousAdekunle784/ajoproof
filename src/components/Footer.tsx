import { site } from '@/config/site';
import { Logo } from './ui/Logo';

export function Footer() {
  return (
    <footer className="bg-forest-950 pb-10 pt-14">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-mist">
            Digital records and receipts for Ajo, the daily savings practice of traders across Southwest Nigeria. Made in Abeokuta.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-white">Explore</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem] text-mist">
            {site.nav.slice(1).map((n) => <li key={n.href}><a className="hover:text-white" href={n.href}>{n.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold text-white">Get in touch</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem] text-mist">
            <li><a className="hover:text-white" href={site.links.signIn}>Sign In</a></li>
            <li><a className="hover:text-white" href={site.links.getStarted}>Get Started</a></li>
            <li><a className="hover:text-white" href={site.links.contact}>hello@ajoproof.ng</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex w-full max-w-[1240px] flex-col gap-3 border-t border-white/10 px-5 pt-6 text-[0.82rem] text-white/45 sm:flex-row sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} AjoProof. AjoProof is a record-keeping technology and does not hold customer funds.</p>
        <p>Funds are held by licensed financial partners.</p>
      </div>
    </footer>
  );
}
