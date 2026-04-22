import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function EarthMesh() {
  const earthRef = useRef()
  const cloudsRef = useRef()

  const earthTexture = useMemo(() => {
    const w = 1024, h = 512
    const canvas = document.createElement('canvas')
    canvas.width = w; canvas.height = h
    const ctx = canvas.getContext('2d')

    // Ocean gradient
    const ocean = ctx.createLinearGradient(0, 0, 0, h)
    ocean.addColorStop(0, '#1565a8')
    ocean.addColorStop(0.45, '#2980b9')
    ocean.addColorStop(0.55, '#2980b9')
    ocean.addColorStop(1, '#1565a8')
    ctx.fillStyle = ocean
    ctx.fillRect(0, 0, w, h)

    // Continent helper (equirectangular: lon -180→180, lat 90→-90)
    const lonToX = lon => (lon + 180) / 360 * w
    const latToY = lat => (90 - lat) / 180 * h

    const landColor = () => {
      const shade = Math.random() * 30
      return `rgb(${60 + shade},${110 + shade},${65 + shade})`
    }

    const ellipse = (lon, lat, rx, ry, rot = 0, color = null) => {
      ctx.save()
      ctx.fillStyle = color || landColor()
      ctx.beginPath()
      ctx.ellipse(lonToX(lon), latToY(lat), rx, ry, rot, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    // North America
    ellipse(-100, 50, 90, 75, -0.25, '#5a8f5a')
    ellipse(-105, 30, 55, 40, -0.1, '#6b9e5e')
    // Central America
    ellipse(-85, 13, 18, 12, 0.3, '#5d8c52')
    // South America
    ellipse(-55, -5, 48, 55, 0.1, '#5e8f55')
    ellipse(-60, -30, 35, 40, 0.15, '#648f56')
    // Greenland
    ellipse(-42, 72, 32, 22, -0.1, '#c8d8c8')
    // Europe
    ellipse(15, 50, 42, 38, 0, '#6a9e60')
    ellipse(30, 60, 25, 18, 0.2, '#6a9e60')
    // Africa
    ellipse(20, 10, 60, 88, 0.05, '#7aaa60')
    ellipse(18, -25, 42, 35, 0, '#72a258')
    // Arabia
    ellipse(45, 22, 28, 30, 0.1, '#b5a46a')
    // Asia main body
    ellipse(90, 45, 130, 78, 0, '#6b9e5e')
    ellipse(80, 25, 50, 30, 0, '#72a25a')
    // India
    ellipse(78, 15, 25, 35, 0.05, '#78a860')
    // Southeast Asia / Indonesia
    ellipse(115, 5, 45, 18, 0, '#66955a')
    ellipse(125, -5, 30, 12, 0, '#66955a')
    // Japan
    ellipse(135, 37, 8, 18, 0.3, '#6a9e5e')
    // Australia
    ellipse(134, -25, 52, 38, 0.1, '#b5a46a')
    ellipse(148, -32, 18, 15, 0, '#b0a068')
    // New Zealand
    ellipse(170, -42, 7, 14, 0.3, '#6a9e60')

    // Polar ice caps
    const iceN = ctx.createLinearGradient(0, 0, 0, 55)
    iceN.addColorStop(0, 'rgba(230,240,255,0.95)')
    iceN.addColorStop(1, 'rgba(220,235,255,0)')
    ctx.fillStyle = iceN
    ctx.fillRect(0, 0, w, 55)

    const iceS = ctx.createLinearGradient(0, h - 55, 0, h)
    iceS.addColorStop(0, 'rgba(220,235,255,0)')
    iceS.addColorStop(1, 'rgba(230,240,255,0.95)')
    ctx.fillStyle = iceS
    ctx.fillRect(0, h - 55, w, 55)

    // Subtle ocean depth variation
    ctx.globalAlpha = 0.08
    for (let i = 0; i < 6; i++) {
      const x = Math.random() * w
      const y = Math.random() * h
      const r = 80 + Math.random() * 120
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, '#1a4a8a')
      g.addColorStop(1, 'transparent')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
    }
    ctx.globalAlpha = 1

    return new THREE.CanvasTexture(canvas)
  }, [])

  const cloudTexture = useMemo(() => {
    const w = 1024, h = 512
    const canvas = document.createElement('canvas')
    canvas.width = w; canvas.height = h
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, w, h)

    // Draw wispy cloud patches
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * w
      const y = 30 + Math.random() * (h - 60)
      const rx = 30 + Math.random() * 90
      const ry = 8 + Math.random() * 22
      const alpha = 0.25 + Math.random() * 0.35
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = 'white'
      ctx.beginPath()
      ctx.ellipse(x, y, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2)
      ctx.fill()
      // Repeat at edges for seamless wrap
      ctx.beginPath()
      ctx.ellipse(x + w, y, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(x - w, y, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    return new THREE.CanvasTexture(canvas)
  }, [])

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.12
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.14
  })

  return (
    <group>
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial map={earthTexture} shininess={12} specular={new THREE.Color(0x224466)} />
      </mesh>
      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.012, 64, 64]} />
        <meshPhongMaterial map={cloudTexture} transparent alphaMap={cloudTexture} opacity={0.7} depthWrite={false} />
      </mesh>
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.08, 32, 32]} />
        <meshPhongMaterial
          color={new THREE.Color(0x4488cc)}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
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
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 2, 4]} intensity={1.4} color="#fff8f0" />
      <directionalLight position={[-3, -1, -2]} intensity={0.1} color="#2244aa" />
      <EarthMesh />
    </Canvas>
  )
}
