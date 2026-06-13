import { useState, useEffect, useRef } from 'react'
import './Section.css'
import './ProjectsSection.css'

const BASE = import.meta.env.BASE_URL
const P = `${BASE}assets/projects/`

const PROJECTS = [
  {
    id: 'liv',
    title: 'Liv',
    tags: ['Serious Game', 'Mental Health', 'Research'],
    color: '#D95122',
    video: `${P}liv_bg.mp4`,
    sound: `${P}liv_sound.mp3`,
    expansionVideo: `${P}liv_dream.mp4`,
    expansion: `${P}expansions/liv.png`,
    images: [
      { src: `${P}liv_dream.mp4`, alt: 'Liv - Dream', isVideo: true },
      { src: `${P}liv_1.png`, alt: 'Liv - Bathroom' },
      { src: `${P}liv_2.png`, alt: 'Liv - Bedroom' },
      { src: `${P}liv_3.png`, alt: 'Liv - Kitchen' },
      { src: `${P}liv_4.png`, alt: 'Liv - Friend' },
      { src: `${P}liv_5.png`, alt: 'Liv - Living room' },
    ],
    description: 'Liv is a serious game I designed to help relatives support someone they love through a suicidal crisis. I built it in close collaboration with three mental health ambassadors who have lived through these crises themselves, so every conversation in the game would feel honest to both the people in distress and the people around them. The game was published alongside an academic study because it showed a new way to use interactive design as empathy training, taking mental health research out of journals and into a tool that families can actually use. It is the project I am proudest of.',
  },
  {
    id: 'torsken',
    title: 'Oxygen depletion',
    tags: ['Game Design', 'Education', 'Environment'],
    color: '#2B4C7E',
    video: `${P}torsken_bg.mp4`,
    sound: `${P}torsken_sound.mp3`,
    expansion: `${P}expansions/torsken.png`,
    images: [],
    description: 'Dive into an environmental rescue mission designed to teach 9-year-olds about the critical state of our oceans. When a friendly fish suddenly finds himself struggling to breathe, young players must step in to investigate why his underwater home is suffocating. By exploring the vibrant but threatened Danish waters, kids uncover the real-world causes of oxygen depletion, transforming complex science into an interactive, empathetic lesson on saving our marine ecosystems.',
  },
  {
    id: 'floop',
    title: 'Floop',
    tags: ['VR', 'Sound Design', 'Music Therapy'],
    color: '#896645',
    video: `${P}floop_bg.mp4`,
    expansion: `${P}expansions/floop.png`,
    images: [
      { src: `${P}floop_1.jpg`, alt: 'Floop - screenshot 1' },
      { src: `${P}floop_2.jpg`, alt: 'Floop - screenshot 2' },
      { src: `${P}floop_3.jpg`, alt: 'Floop - screenshot 3' },
      { src: `${P}floop_4.jpg`, alt: 'Floop - screenshot 4' },
    ],
    description: 'Escape to a place of pure serenity in this immersive VR experience. Developed in close collaboration with a professional music therapist, Floop wraps players in a responsive, therapeutic musical landscape designed to induce deep relaxation. This innovative blend of sound design and spatial audio was successfully showcased as an interactive installation at both Roskilde Festival and SPOT Festival.',
  },
  {
    id: 'asymetric',
    title: 'Asymetric Cinema',
    tags: ['VR', 'Multiplayer', 'Narrative'],
    color: '#1a3a2a',
    video: `${P}asymetric_bg.mp4`,
    expansion: `${P}expansions/asymetric.png`,
    images: [
      { src: `${P}asymetric_1.jpg`, alt: 'Asymetric Cinema - screenshot' },
    ],
    description: 'In this collaborative VR murder mystery, two players stand in the exact same cottage but are fractured across time. One player witnesses the unsettling events leading up to a fatal crime, while the other navigates the cold reality of the subsequent investigation. Trapped in separate eras, you must actively talk, share what you see, and piece together the clues to catch the killer.',
  },
  {
    id: 'veil',
    title: 'Veil of Fear',
    tags: ['VR', 'Horror', 'Eye-tracking'],
    color: '#1a1a2e',
    video: `${P}veil_bg.mp4`,
    expansion: `${P}expansions/veil.png`,
    images: [
      { src: `${P}veil_1.jpg`, alt: 'Veil of Fear - screenshot' },
    ],
    description: 'In this immersive psychological horror game, integrated eye-tracking technology forces you to physically close your eyes to survive the monster\'s presence, turning your own vision into a liability. As you navigate the mansion\'s descent into a surreal asylum, you must search cramped cells for a missing person while your character\'s grip on reality visibly fractures.',
  },
  {
    id: 'butworse',
    title: 'But Worse',
    tags: ['Rapid Prototype', 'Game Design'],
    color: '#3D2B1F',
    video: `${P}butworse_bg.mp4`,
    videoScale: 1.5,
    images: [
      { src: `${P}butworse_1.jpg`, alt: 'But Worse - screenshot' },
    ],
    description: 'A raw, rapid-prototyping mini-project born from a challenge to replicate an existing commercial game from scratch. Built from the ground up in just one week, a little replica of a home design game.',
  },
  {
    id: 'deathrun',
    title: 'Deathrun',
    tags: ['VR', 'Multiplayer', 'Asymmetric Gameplay'],
    color: '#A33D17',
    video: null,
    bgImage: `${P}deathrun_bg.png`,
    expansion: `${P}expansions/deathrun.png`,
    images: [
      { src: `${P}deathrun_1.png`, alt: 'Deathrun - screenshot' },
    ],
    description: 'A fast-paced multiplayer mini-project designed to push the boundaries of asymmetric gameplay. Deathrun explores a tense virtual duality, pitting a crowd of traditional online PC players against a single, heavily empowered user in VR. The project serves as a technical testbed for real-time cross-platform synchronisation, forcing two completely different perspectives into the same digital arena.',
  },
]

const STUDIO_TAGS = ['Unity', 'C#', 'VR', 'Game Design', 'Sound Design', 'Research']

function ProjectFullscreen({ project, onClose }) {
  const [soundOn, setSoundOn] = useState(true)
  const videoRef = useRef(null)
  const fsRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
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

function ProjectGallery({ onOpen }) {
  return (
    <div className="nk-gallery">
      {PROJECTS.map((project, i) => (
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
  const [openId, setOpenId] = useState(null)
  const openProject = PROJECTS.find((p) => p.id === openId) ?? null

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

        <ProjectGallery onOpen={setOpenId} />
      </div>

      {openProject && (
        <ProjectFullscreen project={openProject} onClose={() => setOpenId(null)} />
      )}
    </section>
  )
}
