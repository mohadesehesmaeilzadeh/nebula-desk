import lockScreenImage from '../assets/gallery/lock-screen.png'
import startupImage from '../assets/gallery/startup-sequence.png'

export const projects = [
  {
    id: 'nebuladesk',
    name: 'NebulaDesk',

    shortDescription:
      'Interactive desktop-style portfolio built with React and Vite.',

    description:
      'NebulaDesk is a frontend-only interactive portfolio designed as a fictional desktop operating system. It features a reusable window management system, multiple local applications, persistent user preferences, responsive desktop and mobile interaction models, keyboard navigation, and accessibility-focused controls. The project was built without a backend and focuses on reusable architecture, browser APIs, state management, responsive UI design, and production-quality frontend engineering.',

    technologies: [
      'React',
      'JavaScript',
      'CSS',
      'Vite',
      'LocalStorage',
      'Canvas API',
      'Web Audio API',
      'Pointer Events',
    ],

    features: [
      'Complete boot, lock, sleep, restart, shutdown, and power-on system flow',
      'Reusable window manager with open, close, minimize, restore, maximize, and focus behavior',
      'Desktop environment with application icons, taskbar, Start Menu, and active-window management',
      'Eleven local applications including Terminal, Notes, Gallery, Music Player, Paint, Settings, and Memory Game',
      'Shared application registry used across the desktop, Start Menu, taskbar, Terminal, and window renderer',
      'Responsive application system with floating desktop windows and fullscreen mobile applications',
      'Versioned browser persistence for preferences, notes, music volume, and game scores',
      'Dark and light themes with multiple accent color options',
      'Global keyboard shortcuts for navigation and application launching',
      'Reduced-motion support and accessibility-focused keyboard interactions',
      'Canvas-based drawing experience using native Pointer Events',
      'Frontend-only architecture with no backend, database, authentication service, or API keys',
    ],

    challenges: [
      'Designing a reusable window management system without coupling applications to desktop behavior',
      'Keeping application-specific state separate from global system and window state',
      'Supporting desktop-style floating windows and mobile fullscreen applications through the same architecture',
      'Managing focus correctly across windows, menus, dialogs, and keyboard interactions',
      'Deciding which state should persist between sessions and which system state should reset',
      'Building accessible interactions for an operating-system-inspired interface',
      'Using native browser APIs for drawing, audio, persistence, keyboard controls, and pointer interactions',
      'Keeping the application architecture scalable as more desktop applications were introduced',
    ],

    githubUrl:
      'https://github.com/mohadesehesmaeilzadeh/nebula-desk',

    liveUrl: '',

    screenshots: [
      {
        src: startupImage,
        alt: 'NebulaDesk startup screen showing the boot sequence and Skip Boot control',
      },
      {
        src: lockScreenImage,
        alt: 'NebulaDesk lock screen displaying the current time and Enter Desktop button',
      },
    ],
  },

  {
    id: 'nextstore',
    name: 'NextStore',

    shortDescription:
      'Responsive e-commerce project built with Next.js App Router and automated testing.',

    description:
      'NextStore is a responsive e-commerce frontend built with Next.js and React. It explores App Router fundamentals, dynamic product routes, reusable UI components, CSS-in-JS styling, responsive layouts, and automated testing across unit, integration, and end-to-end levels.',

    technologies: [
      'Next.js',
      'React',
      'JavaScript',
      'styled-components',
      'Jest',
      'React Testing Library',
      'Playwright',
    ],

    features: [
      'Responsive storefront with reusable product cards and layouts',
      'Dynamic product detail pages using Next.js App Router',
      'Reusable header, footer, navigation, and mobile menu components',
      'Frontend contact form validation',
      'Jest and React Testing Library test suite',
      'Playwright end-to-end browser testing',
      'Server-side styled-components integration',
    ],

    challenges: [
      'Structuring reusable components around the Next.js App Router',
      'Supporting styled-components correctly with server-side rendering',
      'Combining unit, integration, and end-to-end testing strategies',
    ],

    githubUrl:
      'https://github.com/mohadesehesmaeilzadeh/nextjs-store',

    liveUrl: '',

    screenshots: [],
  },

  {
    id: 'bookloom',
    name: 'Bookloom',

    shortDescription:
      'RTL personal library manager for tracking books, reading progress, and wishlists.',

    description:
      'Bookloom is a Persian right-to-left personal library manager built with React and Vite. It provides complete book-management workflows, reading progress tracking, recommendations, customizable preferences, and local-first data persistence without requiring a backend or user account.',

    technologies: [
      'React',
      'JavaScript',
      'React Router',
      'Vite',
      'CSS',
      'LocalStorage',
    ],

    features: [
      'Complete book CRUD and routed book detail pages',
      'Reading workflow with start, pause, resume, finish, and abandon actions',
      'Reading progress tracking by page and percentage',
      'Wishlist management with priority and purchase conversion',
      'Search, filtering, sorting, and grid/list layouts',
      'Notes, ratings, reviews, and saved quotes',
      'Reading goals and local recommendation logic',
      'JSON backup, restore, merge, and duplicate handling',
      'Light, dark, and system themes with personalization settings',
      'Responsive Persian RTL interface',
    ],

    challenges: [
      'Designing reliable local-first persistence without a backend',
      'Managing several interconnected book statuses and workflows',
      'Keeping storage and normalization logic outside page components',
      'Supporting backup migration and duplicate resolution safely',
    ],

    githubUrl:
      'https://github.com/mohadesehesmaeilzadeh/bookloom',

    liveUrl: '',

    screenshots: [],
  },

  {
    id: 'crypto-price-tracker',
    name: 'Crypto Price Tracker',

    shortDescription:
      'React dashboard for tracking cryptocurrency market data from Kraken.',

    description:
      'Crypto Price Tracker is a responsive React application that retrieves cryptocurrency market data from the Kraken Public REST API. It demonstrates API integration, asynchronous data handling, search, loading and error states, scheduled refresh behavior, and reusable frontend components.',

    technologies: [
      'React',
      'JavaScript',
      'CSS',
      'Kraken REST API',
      'Fetch API',
    ],

    features: [
      'Live market data for BTC, ETH, SOL, and ADA',
      'Current price, 24-hour high, low, and trading volume',
      'Real-time cryptocurrency filtering and search',
      'Manual market-data refresh',
      'Automatic refresh every 30 seconds',
      'Loading and error states',
      'Last-updated timestamp',
      'Responsive card-based interface',
    ],

    challenges: [
      'Normalizing different Kraken API response keys',
      'Managing simultaneous asynchronous API requests',
      'Implementing polling without leaking timers or effects',
      'Presenting financial data clearly across screen sizes',
    ],

    githubUrl:
      'https://github.com/mohadesehesmaeilzadeh/crypto-price-tracker',

    liveUrl: '',

    screenshots: [],
  },

  {
    id: 'react-survey-app',
    name: 'React Survey App',

    shortDescription:
      'Multi-step survey with persistent answers, validation, animations, and a countdown timer.',

    description:
      'React Survey App is a multi-step questionnaire that collects user information and presents one question at a time. It focuses on form state, validation, persistent browser state, timed interactions, animated transitions, and responsive user experience.',

    technologies: [
      'React',
      'JavaScript',
      'Bootstrap',
      'React-Bootstrap',
      'Framer Motion',
      'LocalStorage',
    ],

    features: [
      'Multiple survey question types',
      'Previous and Next question navigation',
      'Editable previous answers',
      'Two-minute countdown timer',
      'Persistent timer, answers, and current question after refresh',
      'Form validation',
      'Animated question transitions',
      'Progress indicator',
      'Automatic submission when time expires',
      'Restart and new-survey flow',
    ],

    challenges: [
      'Keeping timer state accurate across browser refreshes',
      'Synchronizing answers and current-question state with LocalStorage',
      'Handling automatic submission and normal submission through one flow',
    ],

    githubUrl:
      'https://github.com/mohadesehesmaeilzadeh/react-survey-app',

    liveUrl: '',

    screenshots: [],
  },

  {
    id: 'webpack-todo',
    name: 'Webpack Todo',

    shortDescription:
      'React and GraphQL Todo application configured manually with Webpack and Babel.',

    description:
      'Webpack Todo is a React application built without CRA, Vite, or Next.js. The project focuses on understanding frontend tooling by configuring Webpack, Babel, loaders, development tooling, production optimization, and Apollo Client manually.',

    technologies: [
      'React',
      'Webpack',
      'Babel',
      'GraphQL',
      'Apollo Client',
      'GraphQLZero',
      'CSS',
    ],

    features: [
      'Manual React and Webpack configuration',
      'JSX transformation with Babel',
      'Webpack Dev Server with Hot Module Replacement',
      'GraphQL queries through Apollo Client',
      'Todo fetching, adding, toggling, and deleting',
      'All, Active, and Completed filtering',
      'Production minification and code splitting',
      'Responsive interface',
    ],

    challenges: [
      'Configuring the frontend toolchain without a framework abstraction',
      'Integrating Apollo Client into a manually configured React application',
      'Managing development and production Webpack behavior separately',
    ],

    githubUrl:
      'https://github.com/mohadesehesmaeilzadeh/webpack-todo',

    liveUrl: '',

    screenshots: [],
  },

  {
    id: 'stm32-mastermind',
    name: 'STM32 Mastermind Game',

    shortDescription:
      'Embedded Mastermind bomb-defusal game built around an STM32F401 microcontroller.',

    description:
      'An embedded systems project that transforms the classic Mastermind game into a timed bomb-defusal challenge. The project combines game logic with STM32 peripherals, serial communication, displays, interrupts, LEDs, a buzzer, Proteus simulation, and a browser-based visualization.',

    technologies: [
      'C',
      'STM32',
      'STM32CubeIDE',
      'USART',
      'TIM2',
      'EXTI',
      'Proteus',
      'HTML',
      'CSS',
      'JavaScript',
    ],

    features: [
      'Random four-digit Mastermind game logic',
      'Serial-terminal guess input through USART',
      'LCD feedback for game state and guesses',
      'Seven-segment countdown display',
      'Timer-driven gameplay',
      'External interrupt rescue button',
      'LED indicators and buzzer feedback',
      'Proteus hardware simulation',
      'Frontend browser demo for project presentation',
    ],

    challenges: [
      'Combining several microcontroller peripherals inside one application',
      'Managing time-sensitive behavior using interrupts',
      'Implementing Mastermind feedback correctly for repeated digits',
      'Making an embedded project understandable without requiring hardware or Proteus',
    ],

    githubUrl:
      'https://github.com/mohadesehesmaeilzadeh/stm32-mastermind-game',

    liveUrl: '',

    screenshots: [],
  },

  {
    id: 'verilog-vending-machine',
    name: 'Verilog Vending Machine FSM',

    shortDescription:
      'Finite-state-machine vending controller implemented in Verilog and tested with ModelSim.',

    description:
      'A Digital Systems Lab project implementing a vending machine controller as a finite state machine in Verilog. The design handles coin input, product selection, insufficient funds, invalid selections, change, and refunds, with ModelSim verification and an interactive web visualization of the state machine.',

    technologies: [
      'Verilog',
      'ModelSim',
      'Finite State Machines',
      'Digital Logic',
      'HTML',
      'CSS',
      'JavaScript',
    ],

    features: [
      'Five-state vending-machine controller',
      'Three products with different prices',
      'Coin and balance handling',
      'Invalid-selection handling',
      'Insufficient-funds behavior',
      'Change and refund logic',
      'ModelSim testbench',
      'Interactive FSM browser visualization',
    ],

    challenges: [
      'Designing predictable synchronous state transitions',
      'Coordinating balance updates and output signals across clock cycles',
      'Verifying edge cases through simulation',
      'Turning HDL behavior into an understandable visual demonstration',
    ],

    githubUrl:
      'https://github.com/mohadesehesmaeilzadeh/verilog-vending-machine-fsm',

    liveUrl: '',

    screenshots: [],
  },

  {
    id: 'stm32-digital-clock',
    name: 'STM32 Digital Clock',

    shortDescription:
      'Interrupt-driven digital clock using STM32 and a multiplexed seven-segment display.',

    description:
      'An STM32F401RE digital clock developed using direct register programming, TIM2 interrupts, and multiplexed seven-segment display control. A browser-based demo was also created to visualize the timer and multiplexing concepts.',

    technologies: [
      'C',
      'STM32',
      'TIM2',
      'GPIO',
      'Proteus',
      'HTML',
      'CSS',
      'JavaScript',
    ],

    features: [
      'Timer-interrupt-based timekeeping',
      'Direct STM32 register programming',
      'Four-digit multiplexed seven-segment display',
      'Minute and second tracking from 00:00 to 59:59',
      'Proteus circuit simulation',
      'Interactive browser demonstration',
    ],

    challenges: [
      'Configuring TIM2 accurately for millisecond interrupts',
      'Driving a multiplexed display without blocking delays',
      'Managing low-level GPIO and timer registers directly',
    ],

    githubUrl:
      'https://github.com/mohadesehesmaeilzadeh/stm32-digital-clock',

    liveUrl:
      'https://mohadesehesmaeilzadeh.github.io/stm32-digital-clock/web_demo/',

    screenshots: [],
  },

  {
    id: 'stm32-lcd-stopwatch',
    name: 'STM32 LCD Stopwatch',

    shortDescription:
      'Register-level STM32 stopwatch with LCD, timer interrupts, controls, LED, and buzzer.',

    description:
      'An embedded stopwatch built around the STM32F401VETx using register-level peripheral configuration. It combines interrupt-driven timing, LCD output, physical controls, LED behavior, buzzer feedback, Proteus simulation, and an interactive browser demo.',

    technologies: [
      'C',
      'STM32',
      'TIM2',
      'GPIO',
      'LCD',
      'Proteus',
      'HTML',
      'CSS',
      'JavaScript',
    ],

    features: [
      'Millisecond timing using TIM2 interrupts',
      '16x2 LCD stopwatch display',
      'Start and pause button controls',
      'Adjustable LED blinking behavior',
      'Buzzer feedback on timed events',
      'Register-level peripheral configuration',
      'Proteus hardware simulation',
      'Browser-based simulator',
    ],

    challenges: [
      'Maintaining accurate timing while updating several peripherals',
      'Driving the LCD without disrupting timer behavior',
      'Coordinating button, LED, buzzer, and timer interactions',
    ],

    githubUrl:
      'https://github.com/mohadesehesmaeilzadeh/stm32-lcd-stopwatch',

    liveUrl:
      'https://mohadesehesmaeilzadeh.github.io/stm32-lcd-stopwatch/web_demo/',

    screenshots: [],
  },
]