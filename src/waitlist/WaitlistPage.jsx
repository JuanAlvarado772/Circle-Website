import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import WaitlistCanvas from './WaitlistCanvas'
import WaitlistForm   from './WaitlistForm'

/**
 * WaitlistPage
 * 
 * The destination after the transition.
 * Dark background, sparse particle canvas, centered form.
 * 
 * Receives `onBack` prop — lets user navigate back to homepage.
 * Content animates in on mount (transition already complete by this point).
 */
export default function WaitlistPage({ onBack }) {
  const contentRef = useRef()

  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 }
    )
  }, [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#100E0B',
      overflowY: 'auto',
      zIndex: 10,
    }}>
      {/* Canvas background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <WaitlistCanvas />
      </div>

      {/* Back to homepage — top left */}
      <button
        onClick={onBack}
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '1.75rem',
          zIndex: 20,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'rgba(245,240,232,0.45)',
          fontSize: '0.8rem',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          letterSpacing: '0.02em',
          padding: '0.5rem 0',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,240,232,0.85)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.45)'}
      >
        ← Circle
      </button>

      {/* Main content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 'clamp(5rem, 10vh, 7rem) clamp(1.5rem, 5vw, 3rem) 4rem',
        }}
      >
        <div style={{ width: '100%', maxWidth: 560 }}>

          {/* Eyebrow */}
          <p style={{
            fontSize: '0.68rem',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#4AACCF',
            marginBottom: '1.25rem',
          }}>
            You're early
          </p>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: '#F5F0E8',
            marginBottom: '0.85rem',
            letterSpacing: '-0.01em',
          }}>
            Your circle is{' '}
            <em style={{ fontStyle: 'italic', color: '#E8863A' }}>waiting.</em>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            color: 'rgba(245,240,232,0.5)',
            fontWeight: 300,
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: 440,
          }}>
            Join the waitlist and be among the first to find events, meet people, and build real community — wherever you are.
          </p>

          {/* Form */}
          <WaitlistForm
            onSubmit={data => {
              // TODO: send `data` to backend / email service
              console.log('Waitlist submission:', data)
            }}
          />
        </div>
      </div>
    </div>
  )
}
