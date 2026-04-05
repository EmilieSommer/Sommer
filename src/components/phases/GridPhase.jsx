import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './GridPhase.css'

gsap.registerPlugin(ScrollTrigger)

export default function GridPhase() {
  const sectionRef  = useRef(null)
  const [gridVisible, setGridVisible] = useState(false)
  const [snapped, setSnapped]         = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      // Elements start misaligned
      gsap.set('.grid-block', { x: () => gsap.utils.random(-40, 40) })

      tl.to({}, { duration: 0.5 })

      // Flash grid on
      tl.call(() => setGridVisible(true))
      tl.to({}, { duration: 0.4 })

      // Snap elements into place
      tl.to('.grid-block', {
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(2)',
      })

      // Show spacing indicators briefly then fade
      tl.to('.spacing-line', { opacity: 1, duration: 0.2, stagger: 0.05 }, '+=0.2')
      tl.to('.spacing-line', { opacity: 0, duration: 0.3 }, '+=0.6')

      // Flash grid off
      tl.call(() => setGridVisible(false), null, '+=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="phase phase--grid">
      {gridVisible && (
        <div className="grid-overlay" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="grid-col" />
          ))}
        </div>
      )}

      <div className="phase__inner">
        <div className="phase__label">03 — Grid &amp; Layout</div>

        <div className="grid-demo">
          <div className="grid-block grid-block--wide">
            <div className="spacing-line spacing-line--h" />
            <div className="block-placeholder" />
          </div>
          <div className="grid-block grid-block--text">
            <div className="spacing-line spacing-line--v" />
            <div className="block-text-lines">
              <div className="text-line text-line--title" />
              <div className="text-line" />
              <div className="text-line text-line--short" />
            </div>
          </div>
          <div className="grid-block grid-block--narrow">
            <div className="block-placeholder block-placeholder--sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
