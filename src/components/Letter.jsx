import useReveal from '../useReveal.js'

const FLOWERS = [
  { id: 'petal-rose', color: '#ff6f91', dark: '#d84a6c' },
  { id: 'petal-gold', color: '#ffc233', dark: '#d99a10' },
  { id: 'petal-sky', color: '#7fd3ff', dark: '#4aa9d8' },
  { id: 'petal-pink', color: '#ff9ecb', dark: '#e0709f' },
  { id: 'petal-cream', color: '#fff4dc', dark: '#e5cba6' },
]

// Blooms positioned in a fan above the wrap. Each entry: [x, y, scale, petal gradient, rotation]
const BLOOMS = [
  [110, 62, 1, 0, -8],
  [152, 40, 1.08, 1, 4],
  [196, 28, 1.15, 3, -2],
  [240, 42, 1.05, 2, 8],
  [282, 64, 0.98, 4, 12],
  [130, 100, 0.9, 2, -14],
  [176, 88, 0.96, 4, 6],
  [222, 90, 0.95, 0, -6],
  [268, 104, 0.9, 1, 14],
]

const PETAL = 'M0 0 C-13 -8 -16 -30 0 -46 C16 -30 13 -8 0 0Z'

function Bloom({ x, y, scale, petal, rotation }) {
  const fill = `url(#${FLOWERS[petal].id})`
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <path key={deg} d={PETAL} fill={fill} transform={`rotate(${deg})`} />
      ))}
      <circle r="6.5" fill={FLOWERS[petal].dark} />
      <circle r="3.4" fill="#fff3c4" opacity=".85" />
    </g>
  )
}

export default function Letter({ to, from }) {
  const [ref, shown] = useReveal()

  return (
    <section ref={ref} className={`sec-letter enter${shown ? ' in' : ''}`}>
      <h2>A note from me</h2>

      <div className="bouquet" data-shown={shown}>
        <svg viewBox="0 0 392 300" role="img" aria-label="A bouquet of flowers for you">
          <defs>
            {FLOWERS.map((f) => (
              <radialGradient key={f.id} id={f.id} cx="50%" cy="85%" r="75%">
                <stop offset="0" stopColor={f.dark} />
                <stop offset="65%" stopColor={f.color} />
                <stop offset="100%" stopColor={f.color} />
              </radialGradient>
            ))}
            <linearGradient id="wrapG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fffaf0" />
              <stop offset="1" stopColor="#e9dcc2" />
            </linearGradient>
          </defs>

          {/* stems fanning out from the wrap */}
          <g stroke="#4f8a54" strokeWidth="4.5" fill="none" strokeLinecap="round">
            <path d="M196 186 C190 150 150 118 112 70" />
            <path d="M196 186 C194 146 162 96 152 48" />
            <path d="M196 186 V28" />
            <path d="M196 186 C198 146 230 96 240 50" />
            <path d="M196 186 C202 150 242 118 282 72" />
            <path d="M196 186 C186 158 146 128 130 108" />
            <path d="M196 186 C188 152 180 116 178 92" />
            <path d="M196 186 C204 152 214 116 222 92" />
            <path d="M196 186 C206 158 246 128 268 108" />
          </g>

          {/* leaves tucked behind the blooms */}
          <g fill="#69a86a">
            <path d="M196 150 C168 146 146 128 138 110 C166 108 188 122 196 150Z" opacity=".9" />
            <path d="M196 150 C224 146 246 128 254 110 C226 108 204 122 196 150Z" opacity=".9" />
            <path d="M196 128 C174 118 162 100 160 84 C182 88 196 104 196 128Z" opacity=".75" />
            <path d="M196 128 C218 118 230 100 232 84 C210 88 196 104 196 128Z" opacity=".75" />
          </g>

          {/* the bouquet blooms */}
          <g className="bouquet-blooms">
            {BLOOMS.map(([x, y, scale, petal, rotation], i) => (
              <g key={i} className="bloom" style={{ animationDelay: `${0.06 * i}s` }}>
                <Bloom x={x} y={y} scale={scale} petal={petal} rotation={rotation} />
              </g>
            ))}
          </g>

          {/* kraft wrap with folded collar */}
          <path d="M196 168 L132 288 Q196 300 260 288Z" fill="url(#wrapG)" stroke="#c9b591" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M196 172 L152 274 Q196 284 240 274Z" fill="#fffdf5" opacity=".55" />
          <path d="M196 168 L164 280 M196 168 L228 280" stroke="#c9b591" strokeWidth="1.6" opacity=".55" />

          {/* ribbon bow */}
          <g className="bouquet-bow">
            <path d="M196 206 C170 188 158 208 176 218 C188 224 194 216 196 206Z" fill="#ff4d6d" />
            <path d="M196 206 C222 188 234 208 216 218 C204 224 198 216 196 206Z" fill="#ff4d6d" />
            <path d="M196 206 C186 222 178 240 184 252 C192 246 196 228 196 206Z" fill="#e83a5c" />
            <path d="M196 206 C206 222 214 240 208 252 C200 246 196 228 196 206Z" fill="#e83a5c" />
            <circle cx="196" cy="206" r="6" fill="#ff7d96" />
          </g>

          {/* floating sparkles */}
          <g className="bouquet-sparkle" fill="#fff3c4">
            <path d="M92 44 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" />
            <path d="M300 36 l2.5 7 7 2.5 -7 2.5 -2.5 7 -2.5 -7 -7 -2.5 7 -2.5Z" />
            <circle cx="76" cy="150" r="2.6" />
            <circle cx="318" cy="140" r="2.6" />
            <circle cx="196" cy="8" r="2.2" />
          </g>
        </svg>
        <p className="bouquet-cap">a little bouquet, because you bloomed. 💐</p>
      </div>

      <div className="letter">
        {"Even though we've only known each other for almost two months and I've only been a small part of your college journey, I watched you study late, doubt yourself, and then do it anyway. Every student in your internship classroom is going to be lucky to have you, because you make people feel like they can do hard things.\n\n"}
        {'So today I’m not just clapping for the pin and your deployment. I’m clapping for every late night, every requirement, and all the effort nobody saw.\n\n'}
        {`Go shine in your internship. I’m so proud of you, ${to}. 💛`}
      </div>
      <div className="sign">with all my love and support LabLabb, {from} ✏️</div>
    </section>
  )
}
