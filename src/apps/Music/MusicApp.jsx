import { useEffect, useRef, useState } from 'react'
import { musicTracks } from './musicData'
import './MusicApp.css'

const MUSIC_SETTINGS_KEY = 'nebuladesk-music-settings'
const DEFAULT_VOLUME = 0.72

function loadVolume() {
  try {
    const value = JSON.parse(window.localStorage.getItem(MUSIC_SETTINGS_KEY))

    return value?.version === 1 && typeof value.volume === 'number'
      ? Math.min(1, Math.max(0, value.volume))
      : DEFAULT_VOLUME
  } catch {
    return DEFAULT_VOLUME
  }
}

function saveVolume(volume) {
  try {
    window.localStorage.setItem(
      MUSIC_SETTINGS_KEY,
      JSON.stringify({ version: 1, volume }),
    )
  } catch {
    // Playback remains available when browser storage is unavailable.
  }
}

function formatTime(value) {
  if (!Number.isFinite(value) || value < 0) {
    return '0:00'
  }

  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function MusicApp() {
  const audioRef = useRef(null)
  const playIntentRef = useRef(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(loadVolume)
  const [isMuted, setIsMuted] = useState(false)
  const [audioError, setAudioError] = useState('')
  const currentTrack = musicTracks[currentTrackIndex] || null

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.volume = volume
    saveVolume(volume)
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio || !currentTrack) {
      return
    }

    setCurrentTime(0)
    setDuration(0)
    setAudioError('')
    audio.load()
  }, [currentTrack])

  function requestPlay() {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    playIntentRef.current = true
    setAudioError('')
    audio.play().catch(() => {
      playIntentRef.current = false
      setIsPlaying(false)
      setAudioError('Playback could not start. Try Play again.')
    })
  }

  function requestPause() {
    playIntentRef.current = false
    audioRef.current?.pause()
  }

  function selectTrack(index) {
    const audio = audioRef.current

    playIntentRef.current = Boolean(audio && !audio.paused)
    setCurrentTrackIndex(index)
  }

  function changeTrack(offset) {
    if (musicTracks.length < 1) {
      return
    }

    const audio = audioRef.current
    playIntentRef.current = playIntentRef.current || Boolean(audio && !audio.paused)
    setCurrentTrackIndex(
      (currentIndex) => (currentIndex + offset + musicTracks.length) % musicTracks.length,
    )
  }

  function handlePrevious() {
    const audio = audioRef.current

    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      setCurrentTime(0)
      return
    }

    changeTrack(-1)
  }

  function handleLoadedMetadata(event) {
    setDuration(event.currentTarget.duration || 0)

    if (playIntentRef.current) {
      requestPlay()
    }
  }

  function handleSeek(event) {
    const nextTime = Number(event.target.value)

    if (audioRef.current) {
      audioRef.current.currentTime = nextTime
    }
    setCurrentTime(nextTime)
  }

  function handleVolumeChange(event) {
    const nextVolume = Number(event.target.value)

    setVolume(nextVolume)
    if (nextVolume > 0) {
      setIsMuted(false)
    }
  }

  function toggleMute() {
    if (volume === 0) {
      setVolume(DEFAULT_VOLUME)
      setIsMuted(false)
      return
    }

    setIsMuted((muted) => !muted)
  }

  if (!currentTrack) {
    return (
      <div className="music-app music-empty app-viewport">
        <h2>No local tracks available</h2>
        <p>Add local audio files to the Music data module to begin playback.</p>
      </div>
    )
  }

  const isAudioMuted = isMuted || volume === 0

  return (
    <div className="music-app app-viewport">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          playIntentRef.current = true
          changeTrack(1)
        }}
        onError={() => setAudioError('This local track could not be loaded.')}
      />

      <section className="music-now-playing" aria-labelledby="music-now-playing-title">
        <div className="music-art" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="music-track-copy">
          <p>Now playing</p>
          <h2 id="music-now-playing-title">{currentTrack.title}</h2>
          <span>{currentTrack.artist}</span>
        </div>

        <div className="music-transport" role="group" aria-label="Playback controls">
          <button type="button" aria-label="Previous track" onClick={handlePrevious}>
            Previous
          </button>
          <button
            className="music-play-button"
            type="button"
            onClick={isPlaying ? requestPause : requestPlay}
            aria-label={isPlaying ? 'Pause current track' : 'Play current track'}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button type="button" aria-label="Next track" onClick={() => changeTrack(1)}>
            Next
          </button>
        </div>

        <div className="music-progress-group">
          <label className="visually-hidden" htmlFor="music-progress">Track progress</label>
          <input
            id="music-progress"
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            disabled={!duration}
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
            onChange={handleSeek}
          />
          <div className="music-time" aria-live="off">
            <time>{formatTime(currentTime)}</time>
            <time>{formatTime(duration)}</time>
          </div>
        </div>

        <div className="music-volume-group">
          <button
            type="button"
            aria-label={isAudioMuted ? 'Unmute audio' : 'Mute audio'}
            aria-pressed={isAudioMuted}
            onClick={toggleMute}
          >
            {isAudioMuted ? 'Unmute' : 'Mute'}
          </button>
          <label htmlFor="music-volume">Volume</label>
          <input
            id="music-volume"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            aria-valuetext={`${Math.round(volume * 100)} percent`}
            onChange={handleVolumeChange}
          />
          <output htmlFor="music-volume">{Math.round(volume * 100)}%</output>
        </div>

        {audioError && <p className="music-error" role="alert">{audioError}</p>}
      </section>

      <section className="music-library" aria-labelledby="music-library-title">
        <header>
          <p>Local library</p>
          <h3 id="music-library-title">Tracks</h3>
          <span>{musicTracks.length} local WAV files</span>
        </header>
        <div className="music-track-list">
          {musicTracks.map((track, index) => (
            <button
              key={track.id}
              type="button"
              className="music-track-item"
              data-current={index === currentTrackIndex ? 'true' : 'false'}
              aria-current={index === currentTrackIndex ? 'true' : undefined}
              onClick={() => selectTrack(index)}
            >
              <span className="music-track-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="music-track-details">
                <strong>{track.title}</strong>
                <small>{track.artist}</small>
              </span>
              <time>{track.durationLabel}</time>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MusicApp
