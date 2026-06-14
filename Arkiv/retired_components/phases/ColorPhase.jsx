import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ColorPhase.css'

gsap.registerPlugin(ScrollTrigger)

const PALETTE = [
  { name: 'Terracotta', hex: '#D95122', role: 'Primary' },
  { name: 'Rust',       hex: '#BD4B26', role: 'Primary Dark' },
  { name: 'Sage',       hex: '#B6CFB9', role: 'Secondary' },
  { name: 'Amber',      hex: '#EAB05C', role: 'Accent' },
  { name: 'Near Black', hex: '#1E1E20', role: 'Text' },
  { name: 'Cream',      hex: '#F2F0EF', role: 'Background' },
]

// WCAG contrast ratio (simplified approximation)
function contrastRatio(hex, bg = '#F2F0EF') {
  const lum = (h) => {
    const c = h.replace('#', '')
    const r = parseInt(c.slice(0, 2), 16) / 255
    const g = parseInt(c.slice(2, 4), 16) / 255
    const b = parseInt(c.slice(4, 6), 16) / 255
    const toLinear = (x) => x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
  }
  const l1 = lum(hex), l2 = lum(bg)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

function ContrastBadge({ ratio }) {
  const aa  = ratio >= 4.5
  const aaa = ratio >= 7
  return (
    <div className={`contrast-badge ${aa ? 'contrast-badge--pass' : 'contrast-badge--fail'}`}>
      <span className="contrast-badge__ratio">{ratio.toFixed(1)}:1</span>
      <span className="contrast-badge__level">
        {aaa ? 'AAA ✓' : aa ? 'AA ✓' : 'AA ✗ Fail'}
      </span>
    </div>
  )
}

export default function ColorPhase() {
  const sectionRef   = useRef(null)
  const paletteRef   = useRef(null)
  const [showPalette, setShowPalette] = useState(false)
  const [demoColor, setDemoColor] = useState('#C4B8A8') // intentionally bad contrast

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      // Show bad contrast first, then correct
      tl.to({}, { duration: 0.8 })
      tl.call(() => setDemoColor('#C4B8A8'))   // bad — ~1.5:1
      tl.to({}, { duration: 1.2 })
      tl.call(() => setDemoColor('#896645'))    // better — ~3.9:1
      tl.to({}, { duration: 0.8 })
      tl.call(() => setDemoColor('#1E1E20'))    // final — ~17:1
      tl.to({}, { duration: 0.6 })

      // Reveal palette swatches
      tl.call(() => setShowPalette(true))
      tl.fromTo(
        '.color-swatch',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="phase phase--color">
      <div className="phase__inner">
        <div className="phase__label">02 — Color &amp; Accessibility</div>

        <div className="color-demo">
          <div className="color-demo__preview" style={{ color: demoColor }}>
            The quick brown fox jumps over the lazy dog.
          </div>
          <ContrastBadge ratio={contrastRatio(demoColor)} />
        </div>

        {showPalette && (
          <div ref={paletteRef} className="palette-grid">
            {PALETTE.map((swatch) => (
              <div key={swatch.hex} className="color-swatch">
                <div
                  className="color-swatch__block"
                  style={{ background: swatch.hex }}
                />
                <span className="color-swatch__name">{swatch.name}</span>
                <span className="color-swatch__hex">{swatch.hex}</span>
                <span className="color-swatch__role">{swatch.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
