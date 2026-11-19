const ROWS = [
  ['Patience with tiny humans, in a way.', 'A+++'],
  ['Lesson plans at late night', 'A+'],
  ['Surviving every exam and requirement', 'A+'],
  ['Explaining it one more time, kindly', 'A++'],
  ['Acing the final defense', 'A+++'],
  ['Nailing your microdemo', 'A+++'],
  ['Making me proud', 'off the chart'],
]

export default function ReportCard({ name }) {
  return (
    <section>
      <h2>Your final report card</h2>
      <div className="card">
        <h3>Student: {name}</h3>
        <ul className="rows">
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
