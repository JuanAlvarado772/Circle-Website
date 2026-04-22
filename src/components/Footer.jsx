export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(245,240,232,0.5)', padding: '2.5rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 600, color: 'var(--cream)' }}>Circle</span>
      <p style={{ fontSize: '0.8125rem' }}>2025 Circle. All rights reserved.</p>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {['Privacy', 'Terms', 'Contact'].map(l => (
          <a key={l} href="#" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none', fontSize: '0.8125rem' }}>{l}</a>
        ))}
      </div>
    </footer>
  )
}