import { useEffect } from 'react'
import './NykreditPage.css'

const BASE = import.meta.env.BASE_URL

export default function NykreditPage({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="nk-page" role="dialog" aria-label="Nykredit showcase">
      <header className="nk-page__header">
        <button className="nk-page__close" onClick={onClose} aria-label="Close">✕</button>
        <div className="nk-page__header-title">Nykredit</div>
      </header>

      <img
        src={`${BASE}assets/nykredit/nk_slides_full.png`}
        alt="Nykredit design work — Emilie Sommer"
        className="nk-page__slides"
      />
    </div>
  )
}
