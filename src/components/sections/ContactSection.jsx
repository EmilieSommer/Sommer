import './Section.css'
import './ContactSection.css'

export default function ContactSection() {
  return (
    <footer className="content-section contact-footer" id="contact">
      <div className="section__inner">
        <h2 className="contact__heading">Say hi.</h2>
        <p className="contact__sub">
          Let's work together — or just talk design.
        </p>
        <div className="contact__links">
          <a href="mailto:" className="contact__link">Email ↗</a>
          <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="contact__link">
            LinkedIn ↗
          </a>
        </div>
        <p className="contact__copy">© 2025 Emilie Sommer</p>
      </div>
    </footer>
  )
}
