import { beforeEach, expect, it } from 'vitest'
import { loadNotes, NOTES_STORAGE_KEY, saveNotes } from './notesStorage.js'

beforeEach(() => {
  window.localStorage.clear()
})

it('persists valid notes and filters duplicate or malformed records', () => {
  const note = {
    id: 'note-1',
    title: 'Draft',
    content: 'Keep this',
    createdAt: '2026-09-21T10:00:00.000Z',
    updatedAt: '2026-09-21T10:00:00.000Z',
  }

  expect(saveNotes([note, { ...note, title: 'Duplicate' }, { id: 'broken' }])).toBe(true)
  expect(JSON.parse(window.localStorage.getItem(NOTES_STORAGE_KEY))).toEqual({
    version: 1,
    notes: [note],
  })
  expect(loadNotes()).toEqual([note])
})
