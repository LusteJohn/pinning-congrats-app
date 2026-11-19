import { useEffect, useRef, useState } from 'react'
import Confetti from './components/Confetti.jsx'
import PinStage from './components/PinStage.jsx'
import ReportCard from './components/ReportCard.jsx'
import StickerBoard from './components/StickerBoard.jsx'
import Letter from './components/Letter.jsx'
import useLocalStorage from './useLocalStorage.js'

const LINES = [
  'Officially pinned and deployed! 🎓',
  'Your internship classroom is waiting for you. 🍎',
  'Chalk dust is going to look good on you. ✨',
]

export default function App() {
  const [herInput, setHerInput] = useLocalStorage('pinning.her', 'Zenneth Cellon')
  const [meInput, setMeInput] = useLocalStorage('pinning.me', 'My Programmer')
  const [courseInput, setCourseInput] = useLocalStorage('pinning.course', 'BTLED-ICT')
  const [step, setStep] = useState(0)
  const [verdict, setVerdict] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [cardPulse, setCardPulse] = useState(false)
  const fx = useRef(null)
  const revealRef = useRef(null)

  const her = herInput.trim() || 'Future Teacher'
  const me = meInput.trim() || 'Me'
  const course = courseInput.trim() || 'BTLED-ICT'

  // Reveal the rest of the story once the pinning ceremony is complete.
  const revealed = step >= 2

  const pinLogo = () => {
    if (step !== 0) return
    setStep(1)
    setTimeout(() => {
      fx.current?.burst(60)
      setVerdict('SUNN pin is on. Now pin the name tag! 🏷️')
    }, 900)
  }

  const pinTag = () => {
    if (step !== 1) return
    setStep(2)
    // Show the final verdict and confetti after the pin lands.
    setTimeout(() => {
      fx.current?.burst(180)
      setVerdict(LINES[0])
    }, 900)
  }

  const again = () => {
    const next = (lineIdx + 1) % LINES.length
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

  // Scroll the reveal into view only after the confetti (900ms burst + settle) has played.
  useEffect(() => {
    if (!revealed) return
    const t = setTimeout(() => {
      revealRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 2500)
    return () => clearTimeout(t)
  }, [revealed])

  return (
    <>
      <Confetti ref={fx} />
      <main>
        <details className="bar" open>
          <summary>Personalize ✏️</summary>
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

            <button className="go" onClick={again}>Celebrate again 🎊</button>
            <footer>Go get ’em, intern. Date is already set on December 10th, during Lights On in Sagay City. 🥂</footer>
          </div>
        )}
      </main>
    </>
  )
}
