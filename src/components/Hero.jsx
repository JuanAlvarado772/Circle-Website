import HeroCanvas from './HeroCanvas'

export default function Hero() {
  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh',
      minHeight: 700, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', textAlign: 'center'
    }}>
      <HeroCanvas />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 860, margin: '0 auto',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem) 2rem',
        width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>

        {/* Badge — replaces "Community Platform" */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'var(--orange-light)', color: 'var(--orange-dark)',
          fontSize: '0.72rem', fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '0.45rem 1.1rem', borderRadius: '100px',
          marginBottom: '2rem', opacity: 0,
          animation: 'fadeUp 0.8s ease 0.2s forwards'
        }}>
          <span style={{ fontSize: '0.85rem' }}>✦</span> Events · People · Community
        </span>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(3.75rem, 8vw, 7rem)',
          fontWeight: 300, lineHeight: 1.02,
          color: 'var(--ink)',
          maxWidth: 760,
          marginBottom: '1.75rem', opacity: 0,
          animation: 'fadeUp 0.8s ease 0.4s forwards',
          letterSpacing: '-0.01em'
        }}>
          Anywhere you go,{' '}
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--blue-dark)' }}>
            find your circle.
          </em>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.175rem)', fontWeight: 300,
          color: 'var(--ink-muted)', maxWidth: 520,
          lineHeight: 1.75, marginBottom: '2.75rem',
          opacity: 0, animation: 'fadeUp 0.8s ease 0.6s forwards'
        }}>
          Find events, meet like-minded people, and build community wherever you are.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '1rem', flexWrap: 'wrap',
          opacity: 0, animation: 'fadeUp 0.8s ease 0.8s forwards'
        }}>
          <a href="#cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--ink)', color: 'var(--cream)',
            fontSize: '0.9375rem', fontWeight: 500,
            padding: '0.9rem 2.25rem', borderRadius: '100px',
            textDecoration: 'none', letterSpacing: '0.01em',
            transition: 'opacity 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Join the Waitlist
          </a>
          <a href="#solution" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: 'var(--ink-soft)', fontSize: '0.9375rem',
            textDecoration: 'none', fontWeight: 400,
            padding: '0.9rem 1.75rem', borderRadius: '100px',
            border: '1px solid rgba(26,22,18,0.15)',
            transition: 'border-color 0.2s, color 0.2s'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(26,22,18,0.35)'; e.currentTarget.style.color = 'var(--ink)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,22,18,0.15)'; e.currentTarget.style.color = 'var(--ink-soft)' }}
          >
            See how it works →
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '1.5rem',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 2, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '0.5rem',
        opacity: 0, animation: 'fadeUp 1s ease 1.5s forwards'
      }} className="scroll-hint">
        <span style={{
          fontSize: '0.68rem', letterSpacing: '0.15em',
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
