import useLocalStorage from '../useLocalStorage.js'
import useReveal from '../useReveal.js'

const TRAY = ['🍎', '🎓', '📚', '✏️', '⭐', '💛', '🎉', '🌸']

// A few stickers already on the board so it never looks empty on first load.
const SEED = [
  { id: 'seed-1', emoji: '🎓', x: 16, y: 20, tilt: -14 },
  { id: 'seed-2', emoji: '💛', x: 74, y: 26, tilt: 12 },
  { id: 'seed-3', emoji: '🍎', x: 46, y: 62, tilt: -6 },
]

const rand = (min, range) => Math.random() * range + min
const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

// randomUUID is not available in older Safari/WebViews, so fall back safely.
const uid = () =>
  (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' && crypto.randomUUID()) ||
  `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

export default function StickerBoard() {
  const [stickers, setStickers] = useLocalStorage('pinning.stickers', SEED)
  const [pick, setPick] = useLocalStorage('pinning.pick', '🍎')
  const [ref, shown] = useReveal()

  // Keep coordinates inside the board so stickers never clip at the edges.
  const add = (emoji, x, y) =>
    setStickers((list) => [
      ...list,
      { id: uid(), emoji, x: clamp(x, 2, 90), y: clamp(y, 2, 86), tilt: rand(-20, 40) },
    ])

  const undo = () => setStickers((list) => list.slice(0, -1))
  const clear = () => setStickers([])

  const onBoardClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    add(pick, ((e.clientX - r.left) / r.width) * 100 - 4, ((e.clientY - r.top) / r.height) * 100 - 8)
  }

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      add(pick, rand(10, 70), rand(10, 60))
    }
  }

  return (
    <section ref={ref} className={`sec-board enter${shown ? ' in' : ''}`}>
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
            aria-pressed={pick === emoji}
            onClick={() => {
              setPick(emoji)
              add(emoji, rand(10, 70), rand(10, 60))
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
      <div className="board-actions">
        <button className="mini" onClick={undo} disabled={stickers.length === 0}>↶ Undo</button>
        <button className="mini" onClick={clear} disabled={stickers.length === 0}>Clear all</button>
      </div>
    </section>
  )
}