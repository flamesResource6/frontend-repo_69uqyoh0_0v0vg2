import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const apiBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch(`${apiBase}/api/projects?featured=true`)
      .then(res => res.json())
      .then(setProjects)
      .catch(() => setProjects([]))
  }, [])

  return (
    <section id="projects" className="py-16 sm:py-24 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-900">Featured Projects</h2>
            <p className="text-orange-900/70 mt-2">A peek at some things I enjoyed building.</p>
          </div>
          <a href="#contact" className="hidden sm:inline-flex items-center rounded-full bg-orange-600 text-white font-semibold px-4 py-2 hover:bg-orange-700">Start a project</a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 && (
            [
              {
                id: '1',
                title: 'Mobile Tasker',
                description: 'React Native app for managing tasks with offline sync.',
                tags: ['React Native', 'SQLite'],
                link: '#'
              },
              {
                id: '2',
                title: 'Laravel SaaS Kit',
                description: 'Authentication, billing, teams — a head start for SaaS.',
                tags: ['Laravel', 'Stripe'],
                link: '#'
              },
              {
                id: '3',
                title: 'Portfolio Playground',
                description: 'A quirky landing with artful 3D touches and micro-interactions.',
                tags: ['Vite', 'Spline'],
                link: '#'
              },
            ].map((p) => (
              <Card key={p.id} project={p} />
            ))
          )}

          {projects.map((p) => (
            <Card key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Card({ project }) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      href={project.link || '#'}
      className="group block rounded-2xl bg-white border border-orange-100 hover:border-orange-200 shadow-sm hover:shadow-md p-5 relative overflow-hidden"
    >
      {/* light hover gradient to brighten cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-amber-50/40 to-orange-50/80"
      />
      <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 mb-4 overflow-hidden">
        {project.image ? (
          <img src={project.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-orange-300 text-5xl">🐱</div>
        )}
      </div>
      <h3 className="font-bold text-orange-900 group-hover:text-orange-700">{project.title}</h3>
      <p className="text-sm text-orange-900/70 mt-1">{project.description}</p>
      {project.tags && (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100">{t}</span>
          ))}
        </div>
      )}
    </motion.a>
  )
}
