import { useMemo, useState } from 'react'
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
  const selectedIndex = availableItems.findIndex((item) => item.id === selectedItemId)
  const selectedItem = selectedIndex >= 0 ? availableItems[selectedIndex] : null

  function markImageFailed(itemId) {
    setFailedImageIds((currentIds) => {
      const nextIds = new Set(currentIds)
      nextIds.add(itemId)
      return nextIds
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
          onClose={() => setSelectedItemId(null)}
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
        <div className="gallery-grid" aria-label="Gallery images">
          {availableItems.map((item) => (
            <button
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
