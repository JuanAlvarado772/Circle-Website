import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 1.5rem',
        background: scrolled ? 'rgba(245,240,232,0.92)' : 'rgba(245,240,232,0.75)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(26,22,18,0.07)',
        transition: 'all 0.3s ease'
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <img src="/Logo_Circle (1).png" alt="Circle" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.4rem', fontWeight: 600,
            color: 'var(--ink)', letterSpacing: '0.02em'
          }}>Circle</span>
        </a>

        {/* Desktop links */}
        <ul style={{
          display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none'
        }} className="nav-desktop">
          {[
            ['#problem', 'The Problem'],
            ['#solution', "Who It's For"],
            ['#phases', 'Roadmap'],
            ['#model', 'Business']
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} style={{ textDecoration: 'none', color: 'var(--ink-soft)', fontSize: '0.875rem' }}>{label}</a>
            </li>
          ))}
          <li>
            <a href="#cta" style={{
              textDecoration: 'none', color: 'var(--cream)', background: 'var(--ink)',
              padding: '0.55rem 1.4rem', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 500
            }}>Join Waitlist</a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px'
          }}>
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--ink)', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--ink)', borderRadius: 2, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--ink)', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '65px', left: 0, right: 0, zIndex: 99,
          background: 'rgba(245,240,232,0.98)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(26,22,18,0.07)',
          display: 'flex', flexDirection: 'column', padding: '1.5rem',
          gap: '1.25rem'
        }}>
          {[
            ['#problem', 'The Problem'],
            ['#solution', "Who It's For"],
            ['#phases', 'Roadmap'],
            ['#model', 'Business']
          ].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              textDecoration: 'none', color: 'var(--ink-soft)',
              fontSize: '1rem', fontWeight: 400
            }}>{label}</a>
          ))}
          <a href="#cta" onClick={() => setMenuOpen(false)} style={{
            textDecoration: 'none', color: 'var(--cream)', background: 'var(--ink)',
            padding: '0.75rem 1.5rem', borderRadius: '100px',
            fontSize: '0.9375rem', fontWeight: 500, textAlign: 'center'
          }}>Join Waitlist</a>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .nav-hamburger { display: none !important; } }
        @media (max-width: 768px) { .nav-desktop { display: none !important; } }
      `}</style>
    </>
  )
}