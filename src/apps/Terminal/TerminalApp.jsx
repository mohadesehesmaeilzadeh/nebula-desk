import { useEffect, useRef, useState } from 'react'
import { executeCommand } from './commands'
import './TerminalApp.css'

const initialEntries = [
  {
    id: 'welcome',
    command: null,
    output: ['Nebula Terminal v1.0', '', 'Type "help" to see available commands.'],
  },
]

function TerminalApp({ onOpenApplication }) {
  const [entries, setEntries] = useState(initialEntries)
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [entries])

  function runAction(action) {
    if (action?.type === 'OPEN_APP') {
      onOpenApplication?.(action.appId)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const submittedInput = input.trim()

    if (!submittedInput) {
      return
    }

    const result = executeCommand(submittedInput)
    const entry = {
      id: `${Date.now()}-${submittedInput}`,
      command: submittedInput,
      output: result.output,
    }

    setCommandHistory((history) => [...history, submittedInput])
    setHistoryIndex(null)
    setInput('')

    if (result.shouldClear) {
      setEntries([])
    } else {
      setEntries((currentEntries) => [...currentEntries, entry])
    }

    runAction(result.action)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
      if (commandHistory.length === 0) {
        return
      }

      event.preventDefault()
      const nextIndex =
        historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(commandHistory[nextIndex])
    }

    if (event.key === 'ArrowDown') {
      if (commandHistory.length === 0 || historyIndex === null) {
        return
      }

      event.preventDefault()

      if (historyIndex >= commandHistory.length - 1) {
        setHistoryIndex(null)
        setInput('')
        return
      }

      const nextIndex = historyIndex + 1
      setHistoryIndex(nextIndex)
      setInput(commandHistory[nextIndex])
    }
  }

  return (
    <div className="terminal-app app-viewport" onClick={() => inputRef.current?.focus()}>
      <div
        className="terminal-output"
        role="log"
        aria-label="Terminal output"
        aria-live="polite"
        aria-relevant="additions text"
      >
        {entries.map((entry) => (
          <div key={entry.id} className="terminal-entry">
            {entry.command && (
              <p className="terminal-command-line">
                <span>guest@nebula:~$</span> {entry.command}
              </p>
            )}
            {entry.output.map((line, index) => (
              <p key={`${entry.id}-${index}`} className="terminal-output-line">
                {line || '\u00a0'}
              </p>
            ))}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form className="terminal-input-row" onSubmit={handleSubmit}>
        <span aria-hidden="true">guest@nebula:~$</span>
        <label className="visually-hidden" htmlFor="terminal-command-input">
          Terminal command
        </label>
        <input
          ref={inputRef}
          id="terminal-command-input"
          type="text"
          value={input}
          autoComplete="off"
          spellCheck="false"
          onChange={(event) => {
            setInput(event.target.value)
            setHistoryIndex(null)
          }}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  )
}

export default TerminalApp
