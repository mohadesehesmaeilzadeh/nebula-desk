import { useEffect, useRef, useState } from 'react'

const loadingSteps = [
  {
    delay: 260,
    progress: 18,
    message: 'Initializing core interface...',
  },
  {
    delay: 580,
    progress: 42,
    message: 'Loading visual environment...',
  },
  {
    delay: 920,
    progress: 66,
    message: 'Preparing portfolio modules...',
  },
  {
    delay: 1240,
    progress: 86,
    message: 'Calibrating creativity engine...',
  },
  {
    delay: 1540,
    progress: 100,
    message: 'Almost ready...',
  },
]

function BootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Starting NebulaDesk...')
  const timerRefs = useRef([])
  const completedRef = useRef(false)

  useEffect(() => {
    timerRefs.current = loadingSteps.map((step) =>
      window.setTimeout(() => {
        setProgress(step.progress)
        setMessage(step.message)

        if (step.progress === 100 && !completedRef.current) {
          completedRef.current = true
          timerRefs.current.push(window.setTimeout(onComplete, 320))
        }
      }, step.delay),
    )

    return () => {
      timerRefs.current.forEach((timerId) => window.clearTimeout(timerId))
      timerRefs.current = []
    }
  }, [onComplete])

  function handleSkipBoot() {
    if (completedRef.current) {
      return
    }

    completedRef.current = true
    timerRefs.current.forEach((timerId) => window.clearTimeout(timerId))
    timerRefs.current = []
    setProgress(100)
    setMessage('Startup skipped.')
    onComplete()
  }

  return (
    <main className="system-screen boot-screen" aria-labelledby="boot-title">
      <section className="system-panel boot-panel">
        <div className="system-logo" aria-hidden="true">
          ND
        </div>
        <p className="system-eyebrow">NebulaDesk BIOS</p>
        <h1 id="boot-title">NebulaDesk</h1>
        <p className="system-copy">Starting system interface...</p>

        <div className="boot-progress-group">
          <div className="boot-progress-meta">
            <span aria-live="polite">{message}</span>
            <span>{progress}%</span>
          </div>
          <div
            className="boot-progress-track"
            role="progressbar"
            aria-label="NebulaDesk startup progress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progress}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <button className="system-button system-button-secondary" type="button" onClick={handleSkipBoot}>
          Skip Boot
        </button>
      </section>
    </main>
  )
}

export default BootScreen
