import { useEffect, useMemo, useRef, useState } from 'react'
import { projects } from '../../data/projects'
import ProjectDetails from './ProjectDetails'
import './ProjectsApp.css'

function ProjectsApp() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '')
  const [mobileDetailVisible, setMobileDetailVisible] = useState(false)
  const backButtonRef = useRef(null)
  const projectButtonRefs = useRef(new Map())
  const focusFrameRef = useRef(null)
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) || projects[0],
    [selectedProjectId],
  )

  useEffect(() => {
    return () => {
      if (focusFrameRef.current !== null) {
        window.cancelAnimationFrame(focusFrameRef.current)
      }
    }
  }, [])

  function scheduleFocus(getTarget) {
    if (focusFrameRef.current !== null) {
      window.cancelAnimationFrame(focusFrameRef.current)
    }

    focusFrameRef.current = window.requestAnimationFrame(() => {
      focusFrameRef.current = null
      getTarget()?.focus({ preventScroll: true })
    })
  }

  function handleSelectProject(projectId) {
    setSelectedProjectId(projectId)
    setMobileDetailVisible(true)
    scheduleFocus(() => backButtonRef.current)
  }

  function handleBackToProjects() {
    setMobileDetailVisible(false)
    scheduleFocus(() => projectButtonRefs.current.get(selectedProjectId))
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
              ref={(element) => {
                if (element) {
                  projectButtonRefs.current.set(project.id, element)
                } else {
                  projectButtonRefs.current.delete(project.id)
                }
              }}
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
        <button ref={backButtonRef} type="button" onClick={handleBackToProjects}>
          Back to Projects
        </button>
      </div>

      <ProjectDetails project={selectedProject} />
    </div>
  )
}

export default ProjectsApp
