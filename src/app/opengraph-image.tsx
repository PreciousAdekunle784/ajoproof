import { ImageResponse } from 'next/og';

export const alt = 'AjoProof: Your Ajo. Now With Proof.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* Social preview: brand colours, the headline and a stamped Ajo grid. */
export default function OgImage() {
  const cells = Array.from({ length: 31 }, (_, i) => i < 24);
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: 'linear-gradient(180deg,#123a20 0%,#07140D 75%)', color: '#fff', padding: 72, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 34, fontWeight: 700 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: '#A7F58A' }} />
            <span>Ajo</span><span style={{ color: '#C7FFB1', marginLeft: -14 }}>Proof</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            <span>Your Ajo.</span>
            <span style={{ display: 'flex' }}>Now With&nbsp;<span style={{ color: '#A7F58A' }}>Proof.</span></span>
          </div>
          <div style={{ fontSize: 24, color: '#B7C2B8' }}>Every contribution recorded. Every payment accounted for.</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: 300, gap: 10, alignContent: 'center' }}>
          {cells.map((on, i) => (
            <div key={i} style={{ width: 33, height: 33, borderRadius: 8, background: on ? '#A7F58A' : 'rgba(255,255,255,0.08)', border: on ? 'none' : '1px solid rgba(255,255,255,0.15)' }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
