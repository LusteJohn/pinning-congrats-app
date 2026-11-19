import useReveal from '../useReveal.js'

export default function Letter({ to, from }) {
  const [ref, shown] = useReveal()

  return (
    <section ref={ref} className={`sec-letter enter${shown ? ' in' : ''}`}>
      <h2>A note from me</h2>
      <div className="letter">
        {"Even though we've only known each other for almost two months and I've only been a small part of your college journey, I watched you study late, doubt yourself, and then do it anyway. Every student in your internship classroom is going to be lucky to have you, because you make people feel like they can do hard things.\n\n"}
        {'So today I’m not just clapping for the pin and your deployment. I’m clapping for every late night, every requirement, and all the effort nobody saw.\n\n'}
        {`Go shine in your internship. I’m so proud of you, ${to}. 💛`}
      </div>
      <div className="sign">with all my love and support LabLabb, {from} ✏️</div>
    </section>
  )
}