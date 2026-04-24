import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import WaitlistGlobe from './WaitlistGlobe'

/**
 * WaitlistTransition
 * 
 * Cinematic interlude between homepage and waitlist page.
 * Rendered in a portal so it sits above everything at z-index 999.
 * 
 * Timeline (total ~2.6s):
 *   0.0s  overlay fades in (dark ink)
 *   0.3s  globe fades in + starts rotating
 *   0.8s  "Circle" drops in from above
 *   1.3s  progress bar draws across
 *   2.4s  everything fades out → onComplete fires
 */

export default function WaitlistTransition({ onComplete }) {
  const overlayRef  = useRef()
  const globeRef    = useRef()
  const titleRef    = useRef()
  const progressRef = useRef()
  const trackRef    = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Fade the whole overlay out then call parent
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.55,
            ease: 'power2.inOut',
            onComplete,
          })
        }
      })

      // Overlay in
      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      )

      // Globe fade in
      tl.fromTo(globeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.1'
      )

      // Title drop in
      tl.fromTo(titleRef.current,
        { opacity: 0, y: -48 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      )

      // Progress bar draw
      tl.fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: 'power1.inOut', transformOrigin: 'left center' },
        '+=0.1'
      )

      // Hold 0.2s then timeline ends → onComplete fires
      tl.to({}, { duration: 0.2 })
    })

    return () => ctx.revert()
  }, [onComplete])

  return createPortal(
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: '#100E0B',   // near-black, warmer than pure black
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
      }}
    >
      {/* Globe */}
      <div
        ref={globeRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
        }}
      >
        <WaitlistGlobe />
      </div>

      {/* Centered content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        pointerEvents: 'none',
        padding: '0 2rem',
      }}>
        {/* Title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 300,
            letterSpacing: '0.06em',
            color: '#F5F0E8',
            lineHeight: 1,
            opacity: 0,
            margin: 0,
          }}
        >
          Circle
        </h1>
      </div>

      {/* Progress track — bottom of screen */}
      <div
        ref={trackRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(2.5rem, 6vw, 4rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(280px, 60vw)',
          height: 1,
          background: 'rgba(245,240,232,0.12)',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <div
          ref={progressRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(245,240,232,0.55)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* Subtle label above progress */}
      <p style={{
        position: 'absolute',
        bottom: 'clamp(4rem, 8vw, 6rem)',
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(245,240,232,0.35)',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        margin: 0,
      }}>
        Finding your circle
      </p>
    </div>,
    document.body
  )
}
