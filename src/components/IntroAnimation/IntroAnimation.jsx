import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Cursor from './Cursor'
import './IntroAnimation.css'

// Text sequences for the typewriter
const SEQUENCE = [
  { text: 'Welcom',  action: 'delete' },
  { text: 'hi',      action: 'hold' },
]
const SUBTITLE = 'My name is Emilie Sommer and I'

export default function IntroAnimation({ onComplete }) {
  const overlayRef   = useRef(null)
  const textboxRef   = useRef(null)
  const subtitleRef  = useRef(null)
  const cursorRef    = useRef(null)
  const mainTextRef  = useRef(null)
  const subTextRef   = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: () => {
      // Fade out the entire intro overlay, then call onComplete
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete,
      })
    }})

    const cursor = cursorRef.current
    const textbox = textboxRef.current
    const subtitleBox = subtitleRef.current
    const mainText = mainTextRef.current
    const subText = subTextRef.current

    // Start: Figma cursor off-screen left, textboxes hidden
    gsap.set(cursor, { x: -80, y: '40vh', opacity: 1 })
    gsap.set([textbox, subtitleBox], { opacity: 0, scale: 0.98 })

    // 1. Cursor drifts in
    tl.to(cursor, { x: '42vw', y: '38vh', duration: 1.2, ease: 'power2.out' })

    // 2. Click — textbox appears
    tl.to(cursor, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 })
    tl.to(textbox, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.7)' }, '<')

    // 3. Cursor moves inside textbox, starts typing "Welcom"
    tl.to(cursor, { x: '45vw', y: '39vh', duration: 0.3 })
    tl.call(() => typeText(mainText, 'Welcom', tl), null, '>')

    // 4. Pause, then select + delete
    tl.to({}, { duration: 0.6 })
    tl.call(() => { mainText.textContent = '' })

    // 5. Type "hi"
    tl.call(() => typeText(mainText, 'hi', tl))

    // 6. Cursor moves down to create subtitle textbox
    tl.to({}, { duration: 0.4 })
    tl.to(cursor, { x: '38vw', y: '46vh', duration: 0.5, ease: 'power2.out' })
    tl.to(cursor, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 })
    tl.to(subtitleBox, { opacity: 1, scale: 1, duration: 0.15, ease: 'back.out(1.7)' }, '<')

    // 7. Type subtitle
    tl.to(cursor, { x: '40vw', y: '47vh', duration: 0.2 })
    tl.call(() => typeText(subText, SUBTITLE, tl))

    // 8. Click away — boxes "lock in" (borders fade)
    tl.to({}, { duration: 0.5 })
    tl.to(cursor, { x: '20vw', y: '60vh', duration: 0.6 })
    tl.to(cursor, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 })
    tl.to([textbox, subtitleBox], { borderColor: 'transparent', duration: 0.3 })

    // 9. Hold, then fade out
    tl.to({}, { duration: 1.2 })

    return () => tl.kill()
  }, [])

  function typeText(el, text, tl) {
    const chars = text.split('')
    chars.forEach((char) => {
      tl.call(() => { el.textContent += char }, null, `+=${0.07 + Math.random() * 0.04}`)
    })
  }

  function handleSkip() {
    gsap.killTweensOf('*')
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, onComplete })
  }

  return (
    <div ref={overlayRef} className="intro-overlay">
      <button className="skip-btn" onClick={handleSkip}>Skip intro →</button>

      <Cursor ref={cursorRef} />

      <div ref={textboxRef} className="intro-textbox intro-textbox--main">
        <span ref={mainTextRef} className="intro-main-text" />
        <span className="intro-cursor-blink">|</span>
      </div>

      <div ref={subtitleRef} className="intro-textbox intro-textbox--sub">
        <span ref={subTextRef} className="intro-sub-text" />
        <span className="intro-cursor-blink">|</span>
      </div>
    </div>
  )
}
