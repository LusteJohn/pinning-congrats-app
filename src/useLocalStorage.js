import { useEffect, useState } from 'react'

// Reads a JSON value from localStorage once, then persists on every change.
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw == null ? initial : JSON.parse(raw)
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage full or blocked - fail silently */
    }
  }, [key, value])

  return [value, setValue]
}
