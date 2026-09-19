import { useEffect, useRef, useState } from 'react'

function GalleryViewer({ item, hasPrevious, hasNext, onPrevious, onNext, onClose }) {
  const viewerRef = useRef(null)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    setImageFailed(false)
    viewerRef.current?.focus({ preventScroll: true })
  }, [item.id])

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      onClose()
    }

    if (event.key === 'ArrowLeft' && hasPrevious) {
      event.preventDefault()
      onPrevious()
    }

    if (event.key === 'ArrowRight' && hasNext) {
      event.preventDefault()
      onNext()
    }
  }

  return (
    <section
      ref={viewerRef}
      className="gallery-viewer"
      aria-labelledby="gallery-viewer-title"
      tabIndex="-1"
      onKeyDown={handleKeyDown}
    >
      <header className="gallery-viewer-header">
        <div>
          <p>{item.category}</p>
          <h2 id="gallery-viewer-title">{item.title}</h2>
        </div>
        <button type="button" aria-label="Close image viewer" onClick={onClose}>
          Back to Gallery
        </button>
      </header>

      <figure className="gallery-viewer-media">
        {imageFailed ? (
          <div className="gallery-image-placeholder" role="img" aria-label={item.alt}>
            Image unavailable
          </div>
        ) : (
          <img src={item.src} alt={item.alt} onError={() => setImageFailed(true)} />
        )}
      </figure>

      <footer className="gallery-viewer-footer">
        <p>{item.description}</p>
        <nav aria-label="Gallery image navigation">
          <button
            type="button"
            aria-label="Previous image"
            disabled={!hasPrevious}
            onClick={onPrevious}
          >
            Previous
          </button>
          <button
            type="button"
            aria-label="Next image"
            disabled={!hasNext}
            onClick={onNext}
          >
            Next
          </button>
        </nav>
      </footer>
    </section>
  )
}

export default GalleryViewer
