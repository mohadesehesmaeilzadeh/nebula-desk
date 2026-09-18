import { useMemo, useState } from 'react'
import { projects } from '../../data/projects'
import ProjectDetails from './ProjectDetails'
import './ProjectsApp.css'

function ProjectsApp() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '')
  const [mobileDetailVisible, setMobileDetailVisible] = useState(false)
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) || projects[0],
    [selectedProjectId],
  )

  function handleSelectProject(projectId) {
    setSelectedProjectId(projectId)
    setMobileDetailVisible(true)
  }

  if (projects.length === 0) {
    return (
      <div className="projects-app projects-app-empty app-viewport">
        <p>No projects configured yet.</p>
      </div>
    )
  }

  return (
    <div className="projects-app app-viewport" data-detail-visible={mobileDetailVisible ? 'true' : 'false'}>
      <section className="project-list-pane" aria-labelledby="project-list-title">
        <div className="project-list-heading">
          <p>Project Explorer</p>
          <h2 id="project-list-title">Projects</h2>
        </div>
        <div className="project-list" role="list">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className="project-list-item"
              data-selected={selectedProject?.id === project.id ? 'true' : 'false'}
              aria-pressed={selectedProject?.id === project.id}
              onClick={() => handleSelectProject(project.id)}
            >
              <span>{project.name}</span>
              <small>{project.shortDescription || 'Description pending'}</small>
            </button>
          ))}
        </div>
      </section>

      <div className="project-mobile-toolbar">
        <button type="button" onClick={() => setMobileDetailVisible(false)}>
          Back to Projects
        </button>
      </div>

      <ProjectDetails project={selectedProject} />
    </div>
  )
}

export default ProjectsApp
