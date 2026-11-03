import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { site } from '@/config/site';
import { MotionProvider } from '@/components/ui/MotionProvider';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    url: '/',
    locale: 'en_NG',
  },
  twitter: { card: 'summary_large_image', title: `${site.name} · ${site.tagline}`, description: site.description },
  keywords: ['Ajo', 'Alajo', 'Esusu', 'daily savings', 'thrift collector', 'Nigeria', 'SMS receipt', 'savings history'],
};

/* Plus Jakarta Sans, self-hosted (OFL) and preloaded; a size-matched fallback avoids layout shift. */
const jakarta = localFont({
  src: [
    { path: '../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2', weight: '200 800', style: 'normal' },
  ],
  variable: '--font-jakarta',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'Arial'],
  adjustFontFallback: 'Arial',
});

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#07140D' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={jakarta.variable}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
