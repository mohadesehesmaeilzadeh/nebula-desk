import { useEffect, useRef, useState } from 'react'
import {
  createMemoryDeck,
  formatGameTime,
  isBetterScore,
  loadBestScore,
  saveBestScore,
} from './gameData'
import './MemoryGameApp.css'

const MISMATCH_DELAY = 700

function MemoryGameApp() {
  const [cards, setCards] = useState(createMemoryDeck)
  const [flippedCardIds, setFlippedCardIds] = useState([])
  const [matchedCardIds, setMatchedCardIds] = useState([])
  const [moves, setMoves] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [gameStatus, setGameStatus] = useState('ready')
  const [bestScore, setBestScore] = useState(loadBestScore)
  const comparisonTimeoutRef = useRef(null)

  useEffect(() => {
    if (gameStatus !== 'running') {
      return undefined
    }

    const timerId = window.setInterval(() => {
      setElapsedTime((currentTime) => currentTime + 1)
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [gameStatus])

  useEffect(() => {
    return () => {
      if (comparisonTimeoutRef.current) {
        window.clearTimeout(comparisonTimeoutRef.current)
      }
    }
  }, [])

  function startNewGame() {
    if (comparisonTimeoutRef.current) {
      window.clearTimeout(comparisonTimeoutRef.current)
      comparisonTimeoutRef.current = null
    }

    setCards(createMemoryDeck())
    setFlippedCardIds([])
    setMatchedCardIds([])
    setMoves(0)
    setElapsedTime(0)
    setGameStatus('ready')
  }

  function completeGame(nextMoves) {
    const result = { moves: nextMoves, time: Math.max(1, elapsedTime) }

    setGameStatus('won')
    setBestScore((currentBest) => {
      if (!isBetterScore(result, currentBest)) {
        return currentBest
      }

      saveBestScore(result)
      return result
    })
  }

  function handleCardClick(card) {
    if (
      gameStatus === 'won' ||
      flippedCardIds.length >= 2 ||
      flippedCardIds.includes(card.id) ||
      matchedCardIds.includes(card.id)
    ) {
      return
    }

    if (gameStatus === 'ready') {
      setGameStatus('running')
    }

    const nextFlippedCardIds = [...flippedCardIds, card.id]
    setFlippedCardIds(nextFlippedCardIds)

    if (nextFlippedCardIds.length < 2) {
      return
    }

    const firstCard = cards.find((item) => item.id === nextFlippedCardIds[0])
    const nextMoves = moves + 1
    setMoves(nextMoves)

    if (firstCard?.pairId === card.pairId) {
      const nextMatchedCardIds = [...matchedCardIds, ...nextFlippedCardIds]
      setMatchedCardIds(nextMatchedCardIds)
      setFlippedCardIds([])

      if (nextMatchedCardIds.length === cards.length) {
        completeGame(nextMoves)
      }
      return
    }

    comparisonTimeoutRef.current = window.setTimeout(() => {
      setFlippedCardIds([])
      comparisonTimeoutRef.current = null
    }, MISMATCH_DELAY)
  }

  return (
    <div className="memory-game app-viewport">
      <header className="memory-header">
        <div>
          <p>Pattern protocol</p>
          <h2>Memory Game</h2>
        </div>
        <button type="button" onClick={startNewGame}>
          New Game
        </button>
      </header>

      <section className="memory-scoreboard" aria-label="Game score">
        <div>
          <span>Moves</span>
          <strong>{moves}</strong>
        </div>
        <div>
          <span>Time</span>
          <strong>{formatGameTime(elapsedTime)}</strong>
        </div>
        <div>
          <span>Best</span>
          <strong>
            {bestScore ? `${bestScore.moves} / ${formatGameTime(bestScore.time)}` : '--'}
          </strong>
        </div>
      </section>

      <div className="memory-board" aria-label="Memory cards">
        {cards.map((card, index) => {
          const isFlipped = flippedCardIds.includes(card.id)
          const isMatched = matchedCardIds.includes(card.id)
          const isRevealed = isFlipped || isMatched

          return (
            <button
              key={card.id}
              className="memory-card"
              type="button"
              data-pair-id={card.pairId}
              data-revealed={isRevealed ? 'true' : 'false'}
              data-matched={isMatched ? 'true' : 'false'}
              disabled={isMatched || isFlipped || flippedCardIds.length >= 2 || gameStatus === 'won'}
              aria-label={isRevealed ? `${card.label}, card ${index + 1}` : `Hidden card ${index + 1}`}
              onClick={() => handleCardClick(card)}
            >
              <span className="memory-card-inner" aria-hidden="true">
                <span className="memory-card-back">ND</span>
                <span className="memory-card-face">
                  <strong>{card.mark}</strong>
                  <small>{card.label}</small>
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <footer className="memory-status" aria-live="polite">
        {gameStatus === 'ready' && <span>Flip a card to start the timer.</span>}
        {gameStatus === 'running' && <span>Match every pair to complete the grid.</span>}
        {gameStatus === 'won' && (
          <div className="memory-win">
            <div>
              <strong>Grid complete</strong>
              <span>You finished in {moves} moves and {formatGameTime(Math.max(1, elapsedTime))}.</span>
            </div>
            <button type="button" onClick={startNewGame}>Play Again</button>
          </div>
        )}
      </footer>
    </div>
  )
}

export default MemoryGameApp
