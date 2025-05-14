#  Patient Registration App

A fully frontend patient registration system built using **React**, **Vite**, **TailwindCSS**, and **PGlite** (SQLite in the browser via WebAssembly). This app allows users to register patients, view and search records using raw SQL, and persist data even across page reloads and tabs — without needing any backend.

---+++++++++++++++-----------------------+++++++++++++++++--------------++++++++

##  Tech Stack

-  **React** – For building UI components
-  **Vite** – Lightning-fast dev server and build tool
-  **TailwindCSS** – Utility-first CSS framework for rapid UI styling
-  **PGlite** – WebAssembly-based SQLite for the browser

---------------------++++++++++++++++++++---------------------+++++++++++++
##  Features

- Add new patient records
-  View list of patients with detailed info
-  Raw SQL-based search functionality
-  Persistent data storage across page reloads using IndexedDB
-  Multi-tab data synchronization
-  Fully frontend — no backend or external database required
-  Clean, responsive UI with TailwindCSS

## Key feture 
Key Features / Implementation Highlights
Unique Patient Identification:
Each patient is assigned a UUID (Universally Unique Identifier) on creation to ensure every record is reliably distinct.
This is critical for:

Avoiding collisions in local DB entries.

Supporting offline-first logic where records may be created across different tabs/sessions.

Ensuring stable keys when syncing or exporting data.

UUIDs are generated using the crypto.randomUUID() Web API.
-------------------------+++++++++++++++++--------------+++++-------------

##  Live Demo

👉 [View the App on Vercel](https://med-rec-teal.vercel.app/)

-------------------------++++++++++++++------------------

## 📁 Project Structure

.
├── public/                     # Static assets
├── src/
│   └── assets/
│       ├── components/         # Reusable UI components
│       ├── db/                 # PGlite logic: init, query, sync
│       ├── App.tsx            # Main app component
│       └── index.tsx          # Entry point
├── index.html                  # Main HTML file
├── package.json                # Project dependencies and scripts
├── vite.config.js              # Vite configuration
├── vercel.toml                # Vercel deployment config
├── eslint.config.js           # ESLint configuration
└── README.md                  # Project documentation

----------------------------------------------------++------------------


## Install Dependencies
npm install

## Run the development server
npm run dev

## Build for production
npm run build

 ## Raw SQL Search
 Users can search patient records using a flexible input field backed by raw SQL. For example:

 SELECT * FROM patients WHERE name LIKE '%john%'

Searches are directly executed on the PGlite database inside the browser.

------------

## Challenges faced
While working with PGlite in a Vite project, I hit a confusing error in the browser console:
"Invalid FS bundle size" — which completely broke the database initialization.

It wasn’t immediately clear what was causing it, so I had to dive deep into PGlite’s documentation and even its source code to understand how the WebAssembly module was loading and how it interacted with IndexedDB. After some trial and error, I figured out a workaround specific to how Vite handles assets and module loading, which finally got it working.

Aside from that, I built support for raw SQL input, making sure the UI could handle invalid queries gracefully without crashing — giving flexibility without compromising stability.

For multi-tab syncing, I used the storage event and added reload logic so that changes in one tab would automatically show up in others, keeping everything in sync without conflict.