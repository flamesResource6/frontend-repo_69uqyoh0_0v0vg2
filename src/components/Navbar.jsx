import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-inner shadow-orange-200 flex items-center justify-center">
              {/* subtle cat ears */}
              <span className="absolute -top-1 left-1 w-2.5 h-2.5 bg-orange-500 rotate-45 rounded-[2px]" />
              <span className="absolute -top-1 right-1 w-2.5 h-2.5 bg-orange-500 -rotate-45 rounded-[2px]" />
              <span className="text-white text-sm">🐾</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-orange-600">CatCode Studio</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-orange-900/80 hover:text-orange-600 transition-colors">
                {item.label}
              </a>
            ))}
            <a href="#contact" className="inline-flex items-center rounded-full bg-orange-600 text-white text-sm font-semibold px-4 py-2 shadow-sm hover:bg-orange-700 transition-colors">
              Hire Me
            </a>
          </nav>

          {/* Mobile */}
          <button className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-orange-700 hover:bg-orange-50" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-orange-100 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="block py-2 text-orange-900/80" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="inline-flex items-center rounded-full bg-orange-600 text-white text-sm font-semibold px-4 py-2">
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
