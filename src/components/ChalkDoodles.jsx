import { useEffect, useState } from 'react'

// Chalk doodles along the page margins that scribble themselves in as the
// reader scrolls past their anchor position. Pure SVG dash-draw, no assets.
const DOODLES = [
  {
    id: 'arrow',
    x: '3%',
    y: 22,
    width: 74,
    viewBox: '0 0 74 60',
    paths: ['M6 46 C24 40 34 24 46 14', 'M46 14 L38 16', 'M46 14 L44 23'],
  },
  {
    id: 'heart',
    x: 'auto-right',
    y: 38,
    width: 62,
    viewBox: '0 0 62 56',
    paths: ['M31 48 C10 34 6 22 13 15 C20 8 28 12 31 19 C34 12 42 8 49 15 C56 22 52 34 31 48Z'],
  },
  {
    id: 'stars',
    x: '5%',
    y: 58,
    width: 78,
    viewBox: '0 0 78 54',
    paths: [
      'M14 30 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z',
      'M50 14 l2.2 6 6 2.2 -6 2.2 -2.2 6 -2.2 -6 -6 -2.2 6 -2.2Z',
      'M60 40 l1.8 5 5 1.8 -5 1.8 -1.8 5 -1.8 -5 -5 -1.8 5 -1.8Z',
    ],
  },
  {
    id: 'apple',
    x: 'auto-right',
    y: 72,
    width: 60,
    viewBox: '0 0 60 62',
    paths: [
      'M30 20 C18 12 8 20 9 32 C10 46 22 54 30 54 C38 54 50 46 51 32 C52 20 42 12 30 20Z',
      'M30 20 C30 14 32 8 38 5',
      'M36 12 C42 6 52 8 54 16 C46 18 39 17 36 12Z',
    ],
  },
  {
    id: 'swirl',
    x: '4%',
    y: 86,
    width: 70,
    viewBox: '0 0 70 60',
    paths: ['M8 50 C8 30 30 22 42 32 C52 40 46 52 36 50 C28 48 28 38 36 36 C42 34 48 38 48 44'],
  },
]

export default function ChalkDoodles() {
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setDrawn(true)
      return
    }
    const onFirstScroll = () => {
      setDrawn(true)
      window.removeEventListener('scroll', onFirstScroll)
    }
    window.addEventListener('scroll', onFirstScroll, { passive: true, once: true })
    return () => window.removeEventListener('scroll', onFirstScroll)
  }, [])

  return (
    <div className={`chalk-doodles${drawn ? ' drawn' : ''}`} aria-hidden="true">
      {DOODLES.map((d) => (
        <svg
          key={d.id}
          className={`cdoodle cdoodle-${d.id}`}
          viewBox={d.viewBox}
          style={{
            top: `${d.y}%`,
            width: `${d.width}px`,
            ...(d.x === 'auto-right' ? { right: '2%' } : { left: d.x }),
          }}
        >
          {d.paths.map((p, i) => (
            <path key={i} d={p} pathLength="1" style={{ animationDelay: `${i * 0.22}s` }} />
          ))}
        </svg>
      ))}
    </div>
  )
}
