const cards = [
  { bg: 'rgba(126,200,227,0.15)', border: 'rgba(126,200,227,0.25)', pillBg: 'rgba(126,200,227,0.2)', pillCol: '#B8E4F2', icon: '👤', title: 'Freemium Users', body: 'Free to join and explore. Premium unlocks advanced filters, boosts, and exclusive community features.', pills: ['Premium Filters', 'Profile Boosts', 'Priority Access'] },
  { bg: 'rgba(244,169,106,0.15)', border: 'rgba(244,169,106,0.25)', pillBg: 'rgba(244,169,106,0.2)', pillCol: '#FAD0A8', icon: '🎟️', title: 'Host Subscriptions', body: 'Hosts unlock featured placement, analytics, recurring event tools, and ticketing integrations.', pills: ['Featured Placement', 'Analytics', 'Ticketing Cut'] },
  { bg: 'rgba(245,240,232,0.06)', border: 'rgba(245,240,232,0.12)', pillBg: 'rgba(245,240,232,0.1)', pillCol: 'rgba(245,240,232,0.7)', icon: '🤝', title: 'Business Partnerships', body: 'Brands run sponsored Circles and market directly to engaged, loyal community members.', pills: ['Sponsored Circles', 'Reward Integrations', 'Co-marketing'] },
]

export default function Model() {
  return (
    <section id="model" style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '8rem 3rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '1.5rem' }}>Business Model</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', fontWeight: 300, lineHeight: 1.15 }}>
          Built to{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>grow together</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '4rem' }}>
          {cards.map(c => (
            <div key={c.title} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 18, padding: '2.25rem 2rem' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>{c.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: 'var(--cream)', marginBottom: '0.75rem' }}>{c.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.7, fontWeight: 300 }}>{c.body}</p>
              <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {c.pills.map(p => (
                  <span key={p} style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '100px', background: c.pillBg, color: c.pillCol }}>{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}