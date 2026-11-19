import useLocalStorage from '../useLocalStorage.js'
import useReveal from '../useReveal.js'
import { STICKER_KEYS, STICKERS, StickerIcon } from './StickerIcons.jsx'

// A few stickers already on the board so it never looks empty on first load.
const SEED = [
  { id: 'seed-1', icon: 'cap', x: 16, y: 20, tilt: -14 },
  { id: 'seed-2', icon: 'heart', x: 74, y: 26, tilt: 12 },
  { id: 'seed-3', icon: 'star', x: 46, y: 62, tilt: -6 },
]

const rand = (min, range) => Math.random() * range + min
const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

// randomUUID is not available in older Safari/WebViews, so fall back safely.
const uid = () =>
  (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' && crypto.randomUUID()) ||
  `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const label = (icon) => STICKERS[icon]?.label ?? 'Sticker'

export default function StickerBoard() {
  const [stickers, setStickers] = useLocalStorage('pinning.stickers', SEED)
  const [pick, setPick] = useLocalStorage('pinning.pick', 'star')
  const [ref, shown] = useReveal()

  // Older saved boards used emoji strings; map them to the new icon keys.
  const legacyIcon = (emoji) =>
    ({
      '\uD83C\uDF93': 'cap',
      '\uD83D\uDC9B': 'heart',
      '\u2764\uFE0F': 'heart',
      '\uD83C\uDF4E': 'flower',
      '\uD83D\uDCDA': 'trophy',
      '\u270F\uFE0F': 'music',
      '\u2B50': 'star',
      '\uD83C\uDF1F': 'star',
      '\uD83C\uDF89': 'party',
      '\uD83C\uDF8A': 'party',
      '\uD83E\uDD73': 'clap',
      '\uD83D\uDC4F': 'clap',
      '\uD83C\uDFC5': 'medal',
      '\u2728': 'firework',
      '\uD83D\uDC90': 'flower',
      '\uD83C\uDF38': 'flower',
      '\uD83C\uDF88': 'balloon',
      '\uD83C\uDF08': 'rainbow',
    })[emoji] ?? 'star'

  const placed = stickers.map((s) => ({
    ...s,
    icon: s.icon ?? legacyIcon(s.emoji),
  }))

  // Keep coordinates inside the board so stickers never clip at the edges.
  const add = (icon, x, y) =>
    setStickers((list) => [
      ...list,
      { id: uid(), icon, x: clamp(x, 2, 86), y: clamp(y, 2, 82), tilt: rand(-20, 40) },
    ])

  const undo = () => setStickers((list) => list.slice(0, -1))
  const clear = () => setStickers([])

  const onBoardClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    add(pick, ((e.clientX - r.left) / r.width) * 100 - 6, ((e.clientY - r.top) / r.height) * 100 - 10)
  }

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      add(pick, rand(10, 66), rand(10, 56))
    }
  }

  return (
    <section ref={ref} className={`sec-board enter${shown ? ' in' : ''}`}>
      <h2>Decorate the board</h2>
      <div className="board" role="button" tabIndex={0} aria-label="Tap to drop a sticker" onClick={onBoardClick} onKeyDown={onKey}>
        {placed.length === 0 && <p>Pick a sticker below, then tap anywhere here to stick it.</p>}
        {placed.map((s) => (
          <span
            key={s.id}
            className="stick"
            style={{ left: `${s.x}%`, top: `${s.y}%`, transform: `rotate(${s.tilt}deg)` }}
          >
            <StickerIcon name={s.icon} size={54} />
            <span className="stick-dust" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
          </span>
        ))}
      </div>
      <div className="tray">
        {STICKER_KEYS.map((icon) => (
          <button
            key={icon}
            className="e"
            aria-label={`Choose sticker ${label(icon)}`}
            aria-pressed={pick === icon}
            onClick={() => {
              setPick(icon)
              add(icon, rand(10, 66), rand(10, 56))
            }}
          >
            <StickerIcon name={icon} size={40} />
          </button>
        ))}
      </div>
      <div className="board-actions">
        <button className="mini" onClick={undo} disabled={stickers.length === 0}>â†¶ Undo</button>
        <button className="mini" onClick={clear} disabled={stickers.length === 0}>Clear all</button>
      </div>
    </section>
  )
}
