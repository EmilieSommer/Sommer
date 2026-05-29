import { useState, useEffect } from 'react'
import './Lightbox.css'

export default function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, onClose])

  return (
    <div className="lb-overlay" onClick={onClose}>
      <div className="lb-inner" onClick={e => e.stopPropagation()}>
        <img className="lb-img" src={images[idx].src} alt={images[idx].alt} />

        {images.length > 1 && (
          <>
            <button className="lb-nav lb-nav--prev" onClick={() => setIdx(i => (i - 1 + images.length) % images.length)} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="13 4 7 10 13 16" /></svg>
            </button>
            <button className="lb-nav lb-nav--next" onClick={() => setIdx(i => (i + 1) % images.length)} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="7 4 13 10 7 16" /></svg>
            </button>
            <span className="lb-counter">{idx + 1} / {images.length}</span>
          </>
        )}

        <button className="lb-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="2" x2="16" y2="16" /><line x1="16" y1="2" x2="2" y2="16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
