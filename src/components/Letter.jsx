export default function Letter({ to, from }) {
  return (
    <section>
      <h2>A note from me</h2>
      <div className="letter">
        {'I watched you study late, doubt yourself, and then do it anyway. Every student in your internship classroom is going to be lucky to have you, because you make people feel like they can do hard things.\n\n'}
        {'So today I’m not just clapping for the pin and your deployment. I’m clapping for every late night, every requirement, and all the effort nobody saw.\n\n'}
        {`Go shine in your internship. I’m so proud of you, ${to}. 💛`}
      </div>
      <div className="sign">with all my love and support, {from} ✏️</div>
    </section>
  )
}
