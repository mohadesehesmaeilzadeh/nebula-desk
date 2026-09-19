import { useState } from 'react'
import { profile } from '../../data/profile'
import { socials } from '../../data/socials'
import './AboutApp.css'

const hasContactDetails = Boolean(
  profile.contact?.email ||
  profile.location ||
  socials.some((social) => social.url),
)
const sections = [
  { id: 'profile', label: 'Profile', isVisible: true },
  { id: 'experience', label: 'Experience', isVisible: profile.experience.length > 0 },
  { id: 'education', label: 'Education', isVisible: profile.education.length > 0 },
  { id: 'interests', label: 'Interests', isVisible: profile.interests.length > 0 },
  { id: 'contact', label: 'Contact', isVisible: hasContactDetails },
].filter((section) => section.isVisible)

function TimelineList({ items }) {
  if (!items.length) {
    return null
  }

  return (
    <ul className="about-timeline">
      {items.map((item) => (
        <li key={item.id || item.title}>
          <div>
            <strong>{item.title}</strong>
            {item.organization && <span>{item.organization}</span>}
          </div>
          {item.period && <span>{item.period}</span>}
          {item.summary && <p>{item.summary}</p>}
        </li>
      ))}
    </ul>
  )
}

function ContactPanel() {
  const availableSocials = socials.filter((social) => social.url)
  const hasEmail = Boolean(profile.contact?.email)

  if (!hasEmail && availableSocials.length === 0 && !profile.location) {
    return null
  }

  return (
    <div className="about-contact-list">
      {profile.location && (
        <div>
          <span>Location</span>
          <strong>{profile.location}</strong>
        </div>
      )}
      {hasEmail && (
        <div>
          <span>Email</span>
          <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
        </div>
      )}
      {availableSocials.map((social) => (
        <div key={social.id}>
          <span>{social.label}</span>
          <a href={social.url} target="_blank" rel="noreferrer">
            Open profile
          </a>
        </div>
      ))}
    </div>
  )
}

function renderSection(activeSection) {
  switch (activeSection) {
    case 'experience':
      return (
        <>
          <h3>Experience</h3>
          <TimelineList items={profile.experience} />
        </>
      )
    case 'education':
      return (
        <>
          <h3>Education</h3>
          <TimelineList items={profile.education} />
        </>
      )
    case 'interests':
      return (
        <>
          <h3>Interests</h3>
          <ul className="about-chip-list">
            {profile.interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </>
      )
    case 'contact':
      return (
        <>
          <h3>Contact</h3>
          <ContactPanel />
        </>
      )
    case 'profile':
    default:
      return (
        <>
          <h3>Developer Profile</h3>
          <p>{profile.shortBio}</p>
          <dl className="about-profile-grid">
            {profile.name && (
              <div>
                <dt>Name</dt>
                <dd>{profile.name}</dd>
              </div>
            )}
            {profile.title && (
              <div>
                <dt>Role</dt>
                <dd>{profile.title}</dd>
              </div>
            )}
            {profile.location && (
              <div>
                <dt>Location</dt>
                <dd>{profile.location}</dd>
              </div>
            )}
          </dl>
        </>
      )
  }
}

function AboutApp() {
  const [activeSection, setActiveSection] = useState('profile')

  return (
    <div className="about-app app-viewport">
      <aside className="about-sidebar" aria-label="About sections">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className="about-section-button"
            data-active={activeSection === section.id ? 'true' : 'false'}
            aria-pressed={activeSection === section.id}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </aside>

      <section className="about-panel" aria-live="polite">
        <div className="about-identity">
          <div className="about-avatar" aria-hidden="true">
            {profile.name ? profile.name.slice(0, 2).toUpperCase() : 'ND'}
          </div>
          <div>
            <p>About Me</p>
            <h2>{profile.name || 'Portfolio Profile'}</h2>
            <span>{profile.title}</span>
          </div>
        </div>
        <div className="about-section-content">{renderSection(activeSection)}</div>
      </section>
    </div>
  )
}

export default AboutApp
