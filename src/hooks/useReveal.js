import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Add className="r" for a single fade-up, "r-group" on a parent to stagger its children
export default function useReveal(ref) {
  useEffect(() => {
    if (!ref?.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.r', ref.current).forEach(el => {
        gsap.from(el, {
          opacity: 0, y: 28,
          duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })
      gsap.utils.toArray('.r-group', ref.current).forEach(group => {
        gsap.from(Array.from(group.children), {
          opacity: 0, y: 24,
          duration: 0.55, ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: group, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])
}
