function PoweredOffScreen({ onPowerOn }) {
  return (
    <main className="system-screen powered-off-screen" aria-labelledby="powered-off-title">
      <section className="powered-off-content">
        <div className="power-glyph" aria-hidden="true" />
        <h1 id="powered-off-title">NebulaDesk is off</h1>
        <p className="system-hint">Power is available when you are ready.</p>
        <button className="system-button" type="button" onClick={onPowerOn}>
          Turn on NebulaDesk
        </button>
      </section>
    </main>
  )
}

export default PoweredOffScreen
