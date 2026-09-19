import { useEffect, useMemo, useRef, useState } from 'react'
import { galleryItems } from '../../data/gallery'
import GalleryViewer from './GalleryViewer'
import './GalleryApp.css'

function isValidGalleryItem(item) {
  return (
    item &&
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.description === 'string' &&
    typeof item.src === 'string' &&
    Boolean(item.src) &&
    typeof item.alt === 'string' &&
    Boolean(item.alt)
  )
}

function GalleryApp() {
  const availableItems = useMemo(() => galleryItems.filter(isValidGalleryItem), [])
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [failedImageIds, setFailedImageIds] = useState(() => new Set())
  const cardRefs = useRef(new Map())
  const focusFrameRef = useRef(null)
  const selectedIndex = availableItems.findIndex((item) => item.id === selectedItemId)
  const selectedItem = selectedIndex >= 0 ? availableItems[selectedIndex] : null

  useEffect(() => {
    return () => {
      if (focusFrameRef.current !== null) {
        window.cancelAnimationFrame(focusFrameRef.current)
      }
    }
  }, [])

  function markImageFailed(itemId) {
    setFailedImageIds((currentIds) => {
      const nextIds = new Set(currentIds)
      nextIds.add(itemId)
      return nextIds
    })
  }

  function closeViewer() {
    const itemId = selectedItemId

    setSelectedItemId(null)
    focusFrameRef.current = window.requestAnimationFrame(() => {
      focusFrameRef.current = null
      cardRefs.current.get(itemId)?.focus({ preventScroll: true })
    })
  }

  if (selectedItem) {
    return (
      <div className="gallery-app gallery-app-viewer app-viewport">
        <GalleryViewer
          item={selectedItem}
          hasPrevious={selectedIndex > 0}
          hasNext={selectedIndex < availableItems.length - 1}
          onPrevious={() => setSelectedItemId(availableItems[selectedIndex - 1]?.id)}
          onNext={() => setSelectedItemId(availableItems[selectedIndex + 1]?.id)}
          onClose={closeViewer}
        />
      </div>
    )
  }

  return (
    <div className="gallery-app app-viewport">
      <header className="gallery-header">
        <p>Local collection</p>
        <h2>Gallery</h2>
        <span>NebulaDesk interface studies and project imagery.</span>
      </header>

      {availableItems.length > 0 ? (
        <div className="gallery-grid" role="group" aria-label="Gallery images">
          {availableItems.map((item) => (
            <button
              ref={(element) => {
                if (element) {
                  cardRefs.current.set(item.id, element)
                } else {
                  cardRefs.current.delete(item.id)
                }
              }}
              key={item.id}
              className="gallery-card"
              type="button"
              onClick={() => setSelectedItemId(item.id)}
            >
              <span className="gallery-card-media">
                {failedImageIds.has(item.id) ? (
                  <span className="gallery-image-placeholder" role="img" aria-label={item.alt}>
                    Image unavailable
                  </span>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    onError={() => markImageFailed(item.id)}
                  />
                )}
              </span>
              <span className="gallery-card-copy">
                <strong>{item.title}</strong>
                <small>{item.category}</small>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="gallery-empty-state">
          <h3>No gallery items available yet.</h3>
        </div>
      )}
    </div>
  )
}

export default GalleryApp
