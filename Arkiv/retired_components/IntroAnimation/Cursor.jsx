import { forwardRef } from 'react'
import './Cursor.css'

const Cursor = forwardRef(function Cursor(props, ref) {
  return (
    <div ref={ref} className="figma-cursor" aria-hidden="true">
      {/* SVG arrow cursor — matches macOS/Figma style */}
      <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
        <path
          d="M2 2L2 22L7.5 16.5L11.5 26L14 25L10 15.5H18L2 2Z"
          fill="white"
          stroke="#1E1E20"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      {/* Username label — like Figma multiplayer */}
      <span className="cursor-label">Emilie</span>
    </div>
  )
})

export default Cursor
