import HeroCanvas from './HeroCanvas'

export default function Hero({ onWaitlistClick }) {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 680,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <HeroCanvas />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%',
        maxWidth: 820,
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 3rem)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        // Slight upward nudge so content feels vertically centered accounting for the scroll hint
        transform: 'translateY(-2.5vh)',
      }}>

        {/* Eyebrow badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
          background: 'var(--orange-light)',
          padding: '0.42rem 1.1rem',
          borderRadius: '100px',
          marginBottom: '2rem',
          opacity: 0,
          animation: 'fadeUp 0.7s ease 0.15s forwards',
          willChange: 'opacity, transform',
        }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--orange-dark)' }}>✦</span>
          <span style={{
            fontSize: '0.71rem', fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--orange-dark)',
          }}>
            Events · People · Community
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(3.5rem, 7.5vw, 7rem)',
          fontWeight: 300,
          lineHeight: 1.03,
          letterSpacing: '-0.01em',
          color: 'var(--ink)',
          maxWidth: 760,
          marginBottom: '1.5rem',
          opacity: 0,
          animation: 'fadeUp 0.8s ease 0.3s forwards',
          willChange: 'opacity, transform',
        }}>
          Anywhere you go,
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--blue-dark)' }}>
            find your circle.
          </em>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          fontWeight: 300,
          color: 'var(--ink-muted)',
          lineHeight: 1.72,
          maxWidth: 500,
          marginBottom: '2.75rem',
          opacity: 0,
          animation: 'fadeUp 0.8s ease 0.5s forwards',
          willChange: 'opacity, transform',
        }}>
          Find events, meet like-minded people, and build community wherever you are.
        </p>

        {/* CTA group */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '0.875rem', flexWrap: 'wrap',
          opacity: 0,
          animation: 'fadeUp 0.8s ease 0.7s forwards',
          willChange: 'opacity, transform',
        }}>
          <a
            href="#cta"
            className="cta-primary"
            onClick={onWaitlistClick}
            style={{
              display: 'inline-flex', alignItems: 'center',
              textDecoration: 'none',
              background: 'var(--ink)', color: 'var(--cream)',
              fontSize: '0.9375rem', fontWeight: 500,
              padding: '0.875rem 2.25rem',
              borderRadius: '100px',
              letterSpacing: '0.01em',
              transition: 'opacity 0.2s, transform 0.2s',
              
            }}
          >
            Join the Waitlist
          </a>
          <a
            href="#solution"
            className="cta-secondary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              textDecoration: 'none',
              color: 'var(--ink-soft)',
              fontSize: '0.9375rem', fontWeight: 400,
              padding: '0.875rem 1.75rem',
              borderRadius: '100px',
              border: '1px solid rgba(26,22,18,0.16)',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            See how it works
            <span style={{ fontSize: '0.8rem', marginTop: '0.5px' }}>→</span>
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '1.75rem', left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        opacity: 0,
        animation: 'fadeUp 1s ease 1.4s forwards',
      }}>
        <span style={{
          fontSize: '0.65rem', letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--ink-muted)',
        }}>
          Scroll
        </span>
        <div style={{
          width: 1, height: 44,
          background: 'linear-gradient(to bottom, var(--ink-muted), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        .cta-primary:hover  { opacity: 0.84; transform: translateY(-1px); }
        .cta-secondary:hover { border-color: rgba(26,22,18,0.35); color: var(--ink); }

        @media (max-width: 480px) {
          .cta-primary, .cta-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
