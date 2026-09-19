import { useEffect, useMemo, useRef, useState } from 'react'
import { loadNotes, saveNotes } from '../../utils/notesStorage'
import './NotesApp.css'

function sortNotes(notes) {
  return [...notes].sort((a, b) => {
    const updatedDifference = Date.parse(b.updatedAt) - Date.parse(a.updatedAt)

    return updatedDifference || a.id.localeCompare(b.id)
  })
}

function createNoteId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }

  return `note-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function formatUpdatedAt(value) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function NotesApp() {
  const [notes, setNotes] = useState(() => sortNotes(loadNotes()))
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [mobileEditorVisible, setMobileEditorVisible] = useState(false)
  const [saveStatus, setSaveStatus] = useState('Saved locally')
  const lastPersistedNotes = useRef(notes)
  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedNoteId) || null,
    [notes, selectedNoteId],
  )

  useEffect(() => {
    if (selectedNoteId && notes.some((note) => note.id === selectedNoteId)) {
      return
    }

    setSelectedNoteId(notes[0]?.id || null)
  }, [notes, selectedNoteId])

  useEffect(() => {
    if (notes === lastPersistedNotes.current) {
      return
    }

    setSaveStatus(saveNotes(notes) ? 'Saved locally' : 'Storage unavailable')
    lastPersistedNotes.current = notes
  }, [notes])

  function handleCreateNote() {
    const timestamp = new Date().toISOString()
    const note = {
      id: createNoteId(),
      title: 'Untitled Note',
      content: '',
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    setNotes((currentNotes) => sortNotes([note, ...currentNotes]))
    setSelectedNoteId(note.id)
    setMobileEditorVisible(true)
  }

  function handleSelectNote(noteId) {
    setSelectedNoteId(noteId)
    setMobileEditorVisible(true)
  }

  function updateSelectedNote(changes) {
    if (!selectedNoteId) {
      return
    }

    const updatedAt = new Date().toISOString()

    setNotes((currentNotes) =>
      sortNotes(
        currentNotes.map((note) =>
          note.id === selectedNoteId ? { ...note, ...changes, updatedAt } : note,
        ),
      ),
    )
  }

  function handleDeleteNote() {
    if (!selectedNote || !window.confirm('Delete this note?')) {
      return
    }

    const remainingNotes = notes.filter((note) => note.id !== selectedNote.id)

    setNotes(remainingNotes)
    setSelectedNoteId(remainingNotes[0]?.id || null)
    setMobileEditorVisible(false)
  }

  return (
    <div
      className="notes-app app-viewport"
      data-editor-visible={mobileEditorVisible ? 'true' : 'false'}
    >
      <section className="notes-sidebar" aria-labelledby="notes-list-title">
        <header className="notes-sidebar-header">
          <div>
            <p>Local workspace</p>
            <h2 id="notes-list-title">Notes</h2>
          </div>
          <button className="notes-new-button" type="button" onClick={handleCreateNote}>
            <span aria-hidden="true">+</span>
            New Note
          </button>
        </header>

        {notes.length > 0 ? (
          <div className="notes-list" aria-label="Saved notes">
            {notes.map((note) => (
              <button
                key={note.id}
                className="notes-list-item"
                type="button"
                aria-pressed={note.id === selectedNoteId}
                data-selected={note.id === selectedNoteId ? 'true' : 'false'}
                onClick={() => handleSelectNote(note.id)}
              >
                <span>{note.title.trim() || 'Untitled Note'}</span>
                <time dateTime={note.updatedAt}>{formatUpdatedAt(note.updatedAt)}</time>
              </button>
            ))}
          </div>
        ) : (
          <div className="notes-empty-state">
            <h3>No notes yet</h3>
            <p>Create a note to start writing.</p>
            <button type="button" onClick={handleCreateNote}>
              Create Note
            </button>
          </div>
        )}
      </section>

      {selectedNote ? (
        <section className="notes-editor" aria-label="Note editor">
          <header className="notes-editor-toolbar">
            <button
              className="notes-mobile-back"
              type="button"
              onClick={() => setMobileEditorVisible(false)}
            >
              Back to Notes
            </button>
            <p>
              <span>{saveStatus}</span>
              <time dateTime={selectedNote.updatedAt}>
                Updated {formatUpdatedAt(selectedNote.updatedAt)}
              </time>
            </p>
          </header>

          <div className="notes-editor-fields">
            <label htmlFor="notes-title-input">Title</label>
            <input
              id="notes-title-input"
              type="text"
              value={selectedNote.title}
              onChange={(event) => updateSelectedNote({ title: event.target.value })}
            />

            <label htmlFor="notes-content-input">Note</label>
            <textarea
              id="notes-content-input"
              value={selectedNote.content}
              spellCheck="true"
              onChange={(event) => updateSelectedNote({ content: event.target.value })}
            />
          </div>

          <footer className="notes-editor-actions">
            <button className="notes-delete-button" type="button" onClick={handleDeleteNote}>
              Delete Note
            </button>
          </footer>
        </section>
      ) : (
        <section className="notes-editor notes-editor-empty" aria-labelledby="notes-editor-title">
          <h2 id="notes-editor-title">Select a note</h2>
          <p>Choose a note from the list or create a new one.</p>
        </section>
      )}
    </div>
  )
}

export default NotesApp
