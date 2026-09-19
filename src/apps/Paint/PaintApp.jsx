import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './PaintApp.css'

const DEFAULT_COLOR = '#1d4ed8'
const DEFAULT_BRUSH_SIZE = 8
const PAINT_SWATCHES = [
  { label: 'Blue', value: '#1d4ed8' },
  { label: 'Red', value: '#dc2626' },
  { label: 'Teal', value: '#0f766e' },
]

function PaintApp() {
  const canvasRef = useRef(null)
  const canvasWrapRef = useRef(null)
  const drawingRef = useRef(false)
  const initializedRef = useRef(false)
  const lastPointRef = useRef(null)
  const [tool, setTool] = useState('brush')
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [brushSize, setBrushSize] = useState(DEFAULT_BRUSH_SIZE)
  const [status, setStatus] = useState('Canvas ready')

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const wrapper = canvasWrapRef.current

    if (!canvas || !wrapper) {
      return undefined
    }

    function resizeCanvas() {
      const rect = wrapper.getBoundingClientRect()
      const ratio = Math.max(1, window.devicePixelRatio || 1)
      const width = Math.max(1, Math.round(rect.width * ratio))
      const height = Math.max(1, Math.round(rect.height * ratio))

      if (canvas.width === width && canvas.height === height) {
        return
      }

      const snapshot = document.createElement('canvas')
      snapshot.width = canvas.width
      snapshot.height = canvas.height
      snapshot.getContext('2d').drawImage(canvas, 0, 0)

      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, rect.width, rect.height)

      if (initializedRef.current) {
        context.drawImage(
          snapshot,
          0,
          0,
          snapshot.width,
          snapshot.height,
          0,
          0,
          rect.width,
          rect.height,
        )
      }

      initializedRef.current = true
    }

    resizeCanvas()
    const observer = new ResizeObserver(resizeCanvas)
    observer.observe(wrapper)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      drawingRef.current = false
      lastPointRef.current = null
    }
  }, [])

  function getCanvasPoint(event) {
    const rect = event.currentTarget.getBoundingClientRect()

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  function configureContext(context) {
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineWidth = brushSize
    context.strokeStyle = tool === 'eraser' ? '#ffffff' : color
    context.fillStyle = tool === 'eraser' ? '#ffffff' : color
  }

  function handlePointerDown(event) {
    if (event.button !== 0 && event.pointerType === 'mouse') {
      return
    }

    event.preventDefault()
    const canvas = event.currentTarget
    const context = canvas.getContext('2d')
    const point = getCanvasPoint(event)

    canvas.setPointerCapture(event.pointerId)
    drawingRef.current = true
    lastPointRef.current = point
    configureContext(context)
    context.beginPath()
    context.arc(point.x, point.y, brushSize / 2, 0, Math.PI * 2)
    context.fill()
    context.beginPath()
    context.moveTo(point.x, point.y)
    setStatus(tool === 'eraser' ? 'Erasing' : 'Drawing')
  }

  function handlePointerMove(event) {
    if (!drawingRef.current || !lastPointRef.current) {
      return
    }

    event.preventDefault()
    const context = event.currentTarget.getContext('2d')
    const point = getCanvasPoint(event)

    configureContext(context)
    context.beginPath()
    context.moveTo(lastPointRef.current.x, lastPointRef.current.y)
    context.lineTo(point.x, point.y)
    context.stroke()
    lastPointRef.current = point
  }

  function finishDrawing(event) {
    if (!drawingRef.current) {
      return
    }

    drawingRef.current = false
    lastPointRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setStatus('Canvas ready')
  }

  function clearCanvas() {
    if (!window.confirm('Clear the entire canvas?')) {
      return
    }

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.save()
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.restore()
    setStatus('Canvas cleared')
  }

  function downloadDrawing() {
    const link = document.createElement('a')
    link.download = 'nebuladesk-drawing.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
    setStatus('PNG downloaded')
  }

  return (
    <div className="paint-app app-viewport">
      <header className="paint-toolbar">
        <div className="paint-tool-group" role="group" aria-label="Drawing tool">
          <button
            type="button"
            aria-pressed={tool === 'brush'}
            data-active={tool === 'brush' ? 'true' : 'false'}
            onClick={() => setTool('brush')}
          >
            Brush
          </button>
          <button
            type="button"
            aria-pressed={tool === 'eraser'}
            data-active={tool === 'eraser' ? 'true' : 'false'}
            onClick={() => setTool('eraser')}
          >
            Eraser
          </button>
        </div>

        <fieldset className="paint-color-control">
          <legend>Color</legend>
          <input
            id="paint-color"
            type="color"
            aria-label="Custom brush color"
            value={color}
            disabled={tool === 'eraser'}
            onChange={(event) => setColor(event.target.value)}
          />
          <div className="paint-swatches" role="group" aria-label="Quick colors">
            {PAINT_SWATCHES.map((swatch) => (
              <button
                key={swatch.value}
                className="paint-color-preset"
                type="button"
                aria-label={`Use ${swatch.label}`}
                aria-pressed={color === swatch.value}
                disabled={tool === 'eraser'}
                style={{ '--paint-swatch': swatch.value }}
                onClick={() => setColor(swatch.value)}
              />
            ))}
          </div>
        </fieldset>

        <label className="paint-size-control" htmlFor="paint-size">
          <span>Size</span>
          <input
            id="paint-size"
            type="range"
            min="2"
            max="40"
            value={brushSize}
            aria-valuetext={`${brushSize} pixels`}
            onChange={(event) => setBrushSize(Number(event.target.value))}
          />
          <output htmlFor="paint-size">{brushSize}px</output>
        </label>

        <div className="paint-file-actions">
          <button type="button" className="paint-clear-button" onClick={clearCanvas}>
            Clear Canvas
          </button>
          <button type="button" className="paint-download-button" onClick={downloadDrawing}>
            Download PNG
          </button>
        </div>
      </header>

      <div
        ref={canvasWrapRef}
        className="paint-canvas-wrap"
      >
        <p id="paint-canvas-description" className="visually-hidden">
          Drawing supports pointer, touch, and pen input. Keyboard drawing is not available.
        </p>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Drawing canvas"
          aria-describedby="paint-canvas-description"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrawing}
          onPointerCancel={finishDrawing}
        />
      </div>

      <footer className="paint-status" aria-live="polite">
        <span>{status}</span>
        <span>{tool === 'eraser' ? 'Eraser' : 'Brush'} - {brushSize}px</span>
      </footer>
    </div>
  )
}

export default PaintApp
