import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import { TextureLoader } from 'three'
import * as THREE from 'three'

const BASE = 'https://threejs.org/examples/textures/planets'

function EarthMesh() {
  const earthRef = useRef()
  const cloudsRef = useRef()

  const [earthMap, cloudsMap, specMap, normalMap] = useLoader(TextureLoader, [
    `${BASE}/earth_atmos_2048.jpg`,
    `${BASE}/earth_clouds_1024.png`,
    `${BASE}/earth_specular_2048.jpg`,
    `${BASE}/earth_normal_2048.jpg`,
  ])

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.1
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.13
  })

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthMap}
          specularMap={specMap}
          normalMap={normalMap}
          shininess={18}
          specular={new THREE.Color(0x336688)}
        />
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.013, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          alphaMap={cloudsMap}
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export default function PhaseOrb() {
  return (
    <Canvas
      style={{ width: 220, height: 220 }}
      camera={{ position: [0, 0, 2.6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#fff8f0" />
      <directionalLight position={[-4, -1, -3]} intensity={0.08} color="#2244aa" />
      <Suspense fallback={null}>
        <EarthMesh />
      </Suspense>
    </Canvas>
  )
}
