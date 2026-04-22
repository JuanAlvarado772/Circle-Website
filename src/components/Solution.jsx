const roles = [
  { bg: '#B8E4F2', icon: '🔍', title: 'Explorer', desc: 'Discover events and communities that match your vibe.', features: ['Discover local events', 'Connect via QR code', 'Earn badges & history'] },
  { bg: '#FAD0A8', icon: '⚡', title: 'Connector', desc: 'Create events and keep your community engaged long after the event ends.', features: ['Easy event creation', 'Attendee chat tools', 'Recurring Circles'] },
  { bg: '#D4EDD4', icon: '🏪', title: 'Builder', desc: 'Run branded events and build real customer loyalty.', features: ['Branded events', 'Loyal customer base', 'Community marketing'] },
  { bg: '#E8D9F5', icon: '🤝', title: 'Networker', desc: 'Expand your professional network naturally with smart follow-up nudges.', features: ['Instant QR exchange', 'Follow-up nudges', 'Natural networking'] },
]

export default function Solution() {
  return (
    <section id="solution" style={{ padding: '8rem 3rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto 5rem' }}>
        <p style={{
          fontSize: '0.7rem', fontWeight: 500,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--orange-dark)', marginBottom: '1.5rem'
        }}>Who It's For</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
          fontWeight: 300, lineHeight: 1.15, color: 'var(--ink)'
        }}>
          Built for everyone in your{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--orange-dark)' }}>community</em>
        </h2>
      </div>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem'
      }}>
        {roles.map(r => (
          <div key={r.title}
            style={{ background: r.bg, borderRadius: 20, padding: '2.25rem 1.75rem', transition: 'transform 0.3s, box-shadow 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 24px 60px rgba(26,22,18,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', marginBottom: '1.25rem', background: 'rgba(255,255,255,0.6)'
            }}>{r.icon}</div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.625rem', fontWeight: 600,
              color: 'var(--ink)', marginBottom: '0.75rem'
            }}>{r.title}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', lineHeight: 1.65, fontWeight: 300 }}>{r.desc}</p>
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {r.features.map(f => (
                <span key={f} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--ink-soft)' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>→</span>{f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}