import { useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

const COUNT = 1600

// ─── Camera rig: widens FOV on portrait screens so globe stays in frame ────────
function ResponsiveCamera() {
  const { camera } = useThree()
  useEffect(() => {
    const update = () => {
      const isMobilePortrait = window.innerWidth < 600 && window.innerHeight > window.innerWidth
      camera.fov      = isMobilePortrait ? 75 : 45
      camera.position.z = isMobilePortrait ? 6 : 7
      camera.updateProjectionMatrix()
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [camera])
  return null
}

// ─── Globe ────────────────────────────────────────────────────────────────────
//
// assembleRef drives the full lifecycle:
//   0.0       → particles at scattered positions, drifting gently
//   0.0 → 1.0 → assembly: particles converge to sphere
//   1.0        → fully assembled, steady rotation
//   1.0 → 2.0 → explosion: particles scatter outward, rotation accelerates
//
function AssemblingGlobe({ assembleRef }) {
  const pointsRef  = useRef()
  const rotSpeedRef = useRef(0)  // current rotation speed, increases on exit

  const finalPositions = useMemo(() => {
    const arr    = new Float32Array(COUNT * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    const isMobile = window.innerWidth < 600
    const radius = isMobile ? 1.7 : 2.4
    for (let i = 0; i < COUNT; i++) {
      const y   = 1 - (i / (COUNT - 1)) * 2
      const r   = Math.sqrt(1 - y * y)
      const phi = golden * i
      arr[i * 3]     = Math.cos(phi) * r * radius
      arr[i * 3 + 1] = y * radius
      arr[i * 3 + 2] = Math.sin(phi) * r * radius
    }
    return arr
  }, [])

  // Scatter positions: slightly farther out on exit than entry for drama
  const scatterPositions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    const isMobile = window.innerWidth < 600
    const rMin = isMobile ? 3 : 5
    const rRange = isMobile ? 2 : 4
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = rMin + Math.random() * rRange
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  // Exit scatter: particles fly even further out
  const exitPositions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    const isMobile = window.innerWidth < 600
    const rMin = isMobile ? 4 : 8
    const rRange = isMobile ? 3 : 6
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = rMin + Math.random() * rRange
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  const workPositions = useMemo(
    () => new Float32Array(scatterPositions),
    [scatterPositions]
  )

  useFrame((_, delta) => {
    const pts = pointsRef.current
    if (!pts) return

    const raw = assembleRef.current ?? 0
    const pos = pts.geometry.attributes.position

    if (raw <= 1) {
      // ── ASSEMBLE PHASE (0 → 1) ──────────────────────────────────────────────
      // Cubic ease-in-out
      const p = Math.max(0, Math.min(1, raw))
      const t = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2

      for (let i = 0; i < COUNT; i++) {
        // During idle (p ≈ 0), particles drift gently from scatter positions
        const drift = p < 0.05
          ? Math.sin(Date.now() * 0.0003 + i * 0.1) * 0.04
          : 0
        pos.array[i * 3]     = scatterPositions[i * 3]     + (finalPositions[i * 3]     - scatterPositions[i * 3])     * t + drift
        pos.array[i * 3 + 1] = scatterPositions[i * 3 + 1] + (finalPositions[i * 3 + 1] - scatterPositions[i * 3 + 1]) * t
        pos.array[i * 3 + 2] = scatterPositions[i * 3 + 2] + (finalPositions[i * 3 + 2] - scatterPositions[i * 3 + 2]) * t
      }

      // Rotation builds as assembly progresses
      rotSpeedRef.current = 0.04 + 0.08 * t
      pts.rotation.y += delta * rotSpeedRef.current
      pts.rotation.x += delta * 0.008 * t

    } else {
      // ── EXPLODE PHASE (1 → 2) ───────────────────────────────────────────────
      const p = Math.max(0, Math.min(1, raw - 1))  // 0 → 1 within explode phase
      // Ease-in so explosion starts slow then accelerates
      const t = p * p * p

      for (let i = 0; i < COUNT; i++) {
        pos.array[i * 3]     = finalPositions[i * 3]     + (exitPositions[i * 3]     - finalPositions[i * 3])     * t
        pos.array[i * 3 + 1] = finalPositions[i * 3 + 1] + (exitPositions[i * 3 + 1] - finalPositions[i * 3 + 1]) * t
        pos.array[i * 3 + 2] = finalPositions[i * 3 + 2] + (exitPositions[i * 3 + 2] - finalPositions[i * 3 + 2]) * t
      }

      // Rotation accelerates during explosion
      rotSpeedRef.current = Math.min(rotSpeedRef.current + delta * 0.8, 2.5)
      pts.rotation.y += delta * rotSpeedRef.current
      pts.rotation.x += delta * 0.15 * t
    }

    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={workPositions}
          count={COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#C4A882"
        transparent
        opacity={0.82}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function WaitlistTransition({ onComplete }) {
  const overlayRef  = useRef()
  const canvasRef   = useRef()
  const titleRef    = useRef()
  const progressRef = useRef()
  const assembleRef = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // ── 0.0s: canvas fades in, particles visible at scatter positions ────────
      tl.fromTo(canvasRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power1.out' },
        0
      )

      // ── 0.0–0.8s: idle pause — particles visible, drifting, no assembly yet ──
      // assembleRef stays at 0 during this window

      // ── 0.8s: assembly begins — particles converge over 1.6s ────────────────
      tl.to(assembleRef, {
        current: 1,
        duration: 1.6,
        ease: 'power2.inOut',
      }, 0.8)

      // ── 1.3s: "Circle" drops in (globe ~30% assembled) ───────────────────────
      tl.fromTo(titleRef.current,
        { opacity: 0, y: -52 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        1.3
      )

      // ── 2.0s: progress bar draws ─────────────────────────────────────────────
      tl.fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power1.inOut', transformOrigin: 'left center' },
        2.0
      )

      // ── 3.2s: title fades out ────────────────────────────────────────────────
      tl.to(titleRef.current,
        { opacity: 0, duration: 0.4, ease: 'power2.in' },
        3.2
      )

      // ── 3.3s: explosion — assembleRef goes 1 → 2 over 0.9s ──────────────────
      tl.to(assembleRef, {
        current: 2,
        duration: 0.9,
        ease: 'power3.in',
      }, 3.3)

      // ── 3.6s: overlay fades out as explosion plays ───────────────────────────
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete,
      }, 3.6)
    })

    return () => ctx.revert()
  }, [onComplete])

  return createPortal(
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#100E0B',
        opacity: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Canvas */}
      <div ref={canvasRef} style={{ position: 'absolute', inset: 0, opacity: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
        >
          <ResponsiveCamera />
          <AssemblingGlobe assembleRef={assembleRef} />
        </Canvas>
      </div>

      {/* "Circle" wordmark */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center', pointerEvents: 'none', padding: '0 2rem',
      }}>
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
            textShadow: '0 2px 40px rgba(16,14,11,0.85)',
          }}
        >
          Circle
        </h1>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(2.5rem, 6vw, 4rem)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(260px, 55vw)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
      }}>
        <p style={{
          fontSize: '0.62rem', letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.3)',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400, margin: 0,
        }}>
          Finding your circle
        </p>
        <div style={{
          width: '100%', height: 1,
          background: 'rgba(245,240,232,0.1)',
          borderRadius: 1, overflow: 'hidden', position: 'relative',
        }}>
          <div
            ref={progressRef}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(245,240,232,0.5)',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}
