import lockScreenImage from '../assets/gallery/lock-screen.png'
import startupImage from '../assets/gallery/startup-sequence.png'

export const projects = [
  {
    id: 'nebuladesk',
    name: 'NebulaDesk',
    shortDescription: 'Frontend-only desktop portfolio shell built with React and Vite.',
    description:
      'NebulaDesk is a completed interactive frontend portfolio presented as a fictional operating-system desktop. It combines local applications, persistent preferences, responsive window behavior, and keyboard-accessible controls without a backend.',
    technologies: ['React', 'JavaScript', 'CSS', 'Vite'],
    features: [
      'Boot, lock, sleep, restart, and shutdown system flow',
      'Desktop icons, taskbar, Start Menu, and reusable windows',
      'Eleven local applications with keyboard and mobile support',
      'Versioned browser persistence for preferences, notes, and game scores',
    ],
    challenges: [
      'Keeping application content separate from the window manager',
      'Supporting desktop windows and mobile fullscreen behavior with one shell',
      'Maintaining accessible focus behavior across layered desktop interactions',
    ],
    githubUrl: '',
    liveUrl: '',
    screenshots: [
      {
        src: startupImage,
        alt: 'NebulaDesk boot screen with startup progress and Skip Boot control',
      },
      {
        src: lockScreenImage,
        alt: 'NebulaDesk lock screen showing the time and Enter Desktop button',
      },
    ],
  },
]
