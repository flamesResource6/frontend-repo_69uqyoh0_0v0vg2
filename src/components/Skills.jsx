import { motion } from 'framer-motion'
import { Code2, Smartphone, Server } from 'lucide-react'

export default function Skills() {
  const skills = [
    {
      icon: <Server className="text-orange-600" size={22} />,
      title: 'Laravel Backends',
      points: ['REST APIs', 'Auth & Policies', 'Queues & Jobs'],
    },
    {
      icon: <Smartphone className="text-orange-600" size={22} />,
      title: 'React Native',
      points: ['Offline-first', 'Animations', 'Native modules'],
    },
    {
      icon: <Code2 className="text-orange-600" size={22} />,
      title: 'Ecosystem',
      points: ['TypeScript', 'MongoDB', 'Stripe & Webhooks'],
    },
  ]

  return (
    <section id="skills" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-900 mb-8">Skills</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-orange-100 p-6 bg-gradient-to-br from-white to-orange-50"
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 grid place-items-center mb-3">
                {s.icon}
              </div>
              <h3 className="font-bold text-orange-900">{s.title}</h3>
              <ul className="mt-2 space-y-1 text-orange-900/70 text-sm">
                {s.points.map((p, j) => (
                  <li key={j}>• {p}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
