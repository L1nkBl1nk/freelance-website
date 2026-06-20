# Freelance Marketplace

Diploma project: a full-stack web platform connecting freelancers with clients.

Repository: https://github.com/L1nkBl1nk/freelance-website

## Tech Stack

- **Frontend:** React 19, Vite, React Router 7, MobX (state management), React-Bootstrap / Bootstrap 5, Axios
- **Backend:** Node.js, Express 5
- **Database:** PostgreSQL (ORM — Sequelize)
- **Auth:** JWT (Bearer tokens), passwords hashed with bcrypt
- **File storage:** express-fileupload + static serving via Express (project images and avatars)
- **Deployment:** local run (client — Vite dev server, server — Express + nodemon)

## Features

- Registration and authentication with two roles — **client** and **freelancer**
- Create, publish, edit, and delete projects with category, budget, and image
- Project catalog with filtering by category
- Bids from freelancers on projects with a proposed price and message
- Creating an order from an accepted bid, with statuses: `pending` / `in_progress` / `completed` / `cancelled`
- Project statuses: `open` / `in_progress` / `completed`
- In-order chat messages between client and freelancer
- Reviews and ratings (1–5) after an order is completed
- User profile: bio, skills, hourly rate, avatar upload

## Architecture

A monorepo split into `client/` (SPA) and `server/` (REST API).

**Backend** follows a layered `router → controller → model` structure:
- `routes/` — Express routers per entity, aggregated in `routes/index.js` under the `/api` prefix
- `controllers/` — business logic, each controller exported as a singleton class
- `models/models.js` — Sequelize models and all relations between them in one place
- `middleware/authMiddleware.js` — JWT verification and injecting `req.user` into protected routes
- `middleware/ErrorHandlingMiddleware.js` + `error/ApiError` — centralized error handling through a single `ApiError` class and a final error-handling middleware

Data schema: `User` 1—1 `Profile`; `User` 1—N `Project`; `Category` 1—N `Project`; `Project` 1—N `Bid`; `Bid` 1—1 `Order`; `Order` references two users (`client` and `freelancer`); `Order` 1—N `Message` and 1—N `Review`.

**Frontend** — a React + Vite SPA:
- `http/index.js` — two axios instances: `$host` (public requests) and `$authHost` (with an interceptor that attaches the JWT from localStorage)
- MobX for global state (user, projects)
- React Router 7 for navigation, with a split between `pages/` and reusable `components/`

## What I Learned / Challenges

- **JWT authentication and roles.** Implemented stateless auth: a token carrying `id/email/role/username`, a single middleware validates it and puts the user on `req.user`. This let me protect create/update routes without keeping sessions on the server.
- **Domain modeling.** The hardest part was designing the relations: an order is born from a bid (`Bid → Order`), and an order involves two users in different roles. Solved it with Sequelize aliases (`as: 'client'` / `as: 'freelancer'`) so the same `User` model can reference an order twice correctly.
- **Splitting axios instances.** Moved authorized and public requests into `$authHost` / `$host` with an interceptor instead of manually setting the header on every request — less duplication and a single place for the token.
- **File uploads.** Set up `express-fileupload` + static serving, with filenames generated via `uuid` to avoid collisions.
- **Centralized error handling.** Instead of scattering `try/catch` with manual `res.status()` everywhere, I built an `ApiError` class and a final middleware — controllers just call `next(ApiError.badRequest(...))`.

## How to Run Locally

Requirements: Node.js 18+ and a running PostgreSQL instance.

```bash
# 1. Clone the repository
git clone https://github.com/L1nkBl1nk/freelance-website.git
cd freelance-website

# 2. Install dependencies
cd server && npm install
cd ../client && npm install
```

### Environment variables

`server/.env`:

```env
PORT=5000
DB_NAME=freelance
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=your_jwt_secret
```

`client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

> Before the first run, create a database in PostgreSQL with the name from `DB_NAME` — Sequelize will create the tables automatically (`sequelize.sync()`).

### Running

```bash
# Terminal 1 — backend
cd server && npm run dev      # http://localhost:5000

# Terminal 2 — frontend
cd client && npm run dev      # http://localhost:5173
```
