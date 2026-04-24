import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * WaitlistCanvas — background for the waitlist form page.
 * 
 * Different from HeroCanvas: no orbiting geometry.
 * Instead: a sparse field of drifting particles.
 * Same brand palette, quieter energy — intimate, not dramatic.
 * 
 * Performance:
 * - Single Points object, no shadows, no post-processing
 * - dpr capped at 1.5
 * - particles move very slowly — no jank on mobile
 */

function DriftField({ count = 280 }) {
  const ref       = useRef()
  const clockRef  = useRef(0)

  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds    = new Float32Array(count)
    const offsets   = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
      speeds[i]   = 0.08 + Math.random() * 0.12
      offsets[i]  = Math.random() * Math.PI * 2
    }
    return { positions, speeds, offsets }
  }, [count])

  const posRef = useRef(positions.slice())

  useFrame((_, delta) => {
    clockRef.current += delta
    const pos = ref.current?.geometry.attributes.position
    if (!pos) return
    for (let i = 0; i < count; i++) {
      // Gentle vertical drift + sine wobble
      pos.array[i * 3 + 1] += speeds[i] * delta * 0.25
      pos.array[i * 3]     += Math.sin(clockRef.current * 0.3 + offsets[i]) * delta * 0.04
      // Wrap when particle drifts too high
      if (pos.array[i * 3 + 1] > 7) {
        pos.array[i * 3 + 1] = -7
        pos.array[i * 3]     = (Math.random() - 0.5) * 18
      }
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={posRef.current}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#7A6F65"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  )
}

export default function WaitlistCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
      dpr={[1, 1.5]}
    >
      <DriftField />
    </Canvas>
  )
}
