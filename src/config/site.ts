/* =====================================================================
   CONFIG: everything you'd change before publishing lives here.
   ===================================================================== */

/** CONFIG: where the AjoProof app runs. Set NEXT_PUBLIC_APP_URL in production,
 *  e.g. https://app.ajoproof.ng. Defaults to a local app on port 3000. */
const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000').replace(/\/$/, '');

/** CONFIG: the public address of this landing page (canonical URL, Open Graph). */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajoproof.ng').replace(/\/$/, '');

export const site = {
  name: 'AjoProof',
  url: siteUrl,
  tagline: 'Your Ajo. Now With Proof.',
  description:
    'AjoProof gives traditional Ajo daily savings digital accountability: every contribution recorded, an instant SMS receipt for every saver, and deposits tracked with licensed financial partners.',
  links: {
    getStarted: `${appUrl}/start`, // collectors sign up or log in here
    signIn: `${appUrl}/login`,
    savers: `${appUrl}/join/saver`, // savers don't need an app; this explains how it works for them
    lenders: 'mailto:lenders@ajoproof.ng?subject=AjoProof%20for%20lenders', // CONFIG: lender contact
    contact: 'mailto:hello@ajoproof.ng', // CONFIG: general contact
  },
  nav: [
    { label: 'Home', href: '#top' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'For Collectors', href: '#collectors' },
    { label: 'For Savers', href: '#savers' },
    { label: 'For Lenders', href: '#lenders' },
  ],
} as const;
