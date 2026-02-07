# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

# Smart Tailoring Management System

Lightweight management system for tailoring businesses — includes a Node/Express backend (MongoDB) and a React + Vite frontend.

## Quick overview

- **Backend:** Express API with routes for companies, employees, labour and orders.
- **Frontend:** React + Vite single-page app in the `frontend/` folder.

## Prerequisites

- Node.js (recommended >= 16)
- npm (or yarn)
- MongoDB instance (local or hosted)

## Repository layout

- `backend/` — Express API server (entry: `server.js`).
- `backend/config/db.js` — MongoDB connection helper.
- `backend/routes/` — API route modules (`companies.js`, `companyEmployees.js`, `labour.js`, `orders.js`).
- `frontend/` — React + Vite application.

## Backend — setup & run

1. Install dependencies:

	```bash
	cd backend
	npm install
	```

2. Configure environment variables (create a `.env` file in `backend/`), for example:

	```env
	MONGODB_URI=mongodb://localhost:27018
	DB_NAME=newstar_tailors
	PORT=5000
	```

3. Start server:

	- Development with auto-reload: `npm run dev` (requires `nodemon`)
	- Production / simple start: `npm start`

The backend exposes a health route at `GET /api/health` and mounts API routes under `/api`:

- `/api/orders` (routes in `backend/routes/orders.js`)
- `/api/companies` (routes in `backend/routes/companies.js`)
- `/api/employees` (routes in `backend/routes/companyEmployees.js`)
- `/api/labour` (routes in `backend/routes/labour.js`)

## Frontend — setup & run

1. Install dependencies and run dev server:

	```bash
	cd frontend
	npm install
	npm run dev
	```

2. Build for production:

	```bash
	npm run build
	npm run preview
	```

The frontend talks to the backend API; update the API base URL in `frontend/src/services/api.js` if needed.

## Configuration

- Database connection settings are read from environment variables in `backend/config/db.js` (see `MONGODB_URI` and `DB_NAME`).

## Development notes

- Backend main script: `backend/server.js` — it connects to MongoDB before starting the HTTP server.
- Backend scripts (see `backend/package.json`): `start`, `dev`.
- Frontend scripts (see `frontend/package.json`): `dev`, `build`, `preview`, `lint`.

## Contributing

Open issues or PRs for bug fixes and improvements. Keep changes focused and add brief notes in PR descriptions.

## License

This project uses the existing license in the repository root.

---

If you'd like, I can also:

- Add a sample `.env.example` in `backend/`.
- Add a short CONTRIBUTING.md with development workflow.
