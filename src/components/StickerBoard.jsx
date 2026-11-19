import { useState } from 'react'

const TRAY = ['🍎', '🎓', '📚', '✏️', '⭐', '💛', '🎉', '🌸']
const rand = (min, range) => Math.random() * range + min

export default function StickerBoard() {
  const [stickers, setStickers] = useState([])
  const [pick, setPick] = useState('🍎')

  const add = (emoji, x, y) =>
    setStickers((list) => [...list, { id: crypto.randomUUID(), emoji, x, y, tilt: rand(-20, 40) }])

  const onBoardClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    add(pick, ((e.clientX - r.left) / r.width) * 100 - 4, ((e.clientY - r.top) / r.height) * 100 - 8)
  }

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      add(pick, rand(10, 80), rand(10, 70))
    }
  }

  return (
    <section>
      <h2>Decorate the board</h2>
      <div className="board" role="button" tabIndex={0} aria-label="Tap to drop a sticker" onClick={onBoardClick} onKeyDown={onKey}>
        {stickers.length === 0 && <p>Tap an emoji below, then tap anywhere here to stick it.</p>}
        {stickers.map((s) => (
          <span key={s.id} className="stick" style={{ left: `${s.x}%`, top: `${s.y}%`, transform: `rotate(${s.tilt}deg)` }}>
            {s.emoji}
          </span>
        ))}
      </div>
      <div className="tray">
        {TRAY.map((emoji) => (
          <button
            key={emoji}
            className="e"
            aria-label={`Choose sticker ${emoji}`}
            onClick={() => {
              setPick(emoji)
              add(emoji, rand(10, 80), rand(10, 70))
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
    </section>
  )
}
