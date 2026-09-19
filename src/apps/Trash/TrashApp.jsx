import { useState } from 'react'
import './TrashApp.css'

const DEMO_TRASH_ITEMS = Object.freeze([
  {
    id: 'old-screenshot',
    name: 'Old screenshot.png',
    type: 'PNG image',
    mark: 'PNG',
    size: '428 KB',
    deletedAt: 'Today, 09:14',
    description: 'A fictional interface capture used only for the NebulaDesk Trash demo.',
  },
  {
    id: 'draft-text',
    name: 'Draft.txt',
    type: 'Text document',
    mark: 'TXT',
    size: '3 KB',
    deletedAt: 'Yesterday, 18:42',
    description: 'An imaginary scratch file with no connection to Notes or real local files.',
  },
  {
    id: 'unused-icon',
    name: 'Unused icon.svg',
    type: 'Vector image',
    mark: 'SVG',
    size: '12 KB',
    deletedAt: 'Sep 16, 14:08',
    description: 'A demo asset representing an unused icon from a fictional project.',
  },
])

function TrashApp() {
  const [items, setItems] = useState(() => [...DEMO_TRASH_ITEMS])
  const [selectedItemId, setSelectedItemId] = useState(null)
  const selectedItem = items.find((item) => item.id === selectedItemId) || null

  function emptyTrash() {
    if (!window.confirm('Permanently remove all fictional demo items?')) {
      return
    }

    setItems([])
    setSelectedItemId(null)
  }

  return (
    <div className="trash-app app-viewport">
      <header className="trash-header">
        <div>
          <p>Demo recycle bin</p>
          <h2>Trash</h2>
          <span>{items.length} fictional {items.length === 1 ? 'item' : 'items'}</span>
        </div>
        <button type="button" disabled={items.length === 0} onClick={emptyTrash}>
          Empty Trash
        </button>
      </header>

      {items.length > 0 ? (
        <div className="trash-workspace">
          <section className="trash-list" aria-label="Deleted demo items">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === selectedItemId}
                data-selected={item.id === selectedItemId ? 'true' : 'false'}
                onClick={() => setSelectedItemId(item.id)}
              >
                <span className="trash-item-mark" aria-hidden="true">{item.mark}</span>
                <span className="trash-item-copy">
                  <strong>{item.name}</strong>
                  <small>{item.type} - {item.size}</small>
                </span>
              </button>
            ))}
          </section>

          <section className="trash-details" aria-live="polite">
            {selectedItem ? (
              <>
                <span className="trash-detail-mark" aria-hidden="true">{selectedItem.mark}</span>
                <div className="trash-detail-heading">
                  <p>Item details</p>
                  <h3>{selectedItem.name}</h3>
                </div>
                <dl>
                  <div><dt>Type</dt><dd>{selectedItem.type}</dd></div>
                  <div><dt>Size</dt><dd>{selectedItem.size}</dd></div>
                  <div><dt>Deleted</dt><dd>{selectedItem.deletedAt}</dd></div>
                </dl>
                <p className="trash-description">{selectedItem.description}</p>
              </>
            ) : (
              <div className="trash-details-empty">
                <h3>Select an item</h3>
                <p>Choose a fictional deleted item to inspect its details.</p>
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="trash-empty-state" role="status">
          <span aria-hidden="true">0</span>
          <h3>Trash is empty.</h3>
          <p>No demo items remain in this runtime.</p>
        </div>
      )}

      <footer className="trash-notice">
        Demo content only. Trash never reads or removes real NebulaDesk data.
      </footer>
    </div>
  )
}

export default TrashApp
