# React + TypeScript + Vite

pesapal-frontend/
├── public/                 # Static assets (favicons, logos that don't change)
├── src/
│   ├── api/                # ALL connection logic to your Custom Backend
│   │   ├── axiosClient.ts  # The base configuration (Base URL, Timeouts)
│   │   └── patientApi.ts   # Specific calls: getPatients(), addPatient()
│   │
│   ├── assets/             # Images, SVGs, Fonts imported into components
│   │
│   ├── components/         # Reusable UI parts (The "Lego Bricks")
│   │   ├── common/         # Dumb components (Buttons, Inputs, Cards, Loaders)
│   │   ├── layout/         # Structure components (Navbar, Sidebar, Footer)
│   │   └── features/       # Complex components specific to a feature (PatientForm)
│   │
│   ├── context/            # Global State (e.g., ToastNotifications, AuthContext)
│   │
│   ├── pages/              # The actual "Screens" the user visits
│   │   ├── Dashboard.tsx   # The main landing page
│   │   ├── AddPatient.tsx  # The page to input data
│   │   └── NotFound.tsx    # 404 Page
│   │
│   ├── router/             # Routing Logic
│   │   └── index.tsx       # Where you define paths like /dashboard, /add
│   │
│   ├── types/              # TypeScript Interfaces (The "Contracts")
│   │   └── patient.ts      # export interface Patient { id: string; name: string... }
│   │
│   ├── utils/              # Helper functions (Math, Date formatting)
│   │   └── formatDate.ts
│   │
│   ├── App.tsx             # The Root Component
│   ├── main.tsx            # Entry Point
│   └── index.css           # Tailwind imports
│
├── .env                    # Environment variables (VITE_API_URL=...)
├── tailwind.config.js      # Tailwind settings
└── tsconfig.json           # TypeScript settings