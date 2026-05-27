'use client'

/**
 * components/hero/OrbCanvas.jsx
 *
 * WHY IS THIS A SEPARATE FILE FROM HeroSection?
 * Two reasons:
 *
 *   1. It's dynamically imported with `ssr: false` — Next.js needs to
 *      be able to import just this file lazily. If the orb code were
 *      inside HeroSection, the entire hero would need to be client-only.
 *
 *   2. Three.js is a heavy library. Splitting it into its own chunk
 *      means the browser can load hero text immediately while Three.js
 *      loads in the background.
 *
 * WHAT CHANGED FROM THE ORIGINAL:
 * The original Three.js code was virtually identical. The only difference:
 *   - `const canvas = document.getElementById('orb-canvas')` 
 *     → replaced with useRef() and <canvas ref={canvasRef}>
 *   - The entire Three.js init is inside useEffect(() => { ... }, [])
 *     which guarantees it runs AFTER the canvas is in the DOM
 *   - The cleanup function calls renderer.dispose() and cancels the animation frame
 *
 * WHY useRef FOR THE CANVAS?
 * useRef gives you a stable reference to a DOM element without causing re-renders.
 * Unlike document.getElementById (which queries the entire DOM), useRef points
 * directly to the element React created.
 *
 * FUTURE UPGRADE:
 * Replace this with React Three Fiber for a more idiomatic React 3D experience:
 *   <Canvas><IcosahedronMesh /><Rings /><Particles /></Canvas>
 * The visual result would be identical but the code becomes declarative JSX.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function OrbCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = canvas.clientWidth || canvas.parentElement?.clientWidth || 480
    const H = canvas.clientHeight || canvas.parentElement?.clientHeight || 520

    canvas.width  = W
    canvas.height = H

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.z = 2.8

    const clock = new THREE.Clock()

    // Core orb
    const geo = new THREE.IcosahedronGeometry(1, 5)
    const mat = new THREE.MeshPhongMaterial({
      color: 0x1a2a6e, emissive: 0x0d1a44,
      specular: 0x5B8CFF, shininess: 80,
      transparent: true, opacity: 0.92,
    })
    const orb = new THREE.Mesh(geo, mat)
    scene.add(orb)

    // Wireframe overlay
    const wireGeo = new THREE.IcosahedronGeometry(1.001, 3)
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x5B8CFF, wireframe: true, transparent: true, opacity: 0.12 })
    const wire = new THREE.Mesh(wireGeo, wireMat)
    scene.add(wire)

    // Rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.006, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0x5B8CFF, transparent: true, opacity: 0.3 })
    )
    ring1.rotation.x = Math.PI / 2.4
    scene.add(ring1)

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.004, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0x9D4EDD, transparent: true, opacity: 0.18 })
    )
    ring2.rotation.x = Math.PI / 3
    ring2.rotation.z = Math.PI / 5
    scene.add(ring2)

    // Particles
    const ptCount = 180
    const ptGeo   = new THREE.BufferGeometry()
    const pts     = new Float32Array(ptCount * 3)
    for (let i = 0; i < ptCount; i++) {
      const phi   = Math.acos(2 * Math.random() - 1)
      const theta = 2 * Math.PI * Math.random()
      const r     = 1.18 + Math.random() * 0.55
      pts[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pts[i * 3 + 2] = r * Math.cos(phi)
    }
    ptGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3))
    const particles = new THREE.Points(
      ptGeo,
      new THREE.PointsMaterial({ color: 0x00F0FF, size: 0.018, transparent: true, opacity: 0.7 })
    )
    scene.add(particles)

    // Lights
    scene.add(new THREE.AmbientLight(0x1a1a3e, 2))
    const light1 = new THREE.PointLight(0x5B8CFF, 3, 8)
    light1.position.set(2, 2, 2)
    scene.add(light1)
    const light2 = new THREE.PointLight(0x9D4EDD, 2, 8)
    light2.position.set(-2, -1, 1)
    scene.add(light2)
    const light3 = new THREE.PointLight(0x00F0FF, 1.5, 6)
    light3.position.set(0, 3, -1)
    scene.add(light3)

    // Mouse tracking
    let mx = 0, my = 0
    const onMouseMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mx = (e.clientX - r.left - W / 2) / (W / 2)
      my = -(e.clientY - r.top  - H / 2) / (H / 2)
    }
    document.addEventListener('mousemove', onMouseMove)

    // Animation loop
    let rafId
    function animate() {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      orb.rotation.y = t * 0.12 + mx * 0.3
      orb.rotation.x = Math.sin(t * 0.09) * 0.15 + my * 0.2
      wire.rotation.y = t * 0.08
      wire.rotation.x = Math.cos(t * 0.06) * 0.1
      ring1.rotation.z = t * 0.18
      ring2.rotation.y = t * 0.12
      ring2.rotation.x = Math.PI / 3 + Math.sin(t * 0.1) * 0.08
      particles.rotation.y = t * 0.05
      particles.rotation.x = t * 0.03

      const breathScale = 1 + Math.sin(t * 0.8) * 0.015
      orb.scale.setScalar(breathScale)

      light1.position.x = Math.cos(t * 0.5) * 2.5
      light1.position.z = Math.sin(t * 0.5) * 2.5
      light2.position.x = Math.cos(t * 0.4 + Math.PI) * 2
      light2.position.z = Math.sin(t * 0.4 + Math.PI) * 2

      renderer.render(scene, camera)
    }
    animate()

    // CLEANUP — this is what the original HTML could never do
    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: '-54px -70px',
        width: 'calc(100% + 140px)',
        height: 'calc(100% + 108px)',
        opacity: 0,
        animation: 'fadeIn 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s forwards',
      }}
    />
  )
}
