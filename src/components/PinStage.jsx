import logo from '../assets/sunn-logo.png'

// Uniform colors, matched to the photo: cream top with orange-gold trim.
const UNIFORM = { light: '#f8efd4', cloth: '#f1e3bd', shade: '#e3d1a0', trim: '#e8a23a', trimDark: '#c47f1c', skin: '#e2b08a', skinShade: '#cf9468', hair: '#2b1b17' }

// step 0 = nothing pinned, 1 = SUNN logo pinned, 2 = name tag pinned too
export default function PinStage({ step, name, course, onPin, onTag }) {
  const hint = step === 0 ? 'tap the SUNN pin 👆' : 'now tap the name tag 👆'
  return (
    <div className="stage">
      <svg viewBox="0 -86 400 386" aria-hidden="true">
        <defs>
          <linearGradient id="clothG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={UNIFORM.light} />
            <stop offset="1" stopColor={UNIFORM.cloth} />
          </linearGradient>
        </defs>
        <g transform="translate(200 98) scale(1.25) translate(-200 -98)">
          <path d="M146 36 Q142 -38 200 -38 Q258 -38 254 36 L270 120 Q238 110 232 78 L168 78 Q162 110 130 120Z" fill={UNIFORM.hair} />
          <rect x="168" y="80" width="64" height="44" rx="16" fill={UNIFORM.skin} />
          <ellipse cx="200" cy="32" rx="50" ry="62" fill={UNIFORM.skin} />
          <path d="M150 36 Q146 -32 200 -34 Q254 -32 250 36 Q240 4 208 0 Q172 2 150 36Z" fill={UNIFORM.hair} />
        </g>
        <path d="M14 180 L66 208 L60 300 L6 300Z" fill={UNIFORM.skin} />
        <path d="M66 208 L60 300 L44 300 L52 202Z" fill={UNIFORM.skinShade} opacity=".45" />
        <path d="M386 180 L334 208 L340 300 L394 300Z" fill={UNIFORM.skin} />
        <path d="M334 208 L340 300 L356 300 L348 202Z" fill={UNIFORM.skinShade} opacity=".45" />
        <path d="M128 90 Q200 108 272 90 L338 106 Q330 160 322 208 Q300 250 292 300 L108 300 Q100 250 78 208 Q70 160 62 106Z" fill="url(#clothG)" />
        <path d="M78 208 Q100 250 108 300 L138 300 Q130 250 100 214Z" fill={UNIFORM.shade} opacity=".55" />
        <path d="M322 208 Q300 250 292 300 L262 300 Q270 250 300 214Z" fill={UNIFORM.shade} opacity=".55" />
        <path d="M128 232 Q142 262 140 298 M272 232 Q258 262 260 298" stroke={UNIFORM.shade} strokeWidth="2" fill="none" opacity=".8" />
        <path d="M62 106 L14 180 L66 208 L80 206 L90 122Z" fill={UNIFORM.cloth} stroke={UNIFORM.shade} strokeWidth="2" strokeLinejoin="round" />
        <path d="M338 106 L386 180 L334 208 L320 206 L310 122Z" fill={UNIFORM.cloth} stroke={UNIFORM.shade} strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 180 L66 208 M386 180 L334 208" stroke={UNIFORM.trim} strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M154 90 Q200 112 246 90 L200 146Z" fill={UNIFORM.skin} />
        <ellipse cx="200" cy="101" rx="32" ry="8" fill={UNIFORM.skinShade} opacity=".5" />
        <path d="M156 88 L200 146 L176 154 L128 108Z" fill={UNIFORM.shade} stroke={UNIFORM.trim} strokeWidth="3" strokeLinejoin="round" />
        <path d="M244 88 L200 146 L224 154 L272 108Z" fill={UNIFORM.shade} stroke={UNIFORM.trim} strokeWidth="3" strokeLinejoin="round" />
        <rect x="191" y="148" width="18" height="152" fill={UNIFORM.trim} />
        <path d="M191 148 V300 M209 148 V300" stroke={UNIFORM.trimDark} strokeWidth="2" />
        <circle cx="200" cy="176" r="4.5" fill={UNIFORM.cloth} stroke={UNIFORM.trimDark} strokeWidth="2" />
        <circle cx="200" cy="216" r="4.5" fill={UNIFORM.cloth} stroke={UNIFORM.trimDark} strokeWidth="2" />
        <circle cx="200" cy="256" r="4.5" fill={UNIFORM.cloth} stroke={UNIFORM.trimDark} strokeWidth="2" />
        <path d="M126 166 h30 v14 q0 10 -15 14 q-15 -4 -15 -14z" fill={UNIFORM.cloth} stroke={UNIFORM.trim} strokeWidth="2.5" />
        <circle cx="141" cy="176" r="3.5" fill={UNIFORM.trim} />
      </svg>

      {/* Order matters: the CSS uses sibling selectors (.pin.on ~ .tag) */}
      <button
        className={`pin${step >= 1 ? ' on' : ''}`}
        onClick={onPin}
        aria-label="Pin the SUNN pin on her lapel"
      >
        <img src={logo} alt="SUNN logo" />
      </button>

      <button
        className={`tag${step >= 2 ? ' on' : ''}`}
        onClick={onTag}
        aria-label="Pin the name tag"
      >
        <span className="tag-text">
          <span>{name}</span>
          <small>{course}</small>
        </span>
      </button>

      <div className="hint" style={{ opacity: step >= 2 ? 0 : 1 }}>
        {hint}
      </div>
    </div>
  )
}
