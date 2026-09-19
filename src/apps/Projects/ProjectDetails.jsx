function ResourceLink({ href, children }) {
  if (!href) {
    return null
  }

  return (
    <a className="project-resource-link" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function DetailList({ title, items }) {
  if (!items?.length) {
    return null
  }

  return (
    <section className="project-detail-section">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

function ProjectPreview({ project }) {
  const screenshot = project.screenshots?.[0]

  if (!screenshot?.src) {
    return (
      <div className="project-preview-placeholder" aria-label={`${project.name} preview unavailable`}>
        Preview unavailable
      </div>
    )
  }

  return (
    <img
      src={screenshot.src}
      alt={screenshot.alt || `${project.name} screenshot`}
      loading="lazy"
      decoding="async"
    />
  )
}

function ProjectDetails({ project }) {
  if (!project) {
    return (
      <section className="project-details project-details-empty">
        <p>Select a project to inspect its details.</p>
      </section>
    )
  }

  return (
    <section className="project-details" aria-labelledby="project-details-title">
      <div className="project-detail-header">
        <div>
          <p>Project Details</p>
          <h3 id="project-details-title">{project.name}</h3>
        </div>
        <div className="project-resource-actions">
          <ResourceLink href={project.githubUrl}>GitHub</ResourceLink>
          <ResourceLink href={project.liveUrl}>Live Demo</ResourceLink>
        </div>
      </div>

      <div className="project-preview">
        <ProjectPreview project={project} />
      </div>

      <p className="project-description">{project.description || project.shortDescription}</p>

      {project.technologies?.length > 0 && (
        <div className="project-tech-list" aria-label="Technologies">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      )}

      <DetailList
        title="Features"
        items={project.features}
      />
      <DetailList
        title="Challenges"
        items={project.challenges}
      />
    </section>
  )
}

export default ProjectDetails
