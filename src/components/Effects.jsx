import { useEffect, useState } from 'react'
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
