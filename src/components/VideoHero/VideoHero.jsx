import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './VideoHero.css'

gsap.registerPlugin(ScrollTrigger)

const SCENES = [
  { id: 0, lines: [{ text: 'hi.', className: 'scene__greeting' }] },
  {
    id: 1,
    lines: [
      { text: "I'm",                          className: 'scene__eyebrow'  },
      { text: 'Emilie Sommer',                className: 'scene__name'     },
      { text: 'designer & Medialogi student', className: 'scene__subtitle' },
    ],
  },
  {
    id: 2,
    lines: [{ text: 'I design websites, apps, brand systems, and the occasional VR world.', className: 'scene__statement' }],
  },
  { id: 3, lines: [{ text: 'have a look around ↓', className: 'scene__cta' }] },
]

function SceneLine({ text, className }) {
  const words = text.split(' ')
  return (
    <p className={className}>
      {words.flatMap((word, i) =>
        i < words.length - 1
          ? [<span key={i} className="word">{word}</span>, ' ']
          : [<span key={i} className="word">{word}</span>]
      )}
    </p>
  )
}

export default function VideoHero() {
  const containerRef = useRef(null)
  const videoRef     = useRef(null)
  const scenesRef    = useRef([])
  const [activeScene, setActiveScene] = useState(-1)

  // Animate words in when scene becomes active
  useEffect(() => {
    if (activeScene < 0) return
    const scene = scenesRef.current[activeScene]
    if (!scene) return
    const words = scene.querySelectorAll('.word')
    gsap.fromTo(
      words,
      { opacity: 0, y: -20, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.08, duration: 0.5, ease: 'power3.out' }
    )
  }, [activeScene])

  useEffect(() => {
    const container = containerRef.current
    const scenes    = scenesRef.current
    const video     = videoRef.current

    const ctx = gsap.context(() => {
      gsap.set(scenes, { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate(self) {
            const p = self.progress
            if      (p >= 0.04 && p < 0.24) setActiveScene(0)
            else if (p >= 0.28 && p < 0.52) setActiveScene(1)
            else if (p >= 0.56 && p < 0.78) setActiveScene(2)
            else if (p >= 0.86)             setActiveScene(3)
            else                            setActiveScene(-1)
          },
        },
      })

      // Video zooms in as you scroll
      tl.fromTo(video, { scale: 1 }, { scale: 1.28, ease: 'none' }, 0)

      tl.to(scenes[0], { opacity: 1, duration: 0.02 }, 0.04)
      tl.to(scenes[0], { opacity: 0, duration: 0.02 }, 0.24)

      tl.to(scenes[1], { opacity: 1, duration: 0.02 }, 0.28)
      tl.to(scenes[1], { opacity: 0, duration: 0.02 }, 0.52)

      tl.to(scenes[2], { opacity: 1, duration: 0.02 }, 0.56)
      tl.to(scenes[2], { opacity: 0, duration: 0.02 }, 0.78)

      tl.to(scenes[3], { opacity: 1, duration: 0.02 }, 0.86)
    }, container)

    const sceneMovers = scenes.map((s) => ({
      x: gsap.quickTo(s, 'x', { duration: 0.8, ease: 'power2.out' }),
      y: gsap.quickTo(s, 'y', { duration: 0.8, ease: 'power2.out' }),
    }))

    function onMouseMove(e) {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      sceneMovers.forEach(({ x, y }) => { x(nx * 10); y(ny * 10) })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => { ctx.revert(); window.removeEventListener('mousemove', onMouseMove) }
  }, [])

  return (
    <div ref={containerRef} className="vh-container">
      <div className="vh-sticky">

        <video
          ref={videoRef}
          className="vh-video"
          src={`${import.meta.env.BASE_URL}assets/sky.mp4`}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="vh-overlay" aria-hidden="true" />

        {SCENES.map((scene) => (
          <div
            key={scene.id}
            ref={(el) => (scenesRef.current[scene.id] = el)}
            className={`vh-scene ${scene.id === 3 ? 'vh-scene--bottom' : ''}`}
          >
            <div className="scene__center">
              {scene.lines.map(({ text, className }) => (
                <SceneLine key={text} text={text} className={className} />
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
