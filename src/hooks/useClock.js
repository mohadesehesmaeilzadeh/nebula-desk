import { useEffect, useState } from 'react'

function getDelayUntilNextMinute() {
  const now = new Date()
  return 60000 - now.getSeconds() * 1000 - now.getMilliseconds()
}

export function useClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let intervalId

    const timeoutId = window.setTimeout(() => {
      setNow(new Date())
      intervalId = window.setInterval(() => {
        setNow(new Date())
      }, 60000)
    }, getDelayUntilNextMinute())

    return () => {
      window.clearTimeout(timeoutId)

      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [])

  return now
}
