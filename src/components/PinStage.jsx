import { useRef, useState } from 'react'
import logo from '../assets/sunn-logo.png'

// Uniform colors, matched to the photo: cream top with orange-gold trim.
const UNIFORM = {
  light: '#f8efd4',
  cloth: '#f1e3bd',
  shade: '#e3d1a0',
  trim: '#e8a23a',
  trimDark: '#c47f1c',
  skin: '#e2b08a',
  skinShade: '#cf9468',
  skinLight: '#f2c6a2',
  hair: '#2b1b17',
  hairHi: '#5b3b30',
  blush: '#ef9d86',
}

// Pinned positions over the 400x386 SVG stage: SUNN pin on chest, name tag underneath.
const PINNED_PIN_STYLE = {
  left: '62.5%',
  top: '62.0%',
  width: 'clamp(28px, 7.5%, 48px)',
  aspectRatio: '1 / 1',
  padding: 0,
  transform: 'translate(-50%, -50%)',
}

const PINNED_TAG_STYLE = {
  left: '63.5%',
  top: '74.5%',
  padding: '4px 8px',
  fontSize: 'clamp(9px, 2.3vw, 13px)',
  lineHeight: 1.15,
  transform: 'translate(-50%, -50%)',
}

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

// step 0 = nothing pinned, 1 = SUNN logo pinned, 2 = name tag pinned too
export default function PinStage({ step, name, course, onPin, onTag }) {
  const hint = step === 0 ? 'tap the SUNN pin 👆' : 'now tap the name tag 👆'
  const stageRef = useRef(null)
  const dragRef = useRef(null)
  const [tagPos, setTagPos] = useState(null)

  // Once pinned, the name tag can be dragged around the stage.
  const startDrag = (e) => {
    if (step < 2) return
    dragRef.current = { id: e.pointerId }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const handleTagClick = (e) => {
    e.stopPropagation()
    onTag?.()
  }

  const moveDrag = (e) => {
    if (!dragRef.current || !stageRef.current) return
    const r = stageRef.current.getBoundingClientRect()
    setTagPos({
      x: clamp(((e.clientX - r.left) / r.width) * 100, 12, 88),
      y: clamp(((e.clientY - r.top) / r.height) * 100, 12, 88),
    })
  }

  const endDrag = (e) => {
    if (!dragRef.current) return
    dragRef.current = null
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  const isPinActive = step >= 1
  const isTagActive = step >= 2

  const pinStyle = isPinActive ? PINNED_PIN_STYLE : undefined

  const tagStyle = isTagActive
    ? {
        ...PINNED_TAG_STYLE,
        ...(tagPos ? { left: `${tagPos.x}%`, top: `${tagPos.y}%`, transition: 'none' } : null),
      }
    : undefined

  return (
    <div className="stage" ref={stageRef} data-step={step}>
      <svg viewBox="0 -86 400 386" aria-hidden="true">
        <defs>
          <linearGradient id="clothG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={UNIFORM.light} />
            <stop offset="1" stopColor={UNIFORM.cloth} />
          </linearGradient>
          <radialGradient id="skinG" cx="50%" cy="38%" r="62%">
            <stop offset="0" stopColor={UNIFORM.skinLight} />
            <stop offset="1" stopColor={UNIFORM.skin} />
          </radialGradient>
        </defs>

        {/* soft grounding shadow */}
        <ellipse cx="200" cy="292" rx="124" ry="10" fill="#000" opacity=".16" />

        {/* back hair, neck and face */}
        <g transform="translate(200 72) rotate(-2.5) scale(1.06) translate(-200 -62)">
          <path
            d="M148 24 Q146 -44 200 -44 Q254 -44 252 24 L268 106 Q234 96 228 68 L172 68 Q166 96 132 106Z"
            fill={UNIFORM.hair}
          />
          {/* neck */}
          <path
            d="M177 64 L223 64 L227 112 Q200 120 173 112Z"
            fill={UNIFORM.skin}
          />
          <path
            d="M176 68 Q200 84 224 68 L225 80 Q200 94 175 80Z"
            fill={UNIFORM.skinShade}
            opacity=".38"
          />
          {/* ears */}
          <ellipse cx="151" cy="28" rx="6.5" ry="10" fill={UNIFORM.skin} />
          <ellipse cx="249" cy="28" rx="6.5" ry="10" fill={UNIFORM.skin} />
          {/* face */}
          <ellipse cx="200" cy="22" rx="48" ry="58" fill="url(#skinG)" />
          {/* brows */}
          <path d="M172 15 Q182 10 191 14" stroke={UNIFORM.hair} strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M209 14 Q218 10 228 15" stroke={UNIFORM.hair} strokeWidth="3.2" fill="none" strokeLinecap="round" />

          {/* dark rectangular glasses */}
          <g fill="none" strokeLinejoin="round">
            <path d="M159 20 H193 V37 Q193 41 188 41 H164 Q159 41 159 37 Z" fill="#fff" fillOpacity=".14" stroke="none" />
            <path d="M207 20 H241 V37 Q241 41 236 41 H212 Q207 41 207 37 Z" fill="#fff" fillOpacity=".14" stroke="none" />
            <path
              d="M157 18 H194 V37 Q194 42.5 188.5 42.5 H163.5 Q157 42.5 157 37 Z"
              stroke="#2c2d2e"
              strokeWidth="4.2"
            />
            <path
              d="M206 18 H243 V37 Q243 42.5 237.5 42.5 H212.5 Q206 42.5 206 37 Z"
              stroke="#2c2d2e"
              strokeWidth="4.2"
            />
            <path d="M194 21 Q200 18.5 206 21" stroke="#2c2d2e" strokeWidth="4.4" strokeLinecap="round" />
            <path d="M157 21 L148 23" stroke="#2c2d2e" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M243 21 L252 23" stroke="#2c2d2e" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M164 23 L172 36" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" opacity=".45" />
            <path d="M212 23 L220 36" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" opacity=".45" />
          </g>

          {/* cheek blush */}
          <ellipse cx="169" cy="46" rx="8.5" ry="5" fill={UNIFORM.blush} opacity=".32" />
          <ellipse cx="231" cy="46" rx="8.5" ry="5" fill={UNIFORM.blush} opacity=".32" />

          {/* front hair & highlight */}
          <path
            d="M152 24 Q148 -38 200 -40 Q252 -38 248 24 Q238 -6 208 -10 Q173 -8 152 24Z"
            fill={UNIFORM.hair}
          />
          <path d="M167 -3 Q185 -22 206 -24" stroke={UNIFORM.hairHi} strokeWidth="4.8" fill="none" strokeLinecap="round" opacity=".5" />
        </g>

        {/* arms — curved upper arm, subtle elbow bend, and tapered forearm */}
        <path
          d="M84 134 Q60 172 52 216 Q48 256 54 300 L86 300 Q82 258 84 220 Q88 184 102 152Z"
          fill={UNIFORM.skin}
        />
        <path
          d="M68 214 Q66 256 70 300 L86 300 Q82 258 84 220Z"
          fill={UNIFORM.skinShade}
          opacity=".36"
        />

        <path
          d="M316 134 Q340 172 348 216 Q352 256 346 300 L314 300 Q318 258 316 220 Q312 184 298 152Z"
          fill={UNIFORM.skin}
        />
        <path
          d="M332 214 Q334 256 330 300 L314 300 Q318 258 316 220Z"
          fill={UNIFORM.skinShade}
          opacity=".36"
        />

        {/* torso — fitted bust, cinched waist, and flared hip curve */}
        <path
          d="M150 106 Q200 120 250 106 L322 124 Q310 166 286 196 Q272 214 276 236 Q284 268 294 300 L106 300 Q116 268 124 236 Q128 214 114 196 Q90 166 78 124Z"
          fill="url(#clothG)"
        />
        {/* waist & bust shading to accentuate curve */}
        <path
          d="M94 166 Q116 196 124 232 Q116 268 106 300 L136 300 Q144 266 138 230 Q130 194 110 164Z"
          fill={UNIFORM.shade}
          opacity=".46"
        />
        <path
          d="M306 166 Q284 196 276 232 Q284 268 294 300 L264 300 Q256 266 262 230 Q270 194 290 164Z"
          fill={UNIFORM.shade}
          opacity=".46"
        />
        {/* subtle bust & waist contour lines */}
        <path
          d="M126 188 Q154 202 182 194 M274 188 Q246 202 218 194"
          stroke={UNIFORM.shade}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          opacity=".65"
        />

        {/* sleeves — snug around the arm contour with clean gold trim */}
        <path
          d="M80 126 Q58 158 50 188 L82 200 Q92 172 102 146Z"
          fill={UNIFORM.cloth}
          stroke={UNIFORM.shade}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M320 126 Q342 158 350 188 L318 200 Q308 172 298 146Z"
          fill={UNIFORM.cloth}
          stroke={UNIFORM.shade}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M50 188 L82 200 M350 188 L318 200"
          stroke={UNIFORM.trim}
          strokeWidth="8.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* neckline + collar */}
        <path d="M166 106 Q200 122 234 106 L200 156Z" fill={UNIFORM.skin} />
        <ellipse cx="200" cy="113" rx="26" ry="6.5" fill={UNIFORM.skinShade} opacity=".4" />
        <path
          d="M168 104 L200 156 L178 162 L138 120Z"
          fill={UNIFORM.shade}
          stroke={UNIFORM.trim}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M232 104 L200 156 L222 162 L262 120Z"
          fill={UNIFORM.shade}
          stroke={UNIFORM.trim}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M180 108 L200 124 L220 108" stroke={UNIFORM.trimDark} strokeWidth="1.6" fill="none" opacity=".5" />

        {/* placket + buttons */}
        <rect x="191" y="158" width="18" height="142" fill={UNIFORM.trim} />
        <path d="M191 158 V300 M209 158 V300" stroke={UNIFORM.trimDark} strokeWidth="2" />
        <circle cx="200" cy="184" r="4" fill={UNIFORM.cloth} stroke={UNIFORM.trimDark} strokeWidth="2" />
        <circle cx="200" cy="222" r="4" fill={UNIFORM.cloth} stroke={UNIFORM.trimDark} strokeWidth="2" />
        <circle cx="200" cy="260" r="4" fill={UNIFORM.cloth} stroke={UNIFORM.trimDark} strokeWidth="2" />

        {/* chest pocket with pens */}
        <path
          d="M132 174 h28 v13 q0 9 -14 13 q-14 -4 -14 -13z"
          fill={UNIFORM.cloth}
          stroke={UNIFORM.trim}
          strokeWidth="2.5"
        />
        <rect x="138" y="162" width="4" height="17" rx="2" fill="#2f5aa8" />
        <rect x="145" y="158" width="4" height="21" rx="2" fill="#d7263d" />
        <circle cx="146" cy="183" r="3" fill={UNIFORM.trim} />

        {/* fabric highlight + folds */}
        <path d="M156 136 Q148 188 156 248" stroke="#fff" strokeWidth="7" fill="none" opacity=".16" strokeLinecap="round" />
        <path d="M252 138 Q260 190 252 248" stroke={UNIFORM.shade} strokeWidth="2" fill="none" opacity=".35" strokeLinecap="round" />
        <path d="M124 300 Q132 270 126 242" stroke={UNIFORM.shade} strokeWidth="2" fill="none" opacity=".3" strokeLinecap="round" />
        <path d="M276 300 Q268 270 274 242" stroke={UNIFORM.shade} strokeWidth="2" fill="none" opacity=".3" strokeLinecap="round" />
      </svg>

      {/* Tag visibility is driven by the stage's data-step attribute in CSS */}
      <button
        className={`pin${isPinActive ? ' on' : ''}`}
        style={pinStyle}
        onClick={onPin}
        aria-label="Pin the SUNN pin on her chest"
      >
        <img
          src={logo}
          alt="SUNN logo"
          style={isPinActive ? { width: '100%', height: '100%', objectFit: 'contain', display: 'block' } : undefined}
        />
      </button>

      <button
        className={`tag${isTagActive ? ' on' : ''}`}
        style={tagStyle}
        onClick={handleTagClick}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        aria-label="Pin the name tag"
      >
        <span
          className="tag-text"
          style={isTagActive ? { display: 'flex', flexDirection: 'column', alignItems: 'center' } : undefined}
        >
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