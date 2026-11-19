import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const COLORS = ['#ffc233', '#ff4d6d', '#7fd3ff', '#ff9ecb', '#9dff9d', '#ffffff']
const EMOJI = ['🎉', '🍎', '⭐', '📚', '✏️', '🎓', '💛', '🌟']

// Full-screen canvas. Call ref.current.burst(count) to fire confetti.
const Confetti = forwardRef(function Confetti(_, ref) {
  const canvasRef = useRef(null)
  const parts = useRef([])
  const raf = useRef(0)

  useEffect(() => {
    const cv = canvasRef.current
    const fit = () => {
      cv.width = window.innerWidth
      cv.height = window.innerHeight
    }
    fit()
    window.addEventListener('resize', fit)
    return () => {
      window.removeEventListener('resize', fit)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const tick = () => {
    const cv = canvasRef.current
    const cx = cv.getContext('2d')
    cx.clearRect(0, 0, cv.width, cv.height)
    parts.current = parts.current.filter((p) => p.y < cv.height + 40 && p.life < 300)
    for (const p of parts.current) {
      p.vy += 0.35
      p.vx *= 0.99
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      p.life++
      cx.save()
      cx.translate(p.x, p.y)
      cx.rotate(p.rot)
      if (p.emoji) {
        cx.font = '24px serif'
        cx.fillText(p.emoji, -12, 8)
      } else {
        cx.fillStyle = p.color
        cx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r)
      }
      cx.restore()
    }
    raf.current = parts.current.length ? requestAnimationFrame(tick) : 0
    if (!raf.current) cx.clearRect(0, 0, cv.width, cv.height)
  }

  useImperativeHandle(ref, () => ({
    burst(count = 150) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const { width, height } = canvasRef.current
      for (let i = 0; i < count; i++) {
        parts.current.push({
          x: width / 2 + (Math.random() - 0.5) * width * 0.5,
          y: height * 0.55,
          vx: (Math.random() - 0.5) * 14,
          vy: -Math.random() * 16 - 6,
          r: Math.random() * 6 + 4,
          color: COLORS[i % COLORS.length],
          emoji: Math.random() < 0.25 ? EMOJI[i % EMOJI.length] : null,
          rot: Math.random() * 6,
          vr: (Math.random() - 0.5) * 0.3,
          life: 0,
        })
      }
      if (!raf.current) raf.current = requestAnimationFrame(tick)
    },
  }))

  return <canvas id="fx" ref={canvasRef} aria-hidden="true" />
})

export default Confetti
