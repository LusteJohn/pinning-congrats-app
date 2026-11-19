import useLocalStorage from '../useLocalStorage.js'

const TRAY = ['🍎', '🎓', '📚', '✏️', '⭐', '💛', '🎉', '🌸']
const rand = (min, range) => Math.random() * range + min
const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

export default function StickerBoard() {
  const [stickers, setStickers] = useLocalStorage('pinning.stickers', [])
  const [pick, setPick] = useLocalStorage('pinning.pick', '🍎')

  // Keep coordinates inside the board so stickers never clip at the edges.
  const add = (emoji, x, y) =>
    setStickers((list) => [
      ...list,
      { id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()), emoji, x: clamp(x, 2, 90), y: clamp(y, 2, 86), tilt: rand(-20, 40) },
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
