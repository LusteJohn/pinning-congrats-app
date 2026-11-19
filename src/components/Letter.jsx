import useReveal from '../useReveal.js'

const FLOWERS = [
  { id: 'petal-rose', color: '#ff6f91', dark: '#d84a6c' },
  { id: 'petal-gold', color: '#ffc233', dark: '#d99a10' },
  { id: 'petal-sky', color: '#7fd3ff', dark: '#4aa9d8' },
  { id: 'petal-pink', color: '#ff9ecb', dark: '#e0709f' },
  { id: 'petal-cream', color: '#fff4dc', dark: '#e5cba6' },
]

// Each bloom: [x, y, scale, petal gradient index, rotation, stem path, order]
// `order` drives the choreography so blooms open outward from the centre.
const BLOOMS = [
  { x: 196, y: 28, scale: 1.15, petal: 3, rotation: -2, stem: 'M196 186 V28', order: 0 },
  { x: 176, y: 88, scale: 0.96, petal: 4, rotation: 6, stem: 'M196 186 C188 152 180 116 178 92', order: 1 },
  { x: 222, y: 90, scale: 0.95, petal: 0, rotation: -6, stem: 'M196 186 C204 152 214 116 222 92', order: 1 },
  { x: 152, y: 40, scale: 1.08, petal: 1, rotation: 4, stem: 'M196 186 C194 146 162 96 152 48', order: 2 },
  { x: 240, y: 42, scale: 1.05, petal: 2, rotation: 8, stem: 'M196 186 C198 146 230 96 240 50', order: 2 },
  { x: 130, y: 100, scale: 0.9, petal: 2, rotation: -14, stem: 'M196 186 C186 158 146 128 130 108', order: 3 },
  { x: 268, y: 104, scale: 0.9, petal: 1, rotation: 14, stem: 'M196 186 C206 158 246 128 268 108', order: 3 },
  { x: 110, y: 62, scale: 1, petal: 0, rotation: -8, stem: 'M196 186 C190 150 150 118 112 70', order: 4 },
  { x: 282, y: 64, scale: 0.98, petal: 4, rotation: 12, stem: 'M196 186 C202 150 242 118 282 72', order: 4 },
]

const PETAL = 'M0 0 C-13 -8 -16 -30 0 -46 C16 -30 13 -8 0 0Z'

// Sequential delays (seconds): stems grow first, then blooms open centre-out.
const STEM_STEP = 0.07
const BLOOM_STEP = 0.13
const BLOOM_LEAD = 0.45

function Bloom({ x, y, scale, petal, rotation, delay }) {
  const fill = `url(#${FLOWERS[petal].id})`
  return (
    <g
      className="bloom"
      transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}
      style={{ animationDelay: `${delay}s` }}
    >
      <g className="bloom-petals" style={{ animationDelay: `${delay}s` }}>
        {[0, 72, 144, 216, 288].map((deg) => (
          <path key={deg} d={PETAL} fill={fill} transform={`rotate(${deg})`} />
        ))}
        <circle r="6.5" fill={FLOWERS[petal].dark} />
        <circle r="3.4" fill="#fff3c4" opacity=".85" />
      </g>
    </g>
  )
}

export default function Letter({ to, from }) {
  const [ref, shown] = useReveal()

  const stems = [...BLOOMS].sort((a, b) => a.order - b.order)

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

          {/* stems fanning out from the wrap - each grows upward from the wrap */}
          <g className="bouquet-stems" stroke="#4f8a54" strokeWidth="4.5" fill="none" strokeLinecap="round">
            {stems.map((b, i) => (
              <path key={b.stem} d={b.stem} pathLength="1" style={{ animationDelay: `${i * STEM_STEP}s` }} />
            ))}
          </g>

          {/* leaves tucked behind the blooms */}
          <g className="bouquet-leaves" fill="#69a86a">
            <path d="M196 150 C168 146 146 128 138 110 C166 108 188 122 196 150Z" opacity=".9" />
            <path d="M196 150 C224 146 246 128 254 110 C226 108 204 122 196 150Z" opacity=".9" />
            <path d="M196 128 C174 118 162 100 160 84 C182 88 196 104 196 128Z" opacity=".75" />
            <path d="M196 128 C218 118 230 100 232 84 C210 88 196 104 196 128Z" opacity=".75" />
          </g>

          {/* the bouquet blooms, opening centre-out */}
          <g className="bouquet-blooms">
            {BLOOMS.map((b) => (
              <Bloom
                key={b.stem}
                x={b.x}
                y={b.y}
                scale={b.scale}
                petal={b.petal}
                rotation={b.rotation}
                delay={BLOOM_LEAD + b.order * BLOOM_STEP}
              />
            ))}
          </g>

          {/* kraft wrap with folded collar */}
          <path className="bouquet-wrap" d="M196 168 L132 288 Q196 300 260 288Z" fill="url(#wrapG)" stroke="#c9b591" strokeWidth="2.5" strokeLinejoin="round" />
          <path className="bouquet-wrap" d="M196 172 L152 274 Q196 284 240 274Z" fill="#fffdf5" opacity=".55" />
          <path className="bouquet-wrap" d="M196 168 L164 280 M196 168 L228 280" stroke="#c9b591" strokeWidth="1.6" opacity=".55" />

          {/* ribbon bow */}
          <g className="bouquet-bow">
            <path d="M196 206 C170 188 158 208 176 218 C188 224 194 216 196 206Z" fill="#ff4d6d" />
            <path d="M196 206 C222 188 234 208 216 218 C204 224 198 216 196 206Z" fill="#ff4d6d" />
            <path className="bow-tail" d="M196 206 C186 222 178 240 184 252 C192 246 196 228 196 206Z" fill="#e83a5c" />
            <path className="bow-tail" d="M196 206 C206 222 214 240 208 252 C200 246 196 228 196 206Z" fill="#e83a5c" />
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
        <p className="bouquet-cap">a little bouquet, because you bloomed.</p>
      </div>

      <div className="letter">
        {"Even though we've only known each other for almost two months and I've only been a small part of your college journey, I watched you study late, doubt yourself, and then do it anyway. Every student in your internship classroom is going to be lucky to have you, because you make people feel like they can do hard things.\n\n"}
        {'So today I�m not just clapping for the pin and your deployment. I�m clapping for every late night, every requirement, and all the effort nobody saw.\n\n'}
        {`Go shine in your internship. I�m so proud of you, ${to}.`}
      </div>
      <div className="sign">with all my love and support LabLabb, {from}</div>
    </section>
  )
}
