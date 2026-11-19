import { useEffect, useState } from 'react'

// Small "pinned & deployed" seal fixed in the corner. Its ring fills as the
// reader scrolls, so progress is visible without adding chrome.
export default function ScrollSeal() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const value = max > 0 ? window.scrollY / max : 0
      setProgress(Math.min(1, Math.max(0, value)))
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Overshoot-and-settle ring: draw counter-clockwise from the top.
  const circumference = 2 * Math.PI * 15
  const filled = circumference * progress
  const percent = Math.round(progress * 100)
  const complete = progress > 0.995

  return (
    <div className={`seal${complete ? ' done' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 40 40" width="52" height="52">
        <circle className="seal-track" cx="20" cy="20" r="15" />
        <circle
          className="seal-fill"
          cx="20"
          cy="20"
          r="15"
          strokeDasharray={`${filled} ${circumference}`}
        />
        <g className="seal-badge">
          <circle cx="20" cy="20" r="10.5" fill="var(--gold)" />
          <path
            d="M15.5 20.2 L18.6 23.2 L24.6 16.8"
            fill="none"
            stroke="#5b3b00"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      <span className="seal-label">{complete ? 'deployed' : `${percent}%`}</span>
    </div>
  )
}
