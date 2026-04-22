export default function CTA() {
  return (
    <section id="cta" style={{ background: 'var(--cream)', padding: '9rem 3rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--blue-dark)', marginBottom: '1.5rem' }}>Be Part of It</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--ink)', marginBottom: '1.5rem' }}>
          Your community is waiting to{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--orange-dark)' }}>connect</em>
        </h2>
        <p style={{ fontSize: '1.0625rem', color: 'var(--ink-muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: '2.5rem' }}>
          Join the waitlist and be among the first to experience Circle — where every event is just the beginning.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--ink)', color: 'var(--cream)', fontSize: '0.9375rem', fontWeight: 500, padding: '0.85rem 2rem', borderRadius: '100px', textDecoration: 'none' }}>
            Join the Waitlist
          </a>
          <a href="mailto:hello@circleapp.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--ink)', border: '1.5px solid var(--ink)', fontSize: '0.9375rem', fontWeight: 400, padding: '0.85rem 2rem', borderRadius: '100px', textDecoration: 'none' }}>
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}