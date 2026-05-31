import { useState, useRef } from 'react'
import useReveal from '../../hooks/useReveal'
import './Section.css'
import './AboutSection.css'

const TOOLS = [
  { name: 'Figma',        level: 5 },
  { name: 'Photoshop',    level: 4 },
  { name: 'Illustrator',  level: 3 },
  { name: 'InDesign',     level: 4 },
  { name: 'Optimizely',   level: 3 },
  { name: 'Canva',        level: 4 },
  { name: 'Procreate',    level: 5 },
  { name: 'Unity',        level: 4 },
  { name: 'Blender',      level: 2 },
  { name: 'Nomad Sculpt', level: 5 },
]

const EDUCATION = [
  {
    school: 'Aalborg University Copenhagen',
    degree: 'BSc in Medialogi',
    period: 'Sep 2023 — Jun 2026',
    description: 'Medialogi explores how people and technology interact. The work spans interaction design, UX research, prototyping, programming, game development, and user testing — a broad, hands-on degree that combines visual craft with technical execution.',
  },
  {
    school: 'The Scandinavian Design College',
    degree: 'Architecture & Urban Design',
    period: '2020 — 2021',
    description: 'A year focused on architecture, urban spaces, and design processes.',
  },
  {
    school: 'Rysensteen Gymnasium',
    degree: 'Spanish · Drama track',
    period: '2016 — 2019',
    description: null,
  },
]

const SKILLS = [
  {
    category: 'UX & Interaction',
    items: ['Interaction design', 'User research', 'Usability testing', 'Wireframing', 'Prototyping'],
    description: 'Designing with the user in mind — from early research and testing to refined, intuitive interactions.',
  },
  {
    category: 'Visual Design',
    items: ['UI design', 'Design systems', 'Typography', 'Visual identity', 'Illustration'],
    description: 'Creating coherent visual experiences with a strong eye for hierarchy, colour, and detail.',
  },
  {
    category: '3D & Spatial',
    items: ['3D modelling', 'Sculpting', 'Architectural design', 'Game environments'],
    description: 'Building in three dimensions — from digital sculpting in Nomad to environments in Blender and Unity.',
  },
  {
    category: 'Concept & Strategy',
    items: ['Concept development', 'Ideation', 'Design thinking', 'Sustainability design'],
    description: 'Developing ideas from brief to concept — with a focus on purpose, context, and the bigger picture.',
  },
]

const MAX = 5

function ToolRow({ name, level }) {
  return (
    <li className="tool-row">
      <span className="tool-row__name">{name}</span>
      <span className="tool-row__dots" aria-label={`${level} out of ${MAX}`}>
        {Array.from({ length: MAX }).map((_, i) => (
          <span key={i} className={`tool-dot ${i < level ? 'tool-dot--filled' : ''}`} />
        ))}
      </span>
    </li>
  )
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`accordion ${open ? 'accordion--open' : ''}`}>
      <button className="accordion__trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="accordion__title">{title}</span>
        <span className="accordion__icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="accordion__body">
        <div className="accordion__content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} className="content-section" id="about">
      <div className="section__inner">
        <span className="section__eyebrow r">01 — About</span>
        <h2 className="section__heading r">Hi, I'm Emilie.</h2>
        <p className="section__meta r">Designer · Copenhagen · finishing my bachelor June 2026</p>
        <div className="about-grid r">

          <div className="about-portrait">
            {/* Replace with <img src="..." alt="Emilie Sommer" /> */}
            <div className="portrait-placeholder" aria-hidden="true" />
          </div>

          <div className="about-text">
            <p className="about-bio">
              Hi! I'm Emilie — a designer based in Copenhagen, finishing my Medialogi
              bachelor at Aalborg University this June. For the past two years I've
              also been a Student Assistant on Nykredit's in-house design team, where
              I work across UI, brand, and print. The rest of my time goes into
              interaction design, serious games, and the occasional 3D experiment.
              I'm curious, easy to work with, and happiest when a project leaves the
              people who use it a little better off than before.
            </p>

            <div className="accordion-group">

              <Accordion title="Tools" defaultOpen={true}>
                <ul className="tools-list">
                  {TOOLS.map((tool) => (
                    <ToolRow key={tool.name} {...tool} />
                  ))}
                </ul>
              </Accordion>

              <Accordion title="Skills">
                <div className="skills-grid">
                  {SKILLS.map((skill) => (
                    <div key={skill.category} className="skill-category">
                      <span className="skill-category__name">{skill.category}</span>
                      <p className="skill-category__desc">{skill.description}</p>
                      <ul className="skill-tags">
                        {skill.items.map((item) => (
                          <li key={item} className="skill-tag">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Accordion>

              <Accordion title="Education">
                <ul className="education-list">
                  {EDUCATION.map((edu) => (
                    <li key={edu.school} className="education-item">
                      <div className="education-item__header">
                        <span className="education-item__school">{edu.school}</span>
                        <span className="education-item__period">{edu.period}</span>
                      </div>
                      <span className="education-item__degree">{edu.degree}</span>
                      {edu.description && (
                        <p className="education-item__desc">{edu.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </Accordion>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
