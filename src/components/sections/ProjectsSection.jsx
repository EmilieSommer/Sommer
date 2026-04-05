import './Section.css'
import './ProjectsSection.css'

// Add your school projects here — one object per project
export const PROJECTS = [
  {
    id: 'project-1',
    title: 'Project Title',
    description: 'Short description of the project — what was the brief, what did you do, what was the outcome.',
    tags: ['UX Research', 'Figma', 'Prototyping'],
    // video: '/assets/project-1/video.mp4',  // optional
    images: [
      // '/assets/project-1/image-1.jpg',
    ],
    publishedReport: false,   // set to true (and add reportUrl) for the published one
    reportUrl: null,
  },
  // Copy the object above for each additional project
]

export default function ProjectsSection() {
  return (
    <section className="content-section" id="projects">
      <div className="section__inner">
        <span className="section__eyebrow">06 — Projects</span>
        <h2 className="section__heading">School work</h2>

        <div className="projects-list">
          {PROJECTS.map((project, i) => (
            <article
              key={project.id}
              className={`project-item ${i % 2 === 0 ? 'project-item--left' : 'project-item--right'}`}
            >
              {/* Media */}
              <div className="project-item__media">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay muted loop playsInline
                    className="project-item__video"
                    aria-label={`Video for ${project.title}`}
                  />
                ) : (
                  <div className="project-item__image-placeholder" aria-hidden="true" />
                )}
              </div>

              {/* Text */}
              <div className="project-item__text">
                {project.publishedReport && (
                  <span className="published-badge">
                    Report published{project.reportUrl ? ' ↗' : ''}
                  </span>
                )}
                <h3 className="project-item__title">{project.title}</h3>
                <p className="project-item__desc">{project.description}</p>
                <ul className="project-item__tags">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag">{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
