import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './TypographyPhase.css'

gsap.registerPlugin(ScrollTrigger)

const FONT_TRIALS = [
  { name: 'Arial', label: 'Arial' },
  { name: 'Times New Roman', label: 'Times New Roman' },
  { name: 'Comic Sans MS', label: 'Comic Sans' },
  { name: 'Georgia', label: 'Georgia' },
  { name: 'Montserrat', label: 'Montserrat' },
  { name: 'Playfair Display', label: 'Playfair Display ✓' },
]

export default function TypographyPhase() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const fontLabelRef = useRef(null)
  const hierarchyRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: false,
          once: true,
        },
      })

      // Cycle through fonts
      FONT_TRIALS.forEach((font, i) => {
        const isLast = i === FONT_TRIALS.length - 1
        tl.call(() => {
          headingRef.current.style.fontFamily = `'${font.name}', serif`
          fontLabelRef.current.textContent = font.name
          fontLabelRef.current.style.opacity = '1'
        })
        tl.to({}, { duration: isLast ? 0.3 : 0.45 })
        if (!isLast) {
          tl.to(fontLabelRef.current, { opacity: 0, duration: 0.15 })
          tl.call(() => {
            headingRef.current.style.color = ''
          })
        }
      })

      // Lock in: show "accepted" state
      tl.to(fontLabelRef.current, {
        color: '#BD4B26',
        fontWeight: '600',
        duration: 0.2,
      })

      // Reveal type hierarchy
      tl.to(hierarchyRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '+=0.2')
      tl.fromTo(
        '.type-row',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.12, ease: 'power2.out' }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="phase phase--typography">
      <div className="phase__inner">
        <div className="phase__label">01 — Typography</div>

        <div className="font-trial-area">
          <h1 ref={headingRef} className="trial-heading" aria-live="polite">
            hi
          </h1>
          <span ref={fontLabelRef} className="font-trial-label" aria-live="polite" />
        </div>

        <div ref={hierarchyRef} className="type-hierarchy">
          <div className="type-row">
            <span className="type-row__sample type-row__sample--h1">Heading 1</span>
            <span className="type-row__meta">Playfair Display · 72px · 900</span>
          </div>
          <div className="type-row">
            <span className="type-row__sample type-row__sample--h2">Heading 2</span>
            <span className="type-row__meta">Playfair Display · 48px · 700</span>
          </div>
          <div className="type-row">
            <span className="type-row__sample type-row__sample--body">Body text — Poppins Regular</span>
            <span className="type-row__meta">Poppins · 16px · 400</span>
          </div>
          <div className="type-row">
            <span className="type-row__sample type-row__sample--caption">Caption / Label</span>
            <span className="type-row__meta">Poppins · 12px · 300</span>
          </div>
        </div>
      </div>
    </div>
  )
}
