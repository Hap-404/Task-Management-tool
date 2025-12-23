## Task Management Tool

Full-stack MERN application that lets admins create and assign tasks, manage users, and export reports while end users track their own work. The project is split into an Express/MongoDB API (`backend/`) and a React + Vite client (`frontend/task-management-tool/`).

### Features
- JWT authentication with role-based access (`admin` vs `member`)
- Image upload support via Multer for user avatars
- Task CRUD, assignment, progress tracking, and reporting
- Admin dashboards with charts, tables, and Excel export (ExcelJS)
- Responsive React UI with protected routes, contexts, and custom hooks

### Tech Stack
- Backend: Node.js, Express 5, MongoDB + Mongoose, Multer, JWT, Bcrypt, ExcelJS
- Frontend: React 19, React Router 7, Vite, Tailwind, Axios, Recharts, React Hot Toast

### Monorepo Structure
```
Task-Management-Tool/
├─ backend/
│  ├─ config/           # database connection helpers
│  ├─ controller/       # auth, user, task, report logic
│  ├─ middleware/       # auth guard, file uploads
│  ├─ models/           # Mongoose schemas (User, Tasks)
│  ├─ routes/           # REST endpoints
│  ├─ uploads/          # runtime image uploads (ignored by git)
│  └─ server.js         # Express app entrypoint
└─ frontend/
   └─ task-management-tool/
      ├─ src/
      │  ├─ pages/      # Auth, Admin, User views
      │  ├─ components/ # shared UI widgets
      │  ├─ context/    # auth/task contexts
      │  ├─ hooks/      # custom hooks for data fetching
      │  └─ utils/      # axios instance, helpers, mock data
      └─ vite.config.js
```

### Prerequisites
- Node.js ≥ 18
- MongoDB instance (local or hosted, e.g., Atlas)
- Git (if cloning/pushing)

### Environment Variables
Create `backend/.env` with:
```
PORT=5000
MONGO_URL=your-mongodb-connection-string
JWT_SECRET=super-secure-secret
ADMIN_INVITE_TOKEN=optional-token-for-admin-upgrades
CLIENT_URL=http://localhost:5173   # used by CORS
```

Create `frontend/task-management-tool/.env` (Vite uses `VITE_` prefix):
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend Setup
```bash
cd backend
npm install
npm run dev    # nodemon server.js
```

The API listens on `http://localhost:5000` by default and exposes routes under `/api` (currently `/api/auth` is enabled; other route files are scaffolded for future features). Uploaded images are saved in `backend/uploads/`; ensure the folder exists or let Multer create it.

### Frontend Setup
```bash
cd frontend/task-management-tool
npm install
npm run dev    # starts Vite dev server on http://localhost:5173
```

The frontend reads API URLs from `VITE_API_BASE_URL` and handles routing between auth, admin, and user dashboards. For production builds run `npm run build` and serve the contents of `dist/`.

### Recommended Workflow
1. Start MongoDB and the backend (`npm run dev`).
2. Start the frontend (`npm run dev` in the Vite app).
3. Use the signup flow with an `ADMIN_INVITE_TOKEN` to create the first admin; subsequent logins seed data.
4. Optional: configure a process manager (PM2, Docker) for deployment and enable HTTPS + proper CORS settings.

### Testing & Linting
- Backend: add Jest/Supertest suites under `backend/tests/` (currently not provided).
- Frontend: run `npm run lint` (ESLint) and add Vitest/React Testing Library as needed.

### Future Enhancements
- Enable the commented `userRoutes`, `taskRoutes`, and `reportRoutes` once their controllers are finalized.
- Serve uploaded files statically via Express (`app.use("/uploads", express.static(...))`).
- Add rate limiting, request validation, and audit logging.

---
Maintained as a single repository so backend and frontend stay in sync; clone once, install each side, and you’re ready to build. Contributions welcome via pull requests or issues.













