/* =====================================================================
   The hero atmosphere: deep forest base, vertical translucent strips
   (like light through hanging cloth), a glow behind the phone, soft rays,
   grain and a vignette. Pure CSS, no images. Phones get fewer strips.
   ===================================================================== */

// Relative brightness of each strip, left to right. Brightest near the centre.
const STRIPS = [0.18, 0.3, 0.22, 0.42, 0.3, 0.55, 0.4, 0.7, 0.62, 0.48, 0.66, 0.38, 0.52, 0.3, 0.4, 0.2];

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#123a20_0%,#0a1d11_45%,#07140D_80%)]" />

      {/* Vertical strips, fading out toward the bottom and the far edges. */}
      <div
        className="absolute inset-x-0 top-0 flex h-[92%] justify-center"
        style={{
          WebkitMaskImage: 'radial-gradient(85% 75% at 50% 18%, #000 30%, transparent 78%)',
          maskImage: 'radial-gradient(85% 75% at 50% 18%, #000 30%, transparent 78%)',
        }}
      >
        {STRIPS.map((o, i) => (
          <div
            key={i}
            className={`h-full flex-1 border-l border-white/[0.035] ${i % 2 === 1 ? 'max-md:hidden' : ''}`}
            style={{
              background: `linear-gradient(90deg, rgba(167,245,138,0) 0%, rgba(167,245,138,${(o * 0.16).toFixed(3)}) 55%, rgba(12,32,19,${(o * 0.5).toFixed(3)}) 100%)`,
            }}
          />
        ))}
      </div>

      {/* Light falling from above. */}
      <div className="absolute left-1/2 top-[-20%] h-[70%] w-[min(1100px,140%)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(199,255,177,0.16),transparent)]" />

      {/* Glow behind the phone, breathing slowly. */}
      <div className="absolute bottom-[-18%] left-1/2 h-[min(720px,90vw)] w-[min(980px,140vw)] -translate-x-1/2 animate-[glow_7s_ease-in-out_infinite] bg-[radial-gradient(closest-side,rgba(167,245,138,0.30),rgba(167,245,138,0.08)_55%,transparent)]" />

      <div className="noise absolute inset-0 opacity-[0.07] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
      {/* Hand-off into the section below. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-forest-950" />

      <style>{`@keyframes glow { 0%,100% { opacity: .85; transform: translateX(-50%) scale(1); } 50% { opacity: 1; transform: translateX(-50%) scale(1.04); } }`}</style>
    </div>
  );
}
