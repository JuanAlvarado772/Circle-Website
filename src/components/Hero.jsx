import HeroCanvas from './HeroCanvas'

export default function Hero() {
  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh',
      minHeight: 700, display: 'flex',
      alignItems: 'center', overflow: 'hidden'
    }}>
      <HeroCanvas />
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem) 2rem',
        width: '100%'
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center',
          background: 'var(--orange-light)', color: 'var(--orange-dark)',
          fontSize: '0.75rem', fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '0.4rem 1rem', borderRadius: '100px',
          marginBottom: '1.75rem', opacity: 0,
          animation: 'fadeUp 0.8s ease 0.2s forwards'
        }}>
          Community Platform
        </span>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
          fontWeight: 300, lineHeight: 1.05,
          color: 'var(--ink)', maxWidth: 720,
          marginBottom: '1.5rem', opacity: 0,
          animation: 'fadeUp 0.8s ease 0.4s forwards'
        }}>
          Where events become{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--blue-dark)' }}>
            lasting connections
          </em>
        </h1>

        <p style={{
          fontSize: '1.125rem', fontWeight: 300,
          color: 'var(--ink-muted)', maxWidth: 480,
          lineHeight: 1.7, marginBottom: '2.5rem',
          opacity: 0, animation: 'fadeUp 0.8s ease 0.6s forwards'
        }}>
          Circle is more than event discovery. It is where your social life
          and communities live, grow, and thrive together.
        </p>

        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '1.25rem', opacity: 0,
          animation: 'fadeUp 0.8s ease 0.8s forwards'
        }}>
          <a href="#cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--ink)', color: 'var(--cream)',
            fontSize: '0.9375rem', fontWeight: 500,
            padding: '0.85rem 2rem', borderRadius: '100px', textDecoration: 'none'
          }}>
            Join the Waitlist
          </a>
          <a href="#solution" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: 'var(--ink-soft)', fontSize: '0.9375rem', textDecoration: 'none'
          }}>
            See how it works
          </a>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '1.5rem',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 2, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '0.5rem',
        opacity: 0, animation: 'fadeUp 1s ease 1.5s forwards'
      }} className="scroll-hint">
        <span style={{
          fontSize: '0.7rem', letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--ink-muted)'
        }}>Scroll</span>
        <div style={{
          width: 1, height: 48,
          background: 'linear-gradient(to bottom, var(--ink-muted), transparent)',
          animation: 'scrollPulse 2s ease infinite'
        }} />
      </div>
    </section>
  )
}