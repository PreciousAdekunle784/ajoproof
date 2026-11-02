# AjoProof landing page

Static page: `index.html`, `styles.css`, `main.js`. No build step. Serve the folder from any static host with gzip/brotli on.

## Where to change things

| What | Where |
|---|---|
| App URLs (signup, lenders, login) | `CONFIG.urls` at the top of `main.js` (the `href` in HTML is only the no-JS fallback) |
| Hero card names, daily amount, days stamped on load | `CONFIG.card` in `main.js` + the card markup in `index.html` |
| Receipt printer collector name, phone, amount limits | `CONFIG.printer` in `main.js` |
| Colours (the six palette tokens) | `:root` at the top of `styles.css` |
| Photos | Section 07 in `index.html`: replace each `.photo__frame` div with an `<img loading="lazy">` (comment shows the exact tag) |
| Quotes | Section 07 in `index.html`: `<blockquote>` + `<figcaption>`. Real interview quotes only |
| Domain, OG image | `<head>` of `index.html` (`canonical`, `og:url`, `og:image`) |
| Partner name, regulator, support line | Section 06 clauses and the footer (`[Partner name]`, `[regulator]`, `0803 XXX XXXX`) |

Search `CHANGE`, `CONFIRM` and `LEGAL REVIEW` in `index.html` for everything that still needs a real value or sign-off.

## Notes
- Instrument Serif and IBM Plex Mono are self-hosted in `/fonts` (OFL). Satoshi loads from Fontshare; to self-host it, see the comment in `<head>`.
- GSAP, ScrollTrigger and Lenis are self-hosted in `/vendor` and load after first paint, on screens 960px and wider only. They drive the pinned ledger (section 03) and smooth scrolling. Everything else (stamps, SMS slip, receipt printer, rolling numbers) is plain JS with the Web Animations API, so the hero works immediately on slow networks.
- `prefers-reduced-motion`: the card arrives already stamped, the ledger pages are shown side by side, and nothing scrolls on its own.
- The handwriting on the cards is SVG paths drawn from a single-stroke Hershey script with added ballpoint wobble, not a fourth font.
- SMS text uses `NGN` and plain Yoruba (`Owo re wa lailewu`) on purpose: GSM SMS can't carry ₦ or tone marks, just like real bank alerts. Everywhere else uses ₦ and full tone marks (`Owó rẹ wà láìléwu`).
