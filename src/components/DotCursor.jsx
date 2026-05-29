import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './DotCursor.css'

export default function DotCursor({ onHero }) {
  const dotRef = useRef(null)

  useEffect(() => {
    const dot   = dotRef.current
    const moveX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' })
    const moveY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' })

    function onMove(e) { moveX(e.clientX); moveY(e.clientY) }
    function onEnter()  { gsap.to(dot, { scale: 2.5, duration: 0.2 }) }
    function onLeave()  { gsap.to(dot, { scale: 1,   duration: 0.2 }) }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={dotRef}
      className={`dot-cursor ${onHero ? '' : 'dot-cursor--dark'}`}
      aria-hidden="true"
    />
  )
}
