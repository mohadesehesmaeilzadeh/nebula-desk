import { applications } from '../../data/applications'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'
import { socials } from '../../data/socials'

const applicationById = new Map(applications.map((app) => [app.id, app]))

const commandDescriptions = [
  ['help', 'Show available commands'],
  ['about', 'Show developer information'],
  ['skills', 'List technical skills'],
  ['projects', 'List portfolio projects'],
  ['contact', 'Show contact information'],
  ['socials', 'Show social links'],
  ['date', 'Show local date and time'],
  ['whoami', 'Show current identity'],
  ['clear', 'Clear terminal output'],
  ['open <app>', 'Open a NebulaDesk application'],
]

export function parseCommand(input) {
  const normalizedInput = input.trim().replace(/\s+/g, ' ')

  if (!normalizedInput) {
    return {
      command: '',
      args: [],
    }
  }

  const [command, ...args] = normalizedInput.split(' ')

  return {
    command: command.toLowerCase(),
    args: args.map((arg) => arg.toLowerCase()),
  }
}

function formatList(items, fallback) {
  return items.length > 0 ? items : [fallback]
}

function help() {
  const rows = commandDescriptions.map(
    ([command, description]) => `${command.padEnd(18, ' ')}${description}`,
  )

  return ['Available commands:', '', ...rows]
}

function about() {
  return [
    profile.name || 'Portfolio profile',
    `${profile.title}`,
    '',
    profile.shortBio,
    profile.location ? `Location: ${profile.location}` : null,
  ].filter(Boolean)
}

function listSkills() {
  return formatList(
    skills.map((skill) => `${skill.name.padEnd(20, ' ')}${skill.level} (${skill.category})`),
    'No skills configured yet.',
  )
}

function listProjects() {
  return formatList(
    projects.map((project) =>
      project.shortDescription ? `${project.name}: ${project.shortDescription}` : project.name,
    ),
    'No projects configured yet.',
  )
}

function contact() {
  const contactLines = []

  if (profile.contact?.email) {
    contactLines.push(`Email: ${profile.contact.email}`)
  }

  if (profile.location) {
    contactLines.push(`Location: ${profile.location}`)
  }

  const configuredSocials = socials.filter((social) => social.url)

  configuredSocials.forEach((social) => {
    contactLines.push(`${social.label}: ${social.url}`)
  })

  return formatList(contactLines, 'No public contact details are listed.')
}

function listSocials() {
  const configuredSocials = socials.filter((social) => social.url)

  if (configuredSocials.length === 0) {
    return ['No public social links are listed.']
  }

  return configuredSocials.map((social) => `${social.label}: ${social.url}`)
}

function date() {
  return [
    new Intl.DateTimeFormat(undefined, {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(new Date()),
  ]
}

function whoami() {
  return [profile.name ? `${profile.name} - ${profile.title}` : profile.title]
}

function open(args) {
  const appId = args[0]

  if (!appId) {
    return {
      output: ['Usage: open <app>', `Available apps: ${applications.map((app) => app.id).join(', ')}`],
    }
  }

  const app = applicationById.get(appId)

  if (!app) {
    return {
      output: [
        `Application not found: ${appId}`,
        `Available apps: ${applications.map((application) => application.id).join(', ')}`,
      ],
    }
  }

  return {
    output: [`Opening ${app.name}...`],
    action: {
      type: 'OPEN_APP',
      appId: app.id,
    },
  }
}

const commandHandlers = {
  help: () => ({ output: help() }),
  about: () => ({ output: about() }),
  skills: () => ({ output: listSkills() }),
  projects: () => ({ output: listProjects() }),
  contact: () => ({ output: contact() }),
  socials: () => ({ output: listSocials() }),
  date: () => ({ output: date() }),
  whoami: () => ({ output: whoami() }),
  clear: () => ({
    output: [],
    shouldClear: true,
  }),
  open,
}

export function executeCommand(input) {
  const parsedCommand = parseCommand(input)

  if (!parsedCommand.command) {
    return {
      output: [],
    }
  }

  const handler = commandHandlers[parsedCommand.command]

  if (!handler) {
    return {
      output: [
        `Command not found: ${parsedCommand.command}`,
        '',
        'Type "help" to see available commands.',
      ],
    }
  }

  return handler(parsedCommand.args)
}
