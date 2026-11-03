import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/hero/Hero';
import { ValueProps } from '@/components/sections/ValueProps';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Audiences } from '@/components/sections/Audiences';
import { Security } from '@/components/sections/Security';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/Footer';
import { site } from '@/config/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  slogan: site.tagline,
  description: site.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Abeokuta', addressRegion: 'Ogun State', addressCountry: 'NG' },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main" className="sr-only z-[60] rounded-full bg-lime px-4 py-2 font-semibold text-forest-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <ValueProps />
        <HowItWorks />
        <Audiences />
        <Security />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
