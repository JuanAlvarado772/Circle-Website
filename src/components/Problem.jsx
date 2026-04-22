const cards = [
  { n: '01', title: 'Connections that disappear', body: 'People attend events, exchange a few words, and never reconnect. The moment passes and the potential is lost forever.' },
  { n: '02', title: 'Hosts left without engagement', body: 'Event organizers put in the work but have no way to keep attendees engaged or excited after the event ends.' },
  { n: '03', title: 'Businesses missing community', body: 'Small businesses rely on ads to reach people, when their greatest asset — loyal customers — is sitting untapped.' },
]

export default function Problem() {
  return (
    <section id="problem" style={{
      background: 'var(--ink)', color: 'var(--cream)',
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 3rem)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '1.5rem' }}>The Problem</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 5vw, 3.75rem)',
          fontWeight: 300, lineHeight: 1.15, marginBottom: '1rem'
        }}>
          Social events should not{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>end</em>{' '}
          when you leave.
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem', marginTop: '3rem'
        }}>
          {cards.map(c => (
            <div key={c.n} style={{
              background: 'rgba(245,240,232,0.04)',
              border: '1px solid rgba(245,240,232,0.1)',
              borderRadius: 16, padding: '1.75rem'
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 300, color: 'rgba(126,200,227,0.25)', lineHeight: 1, marginBottom: '1rem' }}>{c.n}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--cream)', marginBottom: '0.75rem', lineHeight: 1.4 }}>{c.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.7, fontWeight: 300 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}