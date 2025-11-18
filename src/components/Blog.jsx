import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const apiBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`${apiBase}/api/blogs?published=true`).then(r => r.json()).then(setPosts).catch(() => setPosts([]))
  }, [])

  const fallback = [
    { id: 'a', title: 'How I structure a Laravel API', excerpt: 'Controllers thin, actions focused, tests first. A quick tour of patterns that keep me fast.', slug: '#' },
    { id: 'b', title: 'React Native tricks I love', excerpt: 'From Reanimated to offline caches — some patterns that make apps feel delightful.', slug: '#' },
  ]

  const list = posts.length ? posts : fallback

  return (
    <section id="blog" className="py-16 sm:py-24 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-900">From the blog</h2>
          <a href="#contact" className="hidden sm:inline-flex items-center rounded-full bg-white text-orange-700 font-semibold px-4 py-2 border border-orange-200 hover:bg-orange-50">Get updates</a>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {list.map((p, i) => (
            <motion.a
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              href={p.slug || '#'}
              className="group block rounded-2xl bg-white border border-orange-100 p-6 hover:shadow-md hover:border-orange-200 relative overflow-hidden"
            >
              {/* brighten hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-amber-50/40 to-orange-50/70"
              />
              <h3 className="font-bold text-orange-900 group-hover:text-orange-700">{p.title}</h3>
              <p className="text-orange-900/70 mt-2 text-sm">{p.excerpt}</p>
              <span className="inline-flex items-center text-orange-700 mt-3 text-sm">Read more →</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
