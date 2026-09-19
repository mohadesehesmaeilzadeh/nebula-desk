export const NOTES_STORAGE_KEY = 'nebuladesk-notes'

const NOTES_STORAGE_VERSION = 1

function isUsableTimestamp(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function normalizeNote(note) {
  if (
    !note ||
    typeof note !== 'object' ||
    typeof note.id !== 'string' ||
    typeof note.title !== 'string' ||
    typeof note.content !== 'string' ||
    !isUsableTimestamp(note.createdAt) ||
    !isUsableTimestamp(note.updatedAt)
  ) {
    return null
  }

  return {
    id: note.id,
    title: note.title,
    content: note.content,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  }
}

export function normalizeNotes(value) {
  if (!Array.isArray(value)) {
    return []
  }

  const seenIds = new Set()

  return value.reduce((validNotes, note) => {
    const normalizedNote = normalizeNote(note)

    if (!normalizedNote || seenIds.has(normalizedNote.id)) {
      return validNotes
    }

    seenIds.add(normalizedNote.id)
    validNotes.push(normalizedNote)
    return validNotes
  }, [])
}

export function loadNotes() {
  try {
    const storedValue = window.localStorage.getItem(NOTES_STORAGE_KEY)

    if (!storedValue) {
      return []
    }

    const parsedValue = JSON.parse(storedValue)

    if (
      !parsedValue ||
      parsedValue.version !== NOTES_STORAGE_VERSION ||
      !Array.isArray(parsedValue.notes)
    ) {
      return []
    }

    return normalizeNotes(parsedValue.notes)
  } catch {
    return []
  }
}

export function saveNotes(notes) {
  try {
    window.localStorage.setItem(
      NOTES_STORAGE_KEY,
      JSON.stringify({
        version: NOTES_STORAGE_VERSION,
        notes: normalizeNotes(notes),
      }),
    )
    return true
  } catch {
    return false
  }
}
