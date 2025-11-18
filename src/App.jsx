import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Blog from './components/Blog'
import Contact from './components/Contact'
import { ScrollProgress, MouseGlow, PawScamperLayer } from './components/Effects'

function App() {
  return (
    <div className="min-h-screen bg-white text-orange-900 relative">
      <ScrollProgress />
      <PawScamperLayer />
      <MouseGlow />
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Blog />
      <Contact />
      <footer className="py-10 text-center text-sm text-orange-900/60">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} CatCode Studio — Laravel & React Native</p>
          <p className="mt-1">Built with care, coffee, and a subtle cat theme.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
