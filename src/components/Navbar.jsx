import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['#problem', 'Why Circle'],
    ['#solution', 'How It Works'],
    ['#phases', 'Roadmap'],
    ['#model', 'For Businesses'],
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.1rem 2rem',
        background: scrolled ? 'rgba(245,240,232,0.96)' : 'rgba(245,240,232,0.72)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(26,22,18,0.09)' : '1px solid transparent',
        transition: 'all 0.35s ease'
      }}>

        {/* Logo + Brand */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <img
            src="/Logo_Circle (1).png"
            alt="Circle"
            style={{ width: 38, height: 38, objectFit: 'contain' }}
          />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.6rem', fontWeight: 600,
            color: 'var(--ink)', letterSpacing: '0.025em',
            lineHeight: 1
          }}>
            Circle
          </span>
        </a>

        {/* Desktop nav */}
        <ul style={{
          display: 'flex', alignItems: 'center', gap: '2.25rem', listStyle: 'none'
        }} className="nav-desktop">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} style={{
                textDecoration: 'none',
                color: 'var(--ink-soft)',
                fontSize: '0.875rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                transition: 'color 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-soft)'}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#cta" style={{
              textDecoration: 'none', color: 'var(--cream)',
              background: 'var(--ink)',
              padding: '0.6rem 1.6rem', borderRadius: '100px',
              fontSize: '0.9rem', fontWeight: 500,
              letterSpacing: '0.01em',
              transition: 'opacity 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Join Waitlist
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          aria-label="Toggle menu"
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
          background: 'rgba(245,240,232,0.98)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(26,22,18,0.07)',
          display: 'flex', flexDirection: 'column', padding: '1.5rem 2rem',
          gap: '1.25rem'
        }}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              textDecoration: 'none', color: 'var(--ink-soft)',
              fontSize: '1rem', fontWeight: 400
            }}>{label}</a>
          ))}
          <a href="#cta" onClick={() => setMenuOpen(false)} style={{
            textDecoration: 'none', color: 'var(--cream)', background: 'var(--ink)',
            padding: '0.85rem 1.5rem', borderRadius: '100px',
            fontSize: '0.9375rem', fontWeight: 500, textAlign: 'center',
            marginTop: '0.25rem'
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
