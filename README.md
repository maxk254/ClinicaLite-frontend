## Clinicalite - Hospital Management Dashboard
A modern, responsive frontend application for managing patient admissions and records. This dashboard serves as the user interface for the Custom Database Challenge, allowing medical staff to admit patients, view the ward list, and discharge patients efficiently.

Built with React, TypeScript, and the all-new Tailwind CSS v4.

### 🚀 Tech Stack
 ** Framework: React + Vite (Fast & Lightweight) 

** Language: TypeScript (Type safety & reliability)

** Styling: Tailwind CSS v4 (Next-gen utility-first CSS)

** HTTP Client: Axios (API communication)

** Notifications: React Hot Toast (Real-time feedback)

** Icons: Lucide React

## ✨ Features
** Patient Admission: A validated form to register new patients with auto-generated IDs.

** Live Dashboard: Real-time view of all admitted patients in a clean data table.

** Smart Validation: Prevents submission of incomplete forms.

** Duplicate Detection: Displays server-side errors (e.g., "Duplicate ID") directly to the user via toast notifications.

** Discharge Functionality: Allows removal of patients from the system (Delete operation).

**Responsive Design: Works seamlessly on desktop and tablet screens

🛠️ Getting Started
Follow these steps to run the project

1. Prerequisites
Ensure you have Node.js installed (v18 or higher recommended).

2. Clone & Install
Bash

git clone https://github.com/maxk254/ClinicaLite-frontend.git
cd pesapal-frontend
npm install
3. Configure the Backend Connection
This frontend needs to talk to the  backend server.

Create a .env file in the root folder.

Add the backend url backend URl

Code snippet

# For Local Testing
VITE_API_URL=http://localhost:10000/api

# For Production (Render)
# https://pesapal-database-challange-1.onrender.com
(Note: If you don't create a .env file, the app defaults to http://localhost:10000/api inside src/api/axiosClient.ts)

4. Run the App
Bash

npm run dev
Open your browser to http://localhost:5173.

📂 Project Structure
Plaintext

src/
├── api/              # API connections (Axios setup)
├── components/       
│   ├── common/       # Reusable UI (Buttons, Inputs)
│   ├── features/     # Smart components (PatientForm, PatientList)
│   └── layout/       # Page layout wrappers
├── pages/            # Main views (Dashboard)
├── types/            # TypeScript interfaces (Patient models)
└── App.tsx           # Main entry point
🔗 Backend Repository
This frontend is designed to work with the Clinicalite Custom Database API.

Backend Repo:
## https://github.com/maxk254/Pesapal-database-challange.git

Database Type: Custom Node.js File-based System (No SQL/NoSQL libraries used).

👨‍💻 Author
Built by [MAXWEL GEOFREY KAMAU] - Medical Student and Software Developer
