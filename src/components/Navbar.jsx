import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.25rem 3rem',
      background: scrolled ? 'rgba(245,240,232,0.92)' : 'rgba(245,240,232,0.75)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(26,22,18,0.07)',
      transition: 'all 0.3s ease'
    }}>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
        <img src="/Logo_Circle (1).png" alt="Circle" style={{ width: 36, height: 36, objectFit: 'contain' }} />
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.5rem', fontWeight: 600,
          color: 'var(--ink)', letterSpacing: '0.02em'
        }}>Circle</span>
      </a>
      <ul style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none' }}>
        {[
          ['#problem', 'The Problem'],
          ['#solution', "Who It's For"],
          ['#phases', 'Roadmap'],
          ['#model', 'Business']
        ].map(([href, label]) => (
          <li key={href}>
            <a href={href} style={{
              textDecoration: 'none', color: 'var(--ink-soft)',
              fontSize: '0.875rem', letterSpacing: '0.03em'
            }}>{label}</a>
          </li>
        ))}
        <li>
          <a href="#cta" style={{
            textDecoration: 'none', color: 'var(--cream)',
            background: 'var(--ink)', padding: '0.55rem 1.4rem',
            borderRadius: '100px', fontSize: '0.875rem', fontWeight: 500
          }}>Join Waitlist</a>
        </li>
      </ul>
    </nav>
  )
}