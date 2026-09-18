import { usePreferences } from '../../context/PreferencesContext'
import './SettingsApp.css'

const themeOptions = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
]

const accentOptions = [
  { id: 'cyan', label: 'Cyan' },
  { id: 'purple', label: 'Purple' },
  { id: 'blue', label: 'Blue' },
]

function RadioOption({ name, value, checked, label, onChange }) {
  return (
    <label className="settings-radio-option">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span>{label}</span>
    </label>
  )
}

function ToggleOption({ id, label, checked, onChange, description }) {
  return (
    <label className="settings-toggle-option" htmlFor={id}>
      <span>
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  )
}

function SettingsApp() {
  const {
    preferences,
    setTheme,
    setAccent,
    setAnimationsEnabled,
    setSoundEnabled,
  } = usePreferences()

  return (
    <div className="settings-app app-viewport">
      <header className="settings-header">
        <p>Control Center</p>
        <h2>Runtime Settings</h2>
      </header>

      <section className="settings-section" aria-labelledby="settings-appearance-title">
        <div>
          <p>Appearance</p>
          <h3 id="settings-appearance-title">Desktop Look</h3>
        </div>

        <fieldset className="settings-fieldset">
          <legend>Theme</legend>
          <div className="settings-option-grid">
            {themeOptions.map((option) => (
              <RadioOption
                key={option.id}
                name="theme"
                value={option.id}
                label={option.label}
                checked={preferences.theme === option.id}
                onChange={setTheme}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="settings-fieldset">
          <legend>Accent color</legend>
          <div className="settings-option-grid settings-accent-grid">
            {accentOptions.map((option) => (
              <RadioOption
                key={option.id}
                name="accent"
                value={option.id}
                label={option.label}
                checked={preferences.accent === option.id}
                onChange={setAccent}
              />
            ))}
          </div>
        </fieldset>
      </section>

      <section className="settings-section" aria-labelledby="settings-system-title">
        <div>
          <p>System</p>
          <h3 id="settings-system-title">Session Preferences</h3>
        </div>

        <ToggleOption
          id="settings-animations"
          label="Animations"
          description="Decorative motion during this session"
          checked={preferences.animationsEnabled}
          onChange={setAnimationsEnabled}
        />
        <ToggleOption
          id="settings-sound"
          label="Sound"
          description="Ready for future NebulaDesk audio feedback"
          checked={preferences.soundEnabled}
          onChange={setSoundEnabled}
        />
      </section>
    </div>
  )
}

export default SettingsApp
