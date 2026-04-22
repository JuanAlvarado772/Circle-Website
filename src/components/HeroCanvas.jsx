import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.set(0, 0, 18)

    function resize() {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    const COL_BLUE = new THREE.Color(0x7EC8E3)
    const COL_ORANGE = new THREE.Color(0xF4A96A)
    const COL_CREAM = new THREE.Color(0xF5F0E8)
    const COL_INK = new THREE.Color(0x3D3530)
    const nodeColors = [
      COL_BLUE, COL_ORANGE, COL_CREAM, COL_INK,
      new THREE.Color(0xB8E4F2),
      new THREE.Color(0xFAD0A8)
    ]

    const NODE_COUNT = 55
    const nodes = []
    const nodeGroup = new THREE.Group()
    scene.add(nodeGroup)

    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / NODE_COUNT)
      const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi
      const r = 9 * (0.65 + Math.random() * 0.35)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      const geo = new THREE.SphereGeometry(0.05 + Math.random() * 0.12, 8, 8)
      const mat = new THREE.MeshBasicMaterial({
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
        transparent: true,
        opacity: 0.55 + Math.random() * 0.45
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, y, z)
      nodeGroup.add(mesh)
      nodes.push({
        mesh, ox: x, oy: y, oz: z,
        speed: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        amplitude: 0.15 + Math.random() * 0.25
      })
    }

    const edgesGroup = new THREE.Group()
    scene.add(edgesGroup)

    function buildEdges() {
      while (edgesGroup.children.length) {
        edgesGroup.children[0].geometry.dispose()
        edgesGroup.children[0].material.dispose()
        edgesGroup.remove(edgesGroup.children[0])
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i].mesh.position
          const b = nodes[j].mesh.position
          const d = a.distanceTo(b)
          if (d < 5.5) {
            const geo = new THREE.BufferGeometry().setFromPoints([a.clone(), b.clone()])
            const mat = new THREE.LineBasicMaterial({
              color: Math.random() < 0.5 ? COL_BLUE : COL_ORANGE,
              transparent: true,
              opacity: (1 - d / 5.5) * 0.25
            })
            edgesGroup.add(new THREE.Line(geo, mat))
          }
        }
      }
    }
    buildEdges()

    let mx = 0, my = 0
    const onMouse = e => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    let frame = 0
    let animId
    function animate() {
      animId = requestAnimationFrame(animate)
      frame++
      const t = performance.now() * 0.001
      nodes.forEach(n => {
        n.mesh.position.x = n.ox + Math.sin(t * n.speed + n.phase) * n.amplitude
        n.mesh.position.y = n.oy + Math.cos(t * n.speed * 0.8 + n.phase) * n.amplitude
        n.mesh.position.z = n.oz + Math.sin(t * n.speed * 0.6 + n.phase) * n.amplitude * 0.5
      })
      if (frame % 8 === 0) buildEdges()
      nodeGroup.rotation.y = t * 0.06 + mx * 0.12
      nodeGroup.rotation.x = my * 0.07
      edgesGroup.rotation.y = nodeGroup.rotation.y
      edgesGroup.rotation.x = nodeGroup.rotation.x
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%', zIndex: 0
    }} />
  )
}