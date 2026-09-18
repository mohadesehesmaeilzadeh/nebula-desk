import { useState } from 'react'
import { profile } from '../../data/profile'
import { socials } from '../../data/socials'
import './AboutApp.css'

const sections = [
  { id: 'profile', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'interests', label: 'Interests' },
  { id: 'contact', label: 'Contact' },
]

function TimelineList({ items, emptyMessage }) {
  if (!items.length) {
    return <p className="about-empty">{emptyMessage}</p>
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
    return <p className="about-empty">No contact information configured yet.</p>
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
          <TimelineList
            items={profile.experience}
            emptyMessage="Experience details will be added soon."
          />
        </>
      )
    case 'education':
      return (
        <>
          <h3>Education</h3>
          <TimelineList
            items={profile.education}
            emptyMessage="Education details will be added soon."
          />
        </>
      )
    case 'interests':
      return (
        <>
          <h3>Interests</h3>
          {profile.interests.length > 0 ? (
            <ul className="about-chip-list">
              {profile.interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          ) : (
            <p className="about-empty">Interests will be added soon.</p>
          )}
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
          <h3>Developer Identity</h3>
          <p>{profile.shortBio}</p>
          <dl className="about-profile-grid">
            <div>
              <dt>Name</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{profile.title}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{profile.location || 'Not configured yet'}</dd>
            </div>
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
            {profile.name === 'Your Name' ? 'YN' : profile.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p>About Me</p>
            <h2>{profile.name}</h2>
            <span>{profile.title}</span>
          </div>
        </div>
        <div className="about-section-content">{renderSection(activeSection)}</div>
      </section>
    </div>
  )
}

export default AboutApp
