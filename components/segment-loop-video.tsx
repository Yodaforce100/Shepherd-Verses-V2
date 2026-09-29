'use client'

import type { CSSProperties, SyntheticEvent } from 'react'

type SegmentLoopVideoProps = {
  src: string
  poster?: string
  endAt: number
  className?: string
  style?: CSSProperties
}

export function SegmentLoopVideo({ src, poster, endAt, className, style }: SegmentLoopVideoProps) {
  const restartAtSegmentEnd = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget
    if (video.currentTime >= endAt) {
      video.currentTime = 0
      void video.play()
    }
  }

  return (
    <video
      className={className}
      style={style}
      src={`${src}#t=0,${endAt}`}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onTimeUpdate={restartAtSegmentEnd}
      onPause={restartAtSegmentEnd}
    />
  )
}
