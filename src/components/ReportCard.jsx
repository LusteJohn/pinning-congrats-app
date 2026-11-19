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

export default function ReportCard({ name }) {
  // Stagger the rows only once the card is actually on screen.
  const [ref, shown] = useReveal()

  return (
    <section ref={ref} className={`sec-card enter${shown ? ' in' : ''}`}>
      <h2>Your final report card</h2>
      <div className="card">
        <h3>Student: {name}</h3>
        <ul className={`rows${shown ? ' show' : ''}`}>
          {ROWS.map(([subject, grade], i) => (
            <li className="row" key={subject} style={{ animationDelay: `${i * 0.35}s` }}>
              <span>{subject}</span>
              <span className="grade">{grade}</span>
            </li>
          ))}
        </ul>
        <p className="note">Teacher’s comment: ready for deployment. Passed with flying colours. 🎉</p>
      </div>
    </section>
  )
}