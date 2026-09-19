import AboutApp from './About/AboutApp'
import GalleryApp from './Gallery/GalleryApp'
import MemoryGameApp from './MemoryGame/MemoryGameApp'
import MusicApp from './Music/MusicApp'
import NotesApp from './Notes/NotesApp'
import PaintApp from './Paint/PaintApp'
import ProjectsApp from './Projects/ProjectsApp'
import SettingsApp from './Settings/SettingsApp'
import SkillsApp from './Skills/SkillsApp'
import TerminalApp from './Terminal/TerminalApp'
import TrashApp from './Trash/TrashApp'

const applicationComponents = {
  about: AboutApp,
  gallery: GalleryApp,
  memory: MemoryGameApp,
  music: MusicApp,
  notes: NotesApp,
  paint: PaintApp,
  projects: ProjectsApp,
  skills: SkillsApp,
  terminal: TerminalApp,
  trash: TrashApp,
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
