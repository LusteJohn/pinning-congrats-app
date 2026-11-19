// Hand-drawn animated SVG celebration stickers used on the sticker board.

const SPARK = 'M0 -10 L2.4 -2.4 L10 0 L2.4 2.4 L0 10 L-2.4 2.4 L-10 0 L-2.4 -2.4 Z'

function Sparkles({ color = '#ffc233', delay = 0 }) {
  return (
    <g fill={color} style={{ animationDelay: `${delay}s` }}>
      <path d={SPARK} transform="translate(7 8) scale(.55)" className="sb-tw" />
      <path d={SPARK} transform="translate(47 6) scale(.42)" className="sb-tw" style={{ animationDelay: '-.8s' }} />
      <path d={SPARK} transform="translate(45 45) scale(.34)" className="sb-tw" style={{ animationDelay: '-1.6s' }} />
    </g>
  )
}

export const STICKERS = {
  party: {
    label: 'Party popper',
    render: () => (
      <g>
        <path d="M8 26 L30 48 L10 52 Z" fill="#ff9ecb" stroke="#d84a6c" strokeWidth="2" strokeLinejoin="round" />
        <path d="M11 33 L25 47" stroke="#fffdf5" strokeWidth="2" opacity=".7" />
        <g strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M30 48 C22 34 26 20 36 12" stroke="#ffc233" className="sb-stream" />
          <path d="M30 48 C38 36 44 28 50 24" stroke="#7fd3ff" className="sb-stream" style={{ animationDelay: '-.5s' }} />
          <path d="M30 48 C36 30 30 18 24 10" stroke="#ff4d6d" className="sb-stream" style={{ animationDelay: '-1s' }} />
        </g>
        <g className="sb-confetti">
          <rect x="36" y="6" width="5" height="5" rx="1" fill="#ff4d6d" transform="rotate(20 38 8)" />
          <circle cx="50" cy="14" r="3" fill="#9dff9d" />
          <rect x="20" y="6" width="4" height="4" rx="1" fill="#7fd3ff" transform="rotate(-25 22 8)" />
          <circle cx="44" cy="34" r="2.6" fill="#ffc233" />
        </g>
        <Sparkles delay={0.3} />
      </g>
    ),
  },
  clap: {
    label: 'Clapping hands',
    render: () => (
      <g className="sb-clap">
        <g fill="#f5c9a3" stroke="#c9977a" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M18 44 Q12 30 20 22 Q26 16 30 24 L32 40 Z" />
          <path d="M42 44 Q48 30 40 22 Q34 16 30 24 L28 40 Z" />
        </g>
        <g stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" className="sb-clap-lines">
          <path d="M23 14 L19 7" />
          <path d="M37 14 L41 7" />
          <path d="M30 10 L30 3" />
        </g>
        <Sparkles color="#ffc233" delay={0.45} />
      </g>
    ),
  },
  star: {
    label: 'Shining star',
    render: () => (
      <g>
        <path
          d="M30 8 L37 24 L54 26 L41 37 L45 54 L30 45 L15 54 L19 37 L6 26 L23 24 Z"
          fill="#ffc233"
          stroke="#c47f1c"
          strokeWidth="2.2"
          strokeLinejoin="round"
          className="sb-pop"
        />
        <path d="M25 26 L30 22" stroke="#fffdf5" strokeWidth="2.4" strokeLinecap="round" opacity=".8" />
        <Sparkles delay={0.2} />
      </g>
    ),
  },
  heart: {
    label: 'Beating heart',
    render: () => (
      <g>
        <path
          d="M30 52 C10 38 6 26 12 18 C18 10 27 13 30 20 C33 13 42 10 48 18 C54 26 50 38 30 52 Z"
          fill="#ff4d6d"
          stroke="#c9314c"
          strokeWidth="2.2"
          strokeLinejoin="round"
          className="sb-beat"
        />
        <ellipse cx="21" cy="23" rx="4" ry="3" fill="#fffdf5" opacity=".65" transform="rotate(-25 21 23)" />
      </g>
    ),
  },
  balloon: {
    label: 'Balloon',
    render: () => (
      <g>
        <g className="sb-float">
          <ellipse cx="30" cy="24" rx="14" ry="17" fill="#7fd3ff" stroke="#4aa9d8" strokeWidth="2.2" />
          <ellipse cx="25" cy="17" rx="4" ry="6" fill="#fffdf5" opacity=".6" transform="rotate(-20 25 17)" />
          <path d="M27 41 L30 46 L33 41 Z" fill="#4aa9d8" />
          <path d="M30 46 C26 50 34 53 30 57" stroke="#4aa9d8" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
      </g>
    ),
  },
  cap: {
    label: 'Graduation cap',
    render: () => (
      <g className="sb-toss">
        <path d="M30 16 L56 27 L30 38 L4 27 Z" fill="#2f5aa8" stroke="#1d3f7d" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M18 32 V41 Q30 48 42 41 V32" fill="#2f5aa8" stroke="#1d3f7d" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M30 27 L30 21" stroke="#c47f1c" strokeWidth="2" strokeLinecap="round" />
        <circle cx="30" cy="20" r="2.6" fill="#ffc233" />
        <path d="M52 25 V37" stroke="#ffc233" strokeWidth="2" strokeLinecap="round" className="sb-tassel" />
        <Sparkles color="#ffc233" delay={0.35} />
      </g>
    ),
  },
  flower: {
    label: 'Flower',
    render: () => (
      <g className="sb-sway">
        <path d="M30 52 V32" stroke="#4f8a54" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 44 C22 42 18 46 17 51 C24 52 28 49 30 44Z" fill="#69a86a" />
        <g className="sb-bloom" style={{ transformOrigin: '30px 26px' }}>
          <g fill="#ff9ecb" stroke="#e0709f" strokeWidth="1.6">
            <ellipse cx="30" cy="13" rx="5.5" ry="9" />
            <ellipse cx="40" cy="20" rx="9" ry="5.5" />
            <ellipse cx="37" cy="33" rx="5.5" ry="9" transform="rotate(30 37 33)" />
            <ellipse cx="23" cy="33" rx="5.5" ry="9" transform="rotate(-30 23 33)" />
            <ellipse cx="20" cy="20" rx="9" ry="5.5" />
          </g>
          <circle cx="30" cy="26" r="5.5" fill="#ffc233" />
        </g>
      </g>
    ),
  },
  medal: {
    label: 'Medal',
    render: () => (
      <g>
        <path d="M20 10 L26 30 L34 30 L40 10 Z" fill="#ff4d6d" stroke="#c9314c" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M40 10 L34 30 L26 30 L20 10 Z" fill="#2f5aa8" opacity=".85" />
        <g className="sb-pop">
          <circle cx="30" cy="38" r="14" fill="#ffc233" stroke="#c47f1c" strokeWidth="2.4" />
          <circle cx="30" cy="38" r="10" fill="#ffe08a" />
          <path d={SPARK} transform="translate(30 38) scale(.62)" fill="#c47f1c" />
        </g>
        <Sparkles color="#ffc233" delay={0.5} />
      </g>
    ),
  },
  firework: {
    label: 'Firework',
    render: () => (
      <g className="sb-spin" style={{ transformOrigin: '30px 30px' }}>
        <g strokeWidth="2.6" strokeLinecap="round" fill="none">
          <path d="M30 30 L30 6" stroke="#ff4d6d" />
          <path d="M30 30 L30 54" stroke="#ffc233" />
          <path d="M30 30 L6 30" stroke="#7fd3ff" />
          <path d="M30 30 L54 30" stroke="#9dff9d" />
          <path d="M30 30 L13 13" stroke="#ff9ecb" />
          <path d="M30 30 L47 47" stroke="#ffc233" />
          <path d="M30 30 L47 13" stroke="#7fd3ff" />
          <path d="M30 30 L13 47" stroke="#ff4d6d" />
        </g>
        <circle cx="30" cy="30" r="4.5" fill="#fffdf5" className="sb-pulse" />
      </g>
    ),
  },
  trophy: {
    label: 'Trophy',
    render: () => (
      <g className="sb-pop">
        <path d="M20 10 H40 V26 Q40 38 30 38 Q20 38 20 26 Z" fill="#ffc233" stroke="#c47f1c" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M20 14 H12 Q12 24 20 24" stroke="#c47f1c" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
        <path d="M40 14 H48 Q48 24 40 24" stroke="#c47f1c" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
        <path d="M30 38 V46" stroke="#c47f1c" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 50 H40" stroke="#c47f1c" strokeWidth="3.4" strokeLinecap="round" />
        <path d={SPARK} transform="translate(30 24) scale(.5)" fill="#fffdf5" opacity=".85" />
      </g>
    ),
  },
  music: {
    label: 'Music notes',
    render: () => (
      <g className="sb-bounce">
        <g fill="#ff9ecb" stroke="#e0709f" strokeWidth="1.6">
          <ellipse cx="20" cy="40" rx="6" ry="4.6" transform="rotate(-20 20 40)" />
          <ellipse cx="40" cy="34" rx="6" ry="4.6" transform="rotate(-20 40 34)" />
        </g>
        <path d="M25 39 V20 L45 15 V33" stroke="#e0709f" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M25 20 L45 15" stroke="#e0709f" strokeWidth="4.4" strokeLinecap="round" />
        <Sparkles color="#ff9ecb" delay={0.4} />
      </g>
    ),
  },
  rainbow: {
    label: 'Rainbow',
    render: () => (
      <g className="sb-glow">
        <g fill="none" strokeWidth="5" strokeLinecap="round">
          <path d="M6 46 Q30 10 54 46" stroke="#ff4d6d" />
          <path d="M12 46 Q30 17 48 46" stroke="#ffc233" />
          <path d="M18 46 Q30 24 42 46" stroke="#9dff9d" />
          <path d="M24 46 Q30 31 36 46" stroke="#7fd3ff" />
        </g>
        <g fill="#fffdf5">
          <ellipse cx="8" cy="48" rx="7" ry="5" />
          <ellipse cx="52" cy="48" rx="7" ry="5" />
        </g>
      </g>
    ),
  },
}

export const STICKER_KEYS = Object.keys(STICKERS)

export function StickerIcon({ name, size = 40 }) {
  const sticker = STICKERS[name] ?? STICKERS.star
  return (
    <svg
      className="sb-icon"
      viewBox="0 0 60 60"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {sticker.render()}
    </svg>
  )
}
