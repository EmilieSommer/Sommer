import './Section.css'
import './ExperienceSection.css'

const EXPERIENCE = [
  {
    company:  'Nykredit',
    role:     'Studentermedhjælper, Design Team',
    period:   '— ',   // Add dates
    highlight: true,
    description: 'Working as part of the in-house design team, contributing to...',  // fill in
  },
  // Add other roles below if relevant
]

export default function ExperienceSection() {
  return (
    <section className="content-section" id="experience">
      <div className="section__inner">
        <span className="section__eyebrow">05 — Experience</span>
        <h2 className="section__heading">Work</h2>

        <ul className="experience-list">
          {EXPERIENCE.map((job) => (
            <li
              key={job.company + job.role}
              className={`experience-item ${job.highlight ? 'experience-item--highlight' : ''}`}
            >
              <div className="experience-item__header">
                <span className="experience-item__role">{job.role}</span>
                <span className="experience-item__period">{job.period}</span>
              </div>
              <span className="experience-item__company">{job.company}</span>
              {job.description && (
                <p className="experience-item__desc">{job.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
