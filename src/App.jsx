import { useState, useEffect, useRef } from 'react'
import VideoHero from './components/VideoHero/VideoHero'
import ProjectTeaser from './components/ProjectTeaser/ProjectTeaser'
import DotCursor from './components/DotCursor'
import SplashCursor from './components/SplashCursor'
import AboutSection from './components/sections/AboutSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import PersonalSection from './components/sections/PersonalSection'
import ContactSection from './components/sections/ContactSection'
import NykreditPage from './components/sections/NykreditPage'

export default function App() {
  const [onHero, setOnHero] = useState(true)
  const [nykreditOpen, setNykreditOpen] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const enter = () => setOnHero(true)
    const leave = () => setOnHero(false)
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [])

  useEffect(() => {
    if (nykreditOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [nykreditOpen])

  return (
    <>
      <DotCursor onHero={onHero} />

      <div style={{ opacity: onHero ? 1 : 0, transition: 'opacity 0.4s', pointerEvents: 'none' }}>
        <SplashCursor
          BACK_COLOR={{ r: 0, g: 0, b: 0 }}
          TRANSPARENT={true}
          SPLAT_RADIUS={0.35}
          SPLAT_FORCE={8000}
          DENSITY_DISSIPATION={4}
          VELOCITY_DISSIPATION={2.5}
          COLOR_UPDATE_SPEED={8}
          RAINBOW_MODE={false}
          COLOR="#FFFFFF"
        />
      </div>

      <div ref={heroRef}>
        <VideoHero />
      </div>

      <ProjectTeaser />

      <main>
        <AboutSection />
        <ExperienceSection onOpenNykredit={() => setNykreditOpen(true)} />
        <ProjectsSection />
        <PersonalSection />
        <ContactSection />
      </main>

      {nykreditOpen && <NykreditPage onClose={() => setNykreditOpen(false)} />}
    </>
  )
}
