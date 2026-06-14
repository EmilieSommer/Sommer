import { useState, useEffect, useRef } from 'react'
import './Section.css'
import './ProjectsSection.css'
// Bundled at build time as a fallback for when the API is unavailable
// (e.g. the static GitHub Pages build). Same file the Express server serves.
import projectsData from '../../../server/data/projects.json'

const BASE = import.meta.env.BASE_URL

// Asset paths in the data are stored relative ("assets/projects/x.png");
// prepend the Vite base URL so they resolve in dev and on GitHub Pages.
const withBase = (p) => (p ? `${BASE}${p}` : p)

function resolveProject(proj) {
  return {
    ...proj,
    video: withBase(proj.video),
    sound: withBase(proj.sound),
    expansion: withBase(proj.expansion),
    expansionVideo: withBase(proj.expansionVideo),
    bgImage: withBase(proj.bgImage),
    images: (proj.images || []).map((img) => ({ ...img, src: withBase(img.src) })),
  }
}

const STUDIO_TAGS = ['Unity', 'C#', 'VR', 'Game Design', 'Sound Design', 'Research']

function ProjectFullscreen({ project, onClose }) {
  const [soundOn, setSoundOn] = useState(true)
  const videoRef = useRef(null)
  const fsRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  useEffect(() => {
    if (project.sound) {
      if (audioRef.current) audioRef.current.play().catch(() => setSoundOn(false))
    } else {
      if (videoRef.current) videoRef.current.muted = false
    }
  }, [project.sound])

  const toggleSound = () => {
    setSoundOn((prev) => {
      const next = !prev
      if (project.sound && audioRef.current) {
        next ? audioRef.current.play() : audioRef.current.pause()
      } else if (videoRef.current) {
        videoRef.current.muted = !next
      }
      return next
    })
  }

  const scrollToExpansion = () => {
    fsRef.current?.querySelector('.project-fs__expansion')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="project-fs" ref={fsRef}>
      {project.sound && <audio ref={audioRef} src={project.sound} loop />}

      <div className="project-fs__hero">
        {project.video
          ? <video
              ref={videoRef}
              src={project.video}
              autoPlay loop playsInline
              className="project-fs__video"
              style={project.videoScale ? { transform: `scale(${project.videoScale})` } : undefined}
            />
          : project.bgImage
            ? <img src={project.bgImage} alt="" className="project-fs__video" />
            : <div className="project-fs__colorbg" style={{ background: project.color }} />
        }
        <div className="project-fs__gradient" />

        <div className="project-fs__controls">
          {project.video && (
            <button className="project-fs__sound" onClick={toggleSound} aria-label="Toggle sound">
              {soundOn ? '♪' : '♪̶'}
            </button>
          )}
          <button className="project-fs__exit" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="project-fs__layout">
          <div className="project-fs__text">
            <h2 className="project-fs__title">{project.title}</h2>
            <p className="project-fs__desc">{project.description}</p>
            <ul className="project-fs__tags">
              {project.tags.map((tag) => <li key={tag} className="tag">{tag}</li>)}
            </ul>
          </div>
        </div>

        {project.expansion && (
          <button
            className="project-fs__scroll-hint"
            onClick={scrollToExpansion}
            aria-label="Scroll down to see more"
          >
            <span className="project-fs__scroll-arrow">↓</span>
          </button>
        )}
      </div>

      {project.expansion && (
        <div className="project-fs__expansion">
          {project.expansionVideo && (
            <video
              className="project-fs__expansion-video"
              src={project.expansionVideo}
              autoPlay loop muted playsInline
            />
          )}
          <img src={project.expansion} alt={`${project.title} — project details`} />
        </div>
      )}
    </div>
  )
}

function ProjectGallery({ projects, onOpen }) {
  return (
    <div className="nk-gallery">
      {projects.map((project, i) => (
        <button
          key={project.id}
          className="nk-gallery__card proj-gallery__card"
          onClick={() => onOpen(project.id)}
          aria-label={`Open ${project.title}`}
          style={{ '--proj-accent': project.color }}
        >
          <div className="nk-gallery__frame">
            {project.video
              ? <video
                  className="nk-gallery__bg proj-gallery__bg"
                  src={project.video}
                  autoPlay muted loop playsInline
                  style={project.videoScale ? { transform: `scale(${project.videoScale})` } : undefined}
                />
              : project.bgImage
                ? <img
                    className="nk-gallery__bg proj-gallery__bg"
                    src={project.bgImage}
                    alt="" draggable={false} aria-hidden="true"
                  />
                : <div className="nk-gallery__bg proj-gallery__bg" style={{ background: project.color }} aria-hidden="true" />
            }
            <span className="proj-gallery__accent" aria-hidden="true" />
            <div className="nk-gallery__slide proj-gallery__slide">
              <div className="proj-gallery__info">
                <span className="proj-gallery__index">Project 0{i + 1}</span>
                <h3 className="proj-gallery__title">{project.title}</h3>
                <p className="proj-gallery__desc">{project.description}</p>
                <div className="proj-gallery__tags">
                  {project.tags.map(t => <span key={t} className="proj-gallery__tag">{t}</span>)}
                </div>
              </div>
              <span className="proj-gallery__cta">View project →</span>
            </div>
            <div className="nk-gallery__caption proj-gallery__caption">
              <span className="nk-gallery__num">0{i + 1}</span>
              <span className="nk-gallery__name">{project.title}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState(() => projectsData.map(resolveProject))
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error(`API responded ${res.status}`)
        return res.json()
      })
      .then((data) => { if (!cancelled) setProjects(data.map(resolveProject)) })
      .catch(() => { /* keep the bundled fallback data */ })
    return () => { cancelled = true }
  }, [])

  const openProject = projects.find((p) => p.id === openId) ?? null

  return (
    <section className="content-section" id="projects">
      <div className="section__inner">
        <span className="section__eyebrow">03 - Projects</span>
        <h2 className="section__heading">Medialogi</h2>
        <p className="section__meta">Aalborg University Copenhagen · BSc · Sep 2023 - Jun 2026</p>

        <p className="exp-desc">
          A three-year bachelor in Medialogi covering interaction design, UX research,
          prototyping, programming, game development, and user testing. The projects
          below span mental health research with lived-experience ambassadors,
          environmental education for kids, music-therapy installations showcased at
          Roskilde Festival, and asymmetric multiplayer experiments.
        </p>

        <div className="exp-tools">
          {STUDIO_TAGS.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <ProjectGallery projects={projects} onOpen={setOpenId} />
      </div>

      {openProject && (
        <ProjectFullscreen project={openProject} onClose={() => setOpenId(null)} />
      )}
    </section>
  )
}
