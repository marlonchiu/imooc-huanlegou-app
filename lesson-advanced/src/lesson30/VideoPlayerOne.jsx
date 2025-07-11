import { useRef } from 'react'

function VideoPlayerOne({ src, isPlaying }) {
  const ref = useRef(null)

  if (isPlaying) {
    ref.current.play()
  } else {
    ref.current.pause()
  }

  return <video ref={ref} src={src} loop />
}

export default VideoPlayerOne
