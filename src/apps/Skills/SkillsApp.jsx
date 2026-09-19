import { skills } from '../../data/skills'
import './SkillsApp.css'

function groupSkillsByCategory(items) {
  return items.reduce((groups, skill) => {
    const category = skill.category || 'General'

    return {
      ...groups,
      [category]: [...(groups[category] || []), skill],
    }
  }, {})
}

function SkillsApp() {
  const groupedSkills = groupSkillsByCategory(skills)
  const categories = Object.entries(groupedSkills)

  if (skills.length === 0) {
    return (
      <div className="skills-app skills-empty app-viewport">
        <p>No skills configured yet.</p>
      </div>
    )
  }

  return (
    <div className="skills-app app-viewport">
      <header className="skills-header">
        <p>System Capabilities</p>
        <h2>Developer Stack</h2>
      </header>

      <section className="skills-summary" aria-label="Skill summary">
        <div>
          <span>{skills.length}</span>
          <p>Configured skills</p>
        </div>
        <div>
          <span>{categories.length}</span>
          <p>Capability groups</p>
        </div>
      </section>

      <div className="skills-category-list">
        {categories.map(([category, categorySkills]) => (
          <section key={category} className="skills-category" aria-labelledby={`skill-${category}`}>
            <h3 id={`skill-${category}`}>{category}</h3>
            <div className="skills-table" role="list">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="skills-row" role="listitem">
                  <span>{skill.name}</span>
                  <strong>{skill.level}</strong>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default SkillsApp
