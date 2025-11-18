import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

// A thin progress bar that fills as you scroll
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 })
  return (
    <motion.div
      style={{ scaleX: width, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-1 z-[60] bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600"
    />
  )
}

// A subtle mouse-following glow to brighten the canvas
export function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      setVisible(true)
      setPos({ x: e.clientX, y: e.clientY })
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  const size = 280
  const style = {
    left: pos.x - size / 2,
    top: pos.y - size / 2,
    width: size,
    height: size,
    background: 'radial-gradient(closest-side, rgba(255,163,26,0.18), rgba(255,163,26,0.10), rgba(255,255,255,0))',
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <motion.div
        animate={{ x: pos.x - size / 2, y: pos.y - size / 2, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.6 }}
        className="absolute rounded-full mix-blend-screen"
        style={style}
      />
    </div>
  )
}

// Tiny floating paw that subtly drifts in hero
export function FloatingPaw() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 0.8, y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -top-3 -right-2 text-2xl"
      aria-hidden
    >
      🐾
    </motion.div>
  )
}

// Very subtle: occasional random paw prints scampering across the screen
// Spawns rarely (every 20–45s), low opacity, and auto-cleans. Respects reduced motion.
export function PawScamperLayer() {
  const [paws, setPaws] = useState([])
  const timeoutRef = useRef(null)
  const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Helper to schedule the next spawn with a random delay
  const scheduleNext = () => {
    if (reduced || document.hidden) return
    const delay = 20000 + Math.random() * 25000 // 20s–45s
    timeoutRef.current = window.setTimeout(() => {
      spawnPaw()
      scheduleNext()
    }, delay)
  }

  // Create a new paw with randomized path + style
  const spawnPaw = () => {
    const id = Math.random().toString(36).slice(2)
    const vw = Math.max(window.innerWidth, 1)
    const vh = Math.max(window.innerHeight, 1)

    // Randomize entry/exit sides
    const fromLeft = Math.random() > 0.5
    const startX = fromLeft ? -40 : vw + 40
    const endX = fromLeft ? vw + 40 : -40

    // Random vertical band
    const bandTop = vh * (0.15 + Math.random() * 0.6) // avoid extreme top/bottom
    const variance = vh * 0.12

    const cp1 = { x: (startX + endX) / 2 + (Math.random() * 120 - 60), y: bandTop + (Math.random() * variance - variance / 2) }
    const cp2 = { x: (startX + endX) / 2 + (Math.random() * 120 - 60), y: bandTop + (Math.random() * variance - variance / 2) }

    const duration = 6 + Math.random() * 3 // 6–9s
    const size = 18 + Math.random() * 10 // 18–28px
    const rotation = (Math.random() * 40 - 20) * (fromLeft ? 1 : -1)
    const opacity = 0.12 + Math.random() * 0.12 // 0.12–0.24

    const paw = {
      id,
      start: { x: startX, y: bandTop },
      end: { x: endX, y: bandTop + (Math.random() * variance - variance / 2) },
      cp1,
      cp2,
      duration,
      size,
      rotation,
      opacity,
    }

    setPaws((prev) => {
      // Limit concurrent paws to 2 for subtlety
      const next = [...prev, paw].slice(-2)
      return next
    })

    // Auto-remove after animation completes
    window.setTimeout(() => {
      setPaws((prev) => prev.filter((p) => p.id !== id))
    }, duration * 1000 + 200)
  }

  useEffect(() => {
    if (reduced) return
    scheduleNext()

    const onVisibility = () => {
      if (document.hidden && timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      } else {
        scheduleNext()
      }
    }

    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      document.removeEventListener('visibilitychange', onVisibility)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  if (reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9]">
      {paws.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: p.start.x, y: p.start.y, rotate: p.rotation, opacity: 0 }}
          animate={{
            x: [p.start.x, p.cp1.x, p.cp2.x, p.end.x],
            y: [p.start.y, p.cp1.y, p.cp2.y, p.end.y],
            opacity: [0, p.opacity, p.opacity, 0],
            rotate: p.rotation + (Math.random() * 20 - 10),
          }}
          transition={{ duration: p.duration, ease: 'easeInOut' }}
          className="absolute select-none"
          style={{ fontSize: p.size, lineHeight: 1 }}
          aria-hidden
        >
          🐾
        </motion.div>
      ))}
    </div>
  )
}
