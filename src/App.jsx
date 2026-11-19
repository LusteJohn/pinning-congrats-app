import { useEffect, useRef, useState } from 'react'
import Confetti, { BURST_SETTLE_MS } from './components/Confetti.jsx'
import PinStage from './components/PinStage.jsx'
import ReportCard from './components/ReportCard.jsx'
import StickerBoard from './components/StickerBoard.jsx'
import Letter from './components/Letter.jsx'
import ScrollSeal from './components/ScrollSeal.jsx'
import ChalkDoodles from './components/ChalkDoodles.jsx'
import useLocalStorage from './useLocalStorage.js'
import { playCelebrate, playPin } from './celebrate.js'

const LINES = [
  'Officially pinned and deployed! ??',
  'Your internship classroom is waiting for you. ??',
  'Chalk dust is going to look good on you. ?',
]

export default function App() {
  const [herInput, setHerInput] = useLocalStorage('pinning.her', 'Zenneth Cellon')
  const [meInput, setMeInput] = useLocalStorage('pinning.me', 'My Programmer')
  const [courseInput, setCourseInput] = useLocalStorage('pinning.course', 'BTLED-ICT')
  const [muted, setMuted] = useLocalStorage('pinning.muted', false)
  const [step, setStep] = useState(0)
  const [showReveal, setShowReveal] = useState(false)
  const [verdict, setVerdict] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [cardPulse, setCardPulse] = useState(false)
  const fx = useRef(null)
  const revealRef = useRef(null)
  const revealTimer = useRef(0)

  const her = herInput.trim() || 'Future Teacher'
  const me = meInput.trim() || 'Me'
  const course = courseInput.trim() || 'BTLED-ICT'

  // Reveal the rest of the story once the pinning ceremony is complete.
  const revealed = showReveal

  const pinLogo = () => {
    if (step !== 0) return
    setStep(1)
    playPin(muted)
    setTimeout(() => {
      fx.current?.burst(60)
      setVerdict('SUNN pin is on. Now pin the name tag! ???')
    }, 900)
  }

  const pinTag = () => {
    if (step !== 1) return
    // Land the tag, then fire the finale. Reveal is guaranteed: whichever of the
    // confetti callback or the fallback timer fires first wins.
    setTimeout(() => {
      setStep(2)
      playCelebrate(muted)
      setVerdict(LINES[0])
      revealTimer.current = window.setTimeout(() => setShowReveal(true), BURST_SETTLE_MS + 1200)
      fx.current?.burst(180, {
        onDone: () => setShowReveal(true),
      })
    }, 900)
  }

  const again = () => {
    const next = (lineIdx + 1) % LINES.length
    playCelebrate(muted)
    fx.current?.burst(120)
    setLineIdx(next)
    setVerdict(LINES[next])
    setCardPulse(true)
  }

  // Clear the pulse flag so it can retrigger on the next press.
  useEffect(() => {
    if (!cardPulse) return
    const t = setTimeout(() => setCardPulse(false), 700)
    return () => clearTimeout(t)
  }, [cardPulse])

  // Scroll the reveal into view once it mounts (confetti already settled).
  useEffect(() => {
    if (!showReveal) return
    const t = setTimeout(() => {
      revealRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
    return () => clearTimeout(t)
  }, [showReveal])

  useEffect(() => () => clearTimeout(revealTimer.current), [])

  return (
    <>
      <div className="chalk-bg" aria-hidden="true">
        <span className="cb cb-1">Class of 2027 ??</span>
        <span className="cb cb-2">PINNING DAY ?</span>
        <span className="cb cb-3">You did it!</span>
        <span className="cb cb-4">A+ in everything</span>
        <span className="cb cb-5">Deployment unlocked ??</span>
        <span className="cb cb-6">Chalk dust &amp; dreams</span>
        <span className="cb cb-7">Future teacher ?</span>
        <span className="cb cb-8">Summa cum laude soon</span>
        <span className="cb cb-9">?? ?? ??</span>
        <span className="cb cb-10">A++ ?</span>
      </div>
      <ChalkDoodles />
      <Confetti ref={fx} />
      <ScrollSeal />
      <main className="paper">
        <details className="bar" open>
          <summary>Personalize ??</summary>
          <div className="bar-fields">
            <label>
              Your name
              <input value={herInput} maxLength={30} autoComplete="off" onChange={(e) => setHerInput(e.target.value)} />
            </label>
            <label>
              His name
              <input value={meInput} maxLength={30} autoComplete="off" onChange={(e) => setMeInput(e.target.value)} />
            </label>
            <label>
              Course
              <input value={courseInput} maxLength={20} autoComplete="off" onChange={(e) => setCourseInput(e.target.value)} />
            </label>
          </div>
        </details>

        <h1>
          Congrats, <span>{her}!</span>
        </h1>
        <p className="sub">Pinning and deployment day is here. Tap the SUNN pin to make it official.</p>

        <PinStage step={step} name={her} course={course} onPin={pinLogo} onTag={pinTag} />
        <div className="verdict" aria-live="polite">{verdict}</div>

        {revealed && (
          <div ref={revealRef} className="reveal">
            <div className={cardPulse ? 'pulse' : undefined}>
              <ReportCard name={her} />
            </div>
            <StickerBoard />
            <Letter to={her} from={me} />

            <button className="go" onClick={again}>Celebrate Again</button>
            <footer>Go get �em, intern. Date is already set on December 10th, during Lights On in Sagay City.</footer>
          </div>
        )}
      </main>

      <button
        className="sound-toggle"
        onClick={() => setMuted((m) => !m)}
        aria-pressed={muted}
        aria-label={muted ? 'Unmute celebration sounds' : 'Mute celebration sounds'}
        title={muted ? 'Unmute celebration sounds' : 'Mute celebration sounds'}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 9.5 H8 L13 5 V19 L8 14.5 H4 Z" fill="currentColor" />
          {muted ? (
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M16.5 9.5 L21 14" />
              <path d="M21 9.5 L16.5 14" />
            </g>
          ) : (
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
              <path d="M16 8.5 Q18.5 12 16 15.5" />
              <path d="M18.5 6 Q22.5 12 18.5 18" opacity=".6" />
            </g>
          )}
        </svg>
        <span className="sr-only">{muted ? 'Sound off' : 'Sound on'}</span>
      </button>
    </>
  )
}
