import AboutApp from './About/AboutApp'
import ProjectsApp from './Projects/ProjectsApp'
import SettingsApp from './Settings/SettingsApp'
import SkillsApp from './Skills/SkillsApp'
import TerminalApp from './Terminal/TerminalApp'

const applicationComponents = {
  about: AboutApp,
  projects: ProjectsApp,
  skills: SkillsApp,
  terminal: TerminalApp,
  settings: SettingsApp,
}

function ApplicationRenderer({ appId, onOpenApplication }) {
  const ApplicationComponent = applicationComponents[appId]

  if (!ApplicationComponent) {
    return (
      <div className="application-unavailable" role="status">
        Application unavailable.
      </div>
    )
  }

  return <ApplicationComponent onOpenApplication={onOpenApplication} />
}

export default ApplicationRenderer
