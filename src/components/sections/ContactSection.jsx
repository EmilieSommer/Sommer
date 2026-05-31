import { useRef } from 'react'
import useReveal from '../../hooks/useReveal'
import './Section.css'
import './ContactSection.css'

export default function ContactSection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <footer ref={sectionRef} className="content-section contact-footer" id="contact">
      <div className="section__inner">
        <span className="section__eyebrow r">05 - Contact</span>
        <h2 className="section__heading r">Say hi.</h2>
        <p className="section__meta r">Let's work together, or just talk design.</p>
        <div className="contact__links r">
          <a href="mailto:" className="contact__link">Email ↗</a>
          <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="contact__link">LinkedIn ↗</a>
        </div>
        <p className="contact__copy r">© 2026 Emilie Sommer</p>
      </div>
    </footer>
  )
}
