import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { FloatingPaw } from './Effects'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-white to-white" />

      {/* Spline background */}
      <div className="relative h-[520px] w-full">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* Soft gradient overlay to improve contrast */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-44 relative">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur rounded-3xl border border-orange-100 shadow-xl p-6 sm:p-10 relative"
        >
          <FloatingPaw />
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full mb-3">
                <span className="text-xs">Cartoonish & modern</span>
                <span className="text-xs">Subtle cat vibes 🐱</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-orange-900 tracking-tight">
                I build clean, playful experiences
              </h1>
              <p className="mt-3 text-orange-900/80 text-base sm:text-lg">
                Laravel and React Native developer crafting solid backends, smooth mobile apps, and quirky side projects.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#projects" className="inline-flex items-center rounded-full bg-orange-600 text-white font-semibold px-5 py-2.5 shadow hover:bg-orange-700 transition-colors">
                  See Projects
                </a>
                <a href="#contact" className="inline-flex items-center rounded-full bg-white text-orange-700 font-semibold px-5 py-2.5 border border-orange-200 hover:bg-orange-50 transition-colors">
                  Contact
                </a>
              </div>
            </div>
            <motion.div
              initial={{ rotate: -6 }}
              animate={{ rotate: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
              className="relative"
            >
              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50 p-4 shadow">
                <div className="text-sm text-orange-800">
                  <p className="font-semibold">Stack highlights</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Laravel APIs</li>
                    <li>React Native apps</li>
                    <li>MongoDB & REST</li>
                  </ul>
                </div>
                {/* Subtle cat whiskers decoration */}
                <div className="absolute -right-6 top-8 hidden sm:block">
                  <div className="h-0.5 w-8 bg-orange-300 rounded" />
                  <div className="h-0.5 w-10 bg-orange-300 rounded mt-1" />
                  <div className="h-0.5 w-7 bg-orange-300 rounded mt-1" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
