// Lightweight celebration chimes built with the Web Audio API - no asset files.
// Audio needs a user gesture, and every call here happens inside a click handler.

let ctx = null

function getCtx() {
  if (typeof window === 'undefined') return null
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return null
  if (!ctx) ctx = new AudioCtx()
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

// A single bell-ish note: sine fundamental plus a quiet octave, soft attack.
function note(audio, { freq, start, duration = 0.42, gain = 0.16, type = 'sine' }) {
  const osc = audio.createOscillator()
  const env = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)

  env.gain.setValueAtTime(0.0001, start)
  env.gain.exponentialRampToValueAtTime(gain, start + 0.02)
  env.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  osc.connect(env)
  env.connect(audio.destination)
  osc.start(start)
  osc.stop(start + duration + 0.05)

  // Quiet octave shimmer.
  const shimmer = audio.createOscillator()
  const shimmerEnv = audio.createGain()
  shimmer.type = 'sine'
  shimmer.frequency.setValueAtTime(freq * 2, start)
  shimmerEnv.gain.setValueAtTime(0.0001, start)
  shimmerEnv.gain.exponentialRampToValueAtTime(gain * 0.28, start + 0.02)
  shimmerEnv.gain.exponentialRampToValueAtTime(0.0001, start + duration * 0.7)
  shimmer.connect(shimmerEnv)
  shimmerEnv.connect(audio.destination)
  shimmer.start(start)
  shimmer.stop(start + duration + 0.05)
}

// Short, bright two-note confirmation for a single pin.
export function playPin(muted) {
  if (muted) return
  const audio = getCtx()
  if (!audio) return
  const now = audio.currentTime + 0.01
  note(audio, { freq: 784, start: now, duration: 0.3, gain: 0.12 })
  note(audio, { freq: 1046.5, start: now + 0.09, duration: 0.4, gain: 0.11 })
}

// Bigger rising arpeggio for the finished ceremony / celebrate-again.
export function playCelebrate(muted) {
  if (muted) return
  const audio = getCtx()
  if (!audio) return
  const now = audio.currentTime + 0.01
  const melody = [523.25, 659.25, 783.99, 1046.5, 1318.5]
  melody.forEach((freq, i) => {
    note(audio, { freq, start: now + i * 0.1, duration: 0.5, gain: 0.1 })
  })
  note(audio, { freq: 1567.98, start: now + 0.52, duration: 0.85, gain: 0.08 })
}
