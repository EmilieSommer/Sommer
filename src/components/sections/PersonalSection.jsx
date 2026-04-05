import './Section.css'
import './PersonalSection.css'

// Add personal/side projects here
const PERSONAL_WORKS = [
  // { id: 'p1', title: '', description: '', images: [] },
]

export default function PersonalSection() {
  return (
    <section className="content-section" id="personal">
      <div className="section__inner">
        <span className="section__eyebrow">07 — Personal</span>
        <h2 className="section__heading">My own work</h2>
        <p className="section__sub">Side projects, experiments, and personal creative work.</p>

        <div className="personal-grid">
          {PERSONAL_WORKS.map((work) => (
            <article key={work.id} className="personal-card">
              <div className="personal-card__image" />
              <h3 className="personal-card__title">{work.title}</h3>
              <p className="personal-card__desc">{work.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
