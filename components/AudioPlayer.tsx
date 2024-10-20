import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { audioLoopAtom, audioPlaybackRateAtom } from '@/atoms'

import IconButton from './IconButton'
import cx from 'classix'
import posthog from 'posthog-js'
import { twMerge } from 'tailwind-merge'
import { useAtom } from 'jotai'

export type AudioPlayerProps = {
  src?: string | null
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const [audioLoop, setAudioLoop] = useAtom(audioLoopAtom)
  const [playbackRate, setPlaybackRate] = useAtom(audioPlaybackRateAtom)

  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audio.current = new Audio(src || undefined)

    audio.current.addEventListener('timeupdate', () => {
      if (audio.current)
        setCurrentTime(
          (audio.current.currentTime * 100) / audio.current.duration,
        )
    })

    audio.current.addEventListener('ended', () => {
      if (!audio.current?.loop) {
        setPlaying(false)
      }
    })
  }, [src])

  useEffect(() => {
    if (!audio.current) {
      return alert('no audio source')
    }
    audio.current.loop = audioLoop
  }, [audioLoop])

  useEffect(() => {
    if (!audio.current) {
      return alert('no audio source')
    }
    audio.current.playbackRate = playbackRate
  }, [playbackRate])

  const play = useCallback(async () => {
    if (!audio.current?.src) {
      return alert('no audio source')
    }
    await audio.current.play()
    posthog.capture('Play Audio', { src: audio.current.src })
    setPlaying(true)
  }, [])

  const pause = useCallback(() => {
    audio.current?.pause()
    setPlaying(false)
  }, [])

  const handleSliderChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!audio.current) return
      audio.current.currentTime =
        audio.current.duration * (Number(event.target.value) / 100)
    },
    [audio],
  )

  const togglePlaybackRate = useCallback(() => {
    setPlaybackRate((playbackRate) =>
      // min: 0.5, max: 2, increment: 0.5
      Math.max(0.5, (playbackRate + 0.5) % 2.5),
    )
  }, [])

  const toggleLoop = useCallback(() => {
    setAudioLoop((audioLoop) => !audioLoop)
  }, [])

  return (
    <div
      className={twMerge(
        cx(
          'flex items-center text-zinc-300 dark:text-neutral-400 [&>*:hover]:text-zinc-900 [&>*:hover]:dark:text-neutral-100',
          playing && 'text-zinc-900 dark:text-neutral-100',
        ),
      )}
    >
      <IconButton
        className="h-4 w-4"
        size="small"
        name={playing ? 'pause' : 'play'}
        onClick={playing ? pause : play}
      />

      <input
        className="h-0.5 w-full cursor-pointer touch-none appearance-none rounded-lg bg-zinc-200 text-sm dark:bg-neutral-700"
        type="range"
        min={0}
        max={100}
        value={currentTime}
        onChange={handleSliderChange}
      />

      <button
        className={twMerge(
          cx(
            'flex h-4 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-md text-[10px] hover:bg-zinc-200 active:bg-zinc-300 dark:hover:bg-neutral-700 dark:active:bg-neutral-600',

            playing &&
              playbackRate !== 1 &&
              'bg-zinc-300 text-zinc-900 dark:bg-neutral-600 dark:text-neutral-100',
          ),
        )}
        style={{ transition: 'background-color 250ms' }}
        onClick={togglePlaybackRate}
      >
        {`x${playbackRate}`}
      </button>

      <IconButton
        className={twMerge(
          cx(
            'h-4 w-4',
            playing &&
              audioLoop &&
              'bg-zinc-300 text-zinc-900 dark:bg-neutral-600 dark:text-neutral-100',
          ),
        )}
        size="small"
        name="loop"
        onClick={toggleLoop}
      />
    </div>
  )
}

export default AudioPlayer
