export const MEMORY_BEST_STORAGE_KEY = 'nebuladesk-memory-best'

const MEMORY_SYMBOLS = Object.freeze([
  { pairId: 'command', mark: '>_', label: 'Command prompt' },
  { pairId: 'code', mark: '</>', label: 'Code brackets' },
  { pairId: 'grid', mark: '2x2', label: 'Grid' },
  { pairId: 'signal', mark: '///', label: 'Signal' },
  { pairId: 'binary', mark: '01', label: 'Binary' },
  { pairId: 'system', mark: 'OS', label: 'Operating system' },
])

function shuffle(items, random) {
  const shuffledItems = [...items]

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const currentItem = shuffledItems[index]
    shuffledItems[index] = shuffledItems[swapIndex]
    shuffledItems[swapIndex] = currentItem
  }

  return shuffledItems
}

export function createMemoryDeck(random = Math.random) {
  const cards = MEMORY_SYMBOLS.flatMap((symbol) => [0, 1].map((copyIndex) => ({
    ...symbol,
    id: `${symbol.pairId}-${copyIndex}`,
  })))

  return shuffle(cards, random)
}

export function formatGameTime(totalSeconds) {
  const safeSeconds = Math.max(0, Number.isFinite(totalSeconds) ? totalSeconds : 0)
  const minutes = Math.floor(safeSeconds / 60)
  const seconds = Math.floor(safeSeconds % 60)

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function normalizeBestScore(value) {
  if (
    !value ||
    typeof value !== 'object' ||
    !Number.isInteger(value.moves) ||
    value.moves < 1 ||
    !Number.isInteger(value.time) ||
    value.time < 0
  ) {
    return null
  }

  return { moves: value.moves, time: value.time }
}

export function loadBestScore() {
  try {
    const storedScore = window.localStorage.getItem(MEMORY_BEST_STORAGE_KEY)

    return storedScore ? normalizeBestScore(JSON.parse(storedScore)) : null
  } catch {
    return null
  }
}

export function saveBestScore(score) {
  const normalizedScore = normalizeBestScore(score)

  if (!normalizedScore) {
    return false
  }

  try {
    window.localStorage.setItem(MEMORY_BEST_STORAGE_KEY, JSON.stringify(normalizedScore))
    return true
  } catch {
    return false
  }
}

export function isBetterScore(candidate, currentBest) {
  if (!currentBest) {
    return true
  }

  return (
    candidate.moves < currentBest.moves ||
    (candidate.moves === currentBest.moves && candidate.time < currentBest.time)
  )
}
