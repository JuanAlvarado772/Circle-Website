import PhaseOrb from './PhaseOrb'

const phases = [
  { num: '1', bg: 'var(--blue)', border: 'none', color: 'var(--ink)', title: 'Events & Discovery', body: 'Explore events, connect via QR, host communities, build your profile from real experiences.' },
  { num: '2', bg: 'var(--orange-light)', border: 'none', color: 'var(--ink)', title: 'The Social Layer', body: 'Dynamic profiles, a badge system for milestones, and a feed showing what events friends attended.' },
  { num: '3', bg: 'var(--cream)', border: '1px solid var(--cream-dark)', color: 'var(--ink-muted)', title: 'Rewards & Partners', body: 'Earn points for attending, hosting, and connecting. Redeem with local partners.' },
]

const badges = [
  { top: 20, right: -10, bottom: 'auto', left: 'auto', delay: '-1s', dot: 'var(--blue-dark)', label: 'Social Layer Live' },
  { top: 'auto', right: 'auto', bottom: 50, left: -20, delay: '-3s', dot: 'var(--orange-dark)', label: 'Badge Unlocked' },
  { top: 'auto', right: 20, bottom: 10, left: 'auto', delay: '-2s', dot: '#7DC47D', label: 'Rewards Active' },
]

export default function Phases() {
  return (
    <section id="phases" style={{ background: 'var(--cream-dark)', padding: 'clamp(4rem, 8vw, 8rem) clamp(1.25rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Orb visual — hidden on mobile */}
        <div className="phases-orb-wrap" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div style={{ position: 'relative', width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              animation: 'float 6s ease-in-out infinite',
              borderRadius: '50%',
              boxShadow: '0 30px 80px rgba(0,0,0,0.18)',
              overflow: 'hidden',
              width: 220, height: 220,
            }}>
              <PhaseOrb />
            </div>
            {badges.map(b => (
              <div key={b.label} style={{
                position: 'absolute', background: 'white', borderRadius: 14,
                padding: '0.65rem 0.9rem',
                boxShadow: '0 8px 30px rgba(26,22,18,0.12)',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.75rem', fontWeight: 500, color: 'var(--ink)',
                whiteSpace: 'nowrap', animation: `float 6s ease-in-out ${b.delay} infinite`,
                top: b.top, right: b.right, bottom: b.bottom, left: b.left
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: b.dot, flexShrink: 0 }} />
                {b.label}
              </div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange-dark)', marginBottom: '1.5rem' }}>Roadmap</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            fontWeight: 300, lineHeight: 1.15, color: 'var(--ink)', marginBottom: '2.5rem'
          }}>
            Growing with{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--orange-dark)' }}>you</em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {phases.map(p => (
              <div key={p.num} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600,
                  background: p.bg, border: p.border, color: p.color
                }}>{p.num}</div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '0.3rem' }}>{p.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', lineHeight: 1.6, fontWeight: 300 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}