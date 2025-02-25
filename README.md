```
src/
│
├── assets/               # Static assets like images, fonts, etc.
│   ├── images/           # Images
│   ├── fonts/            # Font files (e.g., Poppins, Raleway, etc.)
│   └── icons/            # SVG or other icon files
│
├── components/           # Reusable UI components
│   ├── Common/           # Shared components (e.g., buttons, inputs)
│   ├── Layout/           # Layout-related components (Sidebar, TopBar, etc.)
│   ├── Modals/           # Modal components (ConfigModal, IntroModal)
│   ├── Dashboard/        # Specific dashboard components
│   ├── ErrorBoundary/    # Error boundary wrapper
│   └── Loader/           # Loading indicators
│
├── features/             # Feature-specific logic (state, API calls, components)
│   ├── Dashboard/        # Dashboard-specific state and logic
│   ├── Profile/          # Profile-specific state and logic
│   └── Youtube/          # Youtube-related state and logic
│
├── data/                 # Static or dynamic data files (e.g., JSON)
│
├── hooks/                # Custom React hooks
│
├── layouts/              # Application-wide layouts (e.g., dashboard, auth layouts)
│
├── pages/                # Pages/Routes in the application
│   ├── DashboardPage.jsx # Example page
│   └── OtherPage.jsx     # Other pages
│
├── services/             # API services (e.g., fetchers, Axios instance, API utilities)
│   └── api.js            # API integration logic
│
├── slices/               # Redux slices or application state management
│
├── styles/               # Global and component-level styles
│   ├── global.css        # Global styles
│   ├── variables.css     # CSS variables (colors, fonts)
│   └── components/       # Scoped styles for components
│
├── utils/                # Utility functions (e.g., helpers, constants)
│
├── App.jsx               # Main application component
├── Routes.jsx            # Route definitions
├── main.jsx              # Entry point
├── index.html            # Base HTML file
├── .env                  # Environment variables
│
├── .gitignore            # Git ignore file
├── eslint.config.js      # Linter configuration
├── package.json          # Node package manager file
└── README.md             # Project documentation
```