import useReveal from '../useReveal.js'

const ROWS = [
  ['Patience with tiny humans, in a way.', 'A+++'],
  ['Surviving every exam and requirement', 'A+'],
  ['Explaining it one more time, kindly', 'A++'],
  ['Lesson plans at late night', 'A+'],
  ['Nailing your microdemo', 'A+++'],
  ['Completed FS and all the requirements', 'A+++'],
  ['Acing the final defense', 'A+++'],
  ['Making me proud', 'off the chart'],
]

const SPARK = 'M0 -10 L2.4 -2.4 L10 0 L2.4 2.4 L0 10 L-2.4 2.4 L-10 0 L-2.4 -2.4 Z'

// Checkmark draws itself by sweeping the stroke dash offset.
function AnimatedCheck({ delay }) {
  return (
    <svg
      className="check"
      viewBox="0 0 36 36"
      width="26"
      height="26"
      role="img"
      aria-label="checked"
      style={{ animationDelay: `${delay}s` }}
    >
      <circle className="check-ring" cx="18" cy="18" r="15.5" />
      <circle className="check-fill" cx="18" cy="18" r="15.5" />
      <path className="check-tick" d="M10.5 18.5 L16 24 L26 13" />
    </svg>
  )
}

// Decorative animated doodles: sparkle, star pop, seal, and confetti bursts.
function Doodles() {
  return (
    <svg className="card-doodle" viewBox="0 0 340 60" aria-hidden="true">
      <g className="cdl-sparkle" fill="#d7263d">
        <path d={SPARK} transform="translate(16 30) scale(.9)" />
        <path d={SPARK} transform="translate(324 26) scale(.7)" style={{ animationDelay: '-1.2s' }} />
      </g>
      <g className="cdl-confetti">
        <rect x="60" y="14" width="6" height="6" rx="1.4" fill="#2f5aa8" transform="rotate(18 63 17)" />
        <rect x="146" y="8" width="5" height="5" rx="1.2" fill="#ffc233" transform="rotate(-22 148 10)" />
        <circle cx="208" cy="40" r="3.4" fill="#ff4d6d" />
        <rect x="268" y="34" width="6" height="6" rx="1.4" fill="#4f8a54" transform="rotate(-14 271 37)" />
        <circle cx="112" cy="48" r="2.8" fill="#e0709f" />
      </g>
      <g className="cdl-star" transform="translate(182 28)">
        <path
          d="M0 -14 L4 -4.4 L14 -4.4 L6 2.4 L9 12 L0 6 L-9 12 L-6 2.4 L-14 -4.4 L-4 -4.4 Z"
          fill="#ffc233"
          stroke="#c47f1c"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </g>
      <g className="cdl-seal" transform="translate(90 32)">
        <circle r="13" fill="#ff4d6d" opacity=".18" />
        <circle r="8" fill="none" stroke="#d7263d" strokeWidth="1.6" strokeDasharray="3 3" />
      </g>
    </svg>
  )
}

export default function ReportCard({ name }) {
  // Stagger the rows only once the card is actually on screen.
  const [ref, shown] = useReveal()

  return (
    <section ref={ref} className={`sec-card enter${shown ? ' in' : ''}`}>
      <div className="card-head">
        <h2>Your final report card</h2>
        <svg className="card-medal" viewBox="0 0 60 70" aria-hidden="true">
          {/* graduation cap resting above the medal */}
          <g className="card-cap">
            <path d="M30 4 L54 14 L30 24 L6 14 Z" fill="#2f5aa8" stroke="#1d3f7d" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M19 19 V27 Q30 33 41 27 V19" fill="#2f5aa8" stroke="#1d3f7d" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M30 14 L30 9" stroke="#c47f1c" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="30" cy="8" r="2" fill="#ffc233" />
            <path className="card-tassel" d="M50 13 V25" stroke="#ffc233" strokeWidth="1.8" strokeLinecap="round" />
            <circle className="card-tassel" cx="50" cy="26" r="2.2" fill="#ffc233" />
          </g>
          <path d="M22 34 L27 50 L33 50 L38 34 Z" fill="#ff4d6d" stroke="#c9314c" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M38 34 L33 50 L27 50 L22 34 Z" fill="#2f5aa8" opacity=".85" />
          <g className="card-medal-coin">
            <circle cx="30" cy="55" r="12.5" fill="#ffc233" stroke="#c47f1c" strokeWidth="1.8" />
            <circle cx="30" cy="55" r="8.6" fill="#ffe08a" />
            <path d={SPARK} transform="translate(30 55) scale(.5)" fill="#c47f1c" />
          </g>
        </svg>
      </div>

      <div className="card">
        <h3>Student: {name}</h3>

        <Doodles />

        <ul className={`rows${shown ? ' show' : ''}`}>
          {ROWS.map(([subject, grade], i) => {
            const delay = i * 0.35
            return (
              <li className="row" key={subject} style={{ animationDelay: `${delay}s` }}>
                <AnimatedCheck delay={delay + 0.18} />
                <span className="row-text">{subject}</span>
                <span className="grade">{grade}</span>
              </li>
            )
          })}
        </ul>
        <p className="note">Teacher’s comment: ready for deployment. Passed with flying colours. 🎉</p>
      </div>
    </section>
  )
}
