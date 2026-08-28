function SleepScreen({ onWake }) {
  function handleWakeButtonClick(event) {
    event.stopPropagation()
    onWake()
  }

  return (
    <main className="system-screen sleep-screen" aria-labelledby="sleep-title" onClick={onWake}>
      <section className="sleep-content">
        <div className="sleep-pulse" aria-hidden="true" />
        <h1 id="sleep-title">NebulaDesk is sleeping</h1>
        <p className="system-hint">Press Enter or click to wake</p>
        <button
          className="system-button system-button-secondary"
          type="button"
          onClick={handleWakeButtonClick}
        >
          Wake
        </button>
      </section>
    </main>
  )
}

export default SleepScreen
