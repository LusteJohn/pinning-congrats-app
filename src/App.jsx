import { useRef, useState } from 'react'
import Confetti from './components/Confetti.jsx'
import PinStage from './components/PinStage.jsx'
import ReportCard from './components/ReportCard.jsx'
import StickerBoard from './components/StickerBoard.jsx'
import Letter from './components/Letter.jsx'

const LINES = [
  'Officially pinned and deployed! 🎓',
  'Your internship classroom is waiting for you. 🍎',
  'Chalk dust is going to look good on you. ✨',
]

export default function App() {
  const [herInput, setHerInput] = useState('Zenneth Cellon')
  const [meInput, setMeInput] = useState('My Programmer')
  const [courseInput, setCourseInput] = useState('BTLED-ICT')
  const [step, setStep] = useState(0)
  const [verdict, setVerdict] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const fx = useRef(null)

  const her = herInput.trim() || 'Future Teacher'
  const me = meInput.trim() || 'Me'
  const course = courseInput.trim() || 'BTLED-ICT'

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
    setTimeout(() => {
      fx.current?.burst(180)
      setVerdict(LINES[0])
    }, 900)
  }

  const again = () => {
    const next = (lineIdx + 1) % LINES.length
    fx.current?.burst(220)
    setLineIdx(next)
    setVerdict(LINES[next])
  }

  return (
    <>
      <Confetti ref={fx} />
      <main>
        <div className="bar">
          <label>
            Her name
            <input value={herInput} maxLength={30} autoComplete="off" onChange={(e) => setHerInput(e.target.value)} />
          </label>
          <label>
            Your name
            <input value={meInput} maxLength={30} autoComplete="off" onChange={(e) => setMeInput(e.target.value)} />
          </label>
          <label>
            Course
            <input value={courseInput} maxLength={20} autoComplete="off" onChange={(e) => setCourseInput(e.target.value)} />
          </label>
        </div>

        <h1>
          Congrats, <span>{her}</span>!
        </h1>
        <p className="sub">Pinning and deployment day is here. Tap the SUNN pin to make it official.</p>

        <PinStage step={step} name={her} course={course} onPin={pinLogo} onTag={pinTag} />
        <div className="verdict" aria-live="polite">{verdict}</div>

        <ReportCard name={her} />
        <StickerBoard />
        <Letter to={her} from={me} />

        <button className="go" onClick={again}>Celebrate again 🎊</button>
        <footer>Go get ’em, intern. Dinner is on me after your first week. 🥂</footer>
      </main>
    </>
  )
}
