import lockScreenImage from '../assets/gallery/lock-screen.png'
import startupImage from '../assets/gallery/startup-sequence.png'

export const galleryItems = [
  {
    id: 'startup-sequence',
    title: 'Startup Sequence',
    description:
      'NebulaDesk introduces its system identity through a compact boot sequence and live progress state.',
    src: startupImage,
    alt: 'NebulaDesk boot screen with startup progress and Skip Boot control',
    category: 'NebulaDesk',
  },
  {
    id: 'lock-screen',
    title: 'Lock Screen',
    description:
      'The lock screen keeps time, date, and the primary desktop entry action readable across themes and viewport sizes.',
    src: lockScreenImage,
    alt: 'NebulaDesk lock screen showing the time and Enter Desktop button',
    category: 'NebulaDesk',
  },
]
