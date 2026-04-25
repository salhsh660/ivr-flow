import { useEffect, useRef } from 'react'
import { useApp } from '../store'

export default function AudioPlayer() {
  const flow = useApp((s) => s.activeFlow())
  const playingId = useApp((s) => s.playingNodeId)
  const setPlaying = useApp((s) => s.setPlayingNode)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) return
    const audio = audioRef.current
    if (!playingId) {
      audio.pause()
      audio.currentTime = 0
      return
    }
    const node = flow?.nodes.find((n) => n.id === playingId)
    if (!node?.audioFile) {
      setPlaying(null)
      return
    }
    audio.src = node.audioFile
    audio.play().catch(() => {
      // fallback: file missing (mock mode) — auto-stop
      setTimeout(() => setPlaying(null), 1500)
    })
  }, [playingId, flow, setPlaying])

  return (
    <audio
      ref={audioRef}
      onEnded={() => setPlaying(null)}
      onError={() => setPlaying(null)}
      style={{ display: 'none' }}
    />
  )
}
