import SystemShell from './components/System/SystemShell'
import { PreferencesProvider } from './context/PreferencesContext'

function App() {
  return (
    <PreferencesProvider>
      <SystemShell />
    </PreferencesProvider>
  )
}

export default App
