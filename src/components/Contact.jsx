import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-white to-orange-50 p-6 sm:p-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-900">Let’s build something</h2>
              <p className="text-orange-900/70 mt-2">Tell me about your idea. I’ll get back quickly with thoughts and a plan.</p>
              <ul className="mt-6 space-y-2 text-sm text-orange-900/70">
                <li>• Available for freelance projects</li>
                <li>• Happy to join existing teams</li>
                <li>• Comfortable with async & sprints</li>
              </ul>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-orange-900">Your name</label>
                <input required className="mt-1 w-full rounded-lg border border-orange-200 bg-white px-3 py-2 text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500/40" />
              </div>
              <div>
                <label className="block text-sm font-medium text-orange-900">Email</label>
                <input type="email" required className="mt-1 w-full rounded-lg border border-orange-200 bg-white px-3 py-2 text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500/40" />
              </div>
              <div>
                <label className="block text-sm font-medium text-orange-900">Project details</label>
                <textarea required rows={4} className="mt-1 w-full rounded-lg border border-orange-200 bg-white px-3 py-2 text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500/40" />
              </div>
              <button className="inline-flex items-center rounded-full bg-orange-600 text-white font-semibold px-5 py-2.5 shadow hover:bg-orange-700">Send</button>
              {sent && <p className="text-sm text-green-700">Thanks! I’ll reply soon.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
