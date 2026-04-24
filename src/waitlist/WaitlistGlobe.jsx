import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Particle globe — dots distributed on a sphere surface via fibonacci lattice
// Slowly rotates. No physics, no post-processing. ~35 lines of geometry.
function GlobePoints({ count = 1800, radius = 2.2 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const pts = new Float32Array(count * 3)
    const golden = Math.PI * (3 - Math.sqrt(5)) // golden angle
    for (let i = 0; i < count; i++) {
      const y   = 1 - (i / (count - 1)) * 2          // -1 to 1
      const r   = Math.sqrt(1 - y * y)
      const phi = golden * i
      pts[i * 3]     = Math.cos(phi) * r * radius
      pts[i * 3 + 1] = y * radius
      pts[i * 3 + 2] = Math.sin(phi) * r * radius
    }
    return pts
  }, [count, radius])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.09
      ref.current.rotation.x += delta * 0.012
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#C4A882"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  )
}

export default function WaitlistGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 1.5]}   // cap at 1.5 — crisp but not heavy
    >
      <ambientLight intensity={0.4} />
      <GlobePoints />
    </Canvas>
  )
}
