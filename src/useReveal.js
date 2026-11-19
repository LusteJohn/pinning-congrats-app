import { useEffect, useRef, useState } from 'react'

// Fires once when the element first scrolls into view.
export default function useReveal(threshold = 0.2) {
  const ref = useRef(null)
  // Reduced-motion users get the content immediately: no reveal transition.
  const [shown, setShown] = useState(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, shown])

  return [ref, shown]
}
