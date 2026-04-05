import SideNav from './components/Navigation/SideNav'
import AboutSection from './components/sections/AboutSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import PersonalSection from './components/sections/PersonalSection'
import ContactSection from './components/sections/ContactSection'

// Set to true when ready to re-enable animations
export const ANIMATIONS_ENABLED = false

const NAV_ITEMS = [
  { id: 'about',      label: 'About'      },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'personal',   label: 'Personal'   },
  { id: 'contact',    label: 'Contact'    },
]

export default function App() {
  return (
    <>
      <SideNav items={NAV_ITEMS} />
      <main>
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <PersonalSection />
        <ContactSection />
      </main>
    </>
  )
}
