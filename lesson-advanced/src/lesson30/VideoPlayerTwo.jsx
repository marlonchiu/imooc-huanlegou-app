import { useRef, useEffect } from 'react'

function VideoPlayerTwo({ src, isPlaying }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isPlaying) {
      ref.current.play()
    } else {
      ref.current.pause()
    }
  })

  return <video ref={ref} src={src} loop />
}

export default VideoPlayerTwo
