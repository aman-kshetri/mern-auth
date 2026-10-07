# MERN Auth

![MERN Auth](https://img.shields.io/badge/stack-MERN-61DAFB?style=flat-square)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-646CFF?style=flat-square)
![Backend](https://img.shields.io/badge/backend-Express-000000?style=flat-square)
![Database](https://img.shields.io/badge/database-MongoDB-47A248?style=flat-square)

A full-stack authentication application built with MongoDB, Express, React, and
Node.js. The project demonstrates cookie-based JWT authentication, email
verification, password reset flows, and automated API and UI testing.

## Features

- User registration and login
- JWT authentication stored in an HTTP-only cookie
- Protected API routes
- Account email verification with a one-time password (OTP)
- Password reset with an OTP sent by email
- Authenticated user profile data
- Responsive React UI styled with Tailwind CSS
- Toast notifications for success and error feedback
- TypeScript Playwright API and end-to-end tests
- Python pytest QA suite with API and UI coverage

## Tech stack

### Application

- **Frontend:** React 19, React Router, Vite, Axios, Tailwind CSS, React
  Toastify
- **Backend:** Node.js, Express 5, Mongoose, JSON Web Token, bcryptjs,
  Nodemailer
- **Database:** MongoDB
- **Email:** SMTP relay (configured for Brevo by default)

### Testing

- **Playwright:** TypeScript API and browser tests in `playwright-ts/`
- **pytest:** Python API and browser tests in `qa/`

## Project structure

```text
mern-auth/
├── backend/
│   ├── config/              # MongoDB, mail, and email template setup
│   ├── controller/          # Authentication and user handlers
│   ├── middleware/          # JWT cookie authentication middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express API routes
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/       # Shared UI components
│   │   ├── context/          # Global authentication state
│   │   ├── pages/            # Login, home, verification, and reset flows
│   │   └── assets/
│   ├── .env.example
│   └── package.json
├── playwright-ts/            # TypeScript Playwright test suite
│   ├── pages/                # Page object models
│   ├── tests/
│   │   ├── api/
│   │   └── auth/
│   ├── utils/
│   └── .env.example
├── qa/                       # Python pytest QA suite
│   ├── pages/
│   ├── tests/
│   └── requirements.txt
└── README.md
```

## Prerequisites

- Node.js 18 or newer
- npm
- A running MongoDB instance or MongoDB Atlas cluster
- SMTP credentials for sending verification and password-reset emails
- Python 3.10 or newer for the `qa/` suite
- Playwright browsers for the selected test runner

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/aman-kshetri/mern-auth.git
cd mern-auth
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../playwright-ts
npm install
```

The Python QA suite has separate dependencies:

```bash
cd qa
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
python -m pip install -r requirements.txt
python -m playwright install
```

### 3. Configure environment variables

Copy the example files and replace every placeholder with local values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp playwright-ts/.env.example playwright-ts/.env
```

The Python QA suite currently uses its test configuration and does not require
an additional `.env.example` file.

#### Backend environment

| Variable | Description |
| --- | --- |
| `PORT` | Port used by the Express server. Defaults to `4000`. |
| `MONGODB_URI` | Base MongoDB connection URI. The application appends `/mern-auth` as the database name. |
| `JWT_SECRET` | Secret used to sign and verify authentication tokens. Use a long random value. |
| `SENDER_EMAIL` | Sender address used for application emails. |
| `SMTP_USER` | SMTP relay username. |
| `SMTP_PASS` | SMTP relay password or API key. |
| `NODE_ENV` | Runtime environment, for example `development` or `production`. |

The current mail transport uses Brevo SMTP (`smtp-relay.brevo.com` on port
`587`). Update the mail transport configuration if a different provider is
required.

#### Frontend environment

| Variable | Description |
| --- | --- |
| `VITE_BACKEND_URL` | Base URL of the backend API, such as `http://localhost:4000`. |

#### Playwright environment

| Variable | Description |
| --- | --- |
| `BASE_URL` | Frontend URL used by browser tests, normally `http://localhost:5173`. |
| `API_URL` | Backend URL used by API tests, normally `http://localhost:4000`. |
| `TEST_USER_EMAIL` | Existing test account email. |
| `TEST_USER_PASSWORD` | Password for the existing test account. |

Do not commit `.env` files or real credentials. The repository ignores local
environment files; only the example templates should be checked in.

### 4. Run the application

Start the backend and frontend in separate terminals:

```bash
# Terminal 1
cd backend
npm run server
```

```bash
# Terminal 2
cd frontend
npm run dev
```

The application is available at:

- Frontend: <http://localhost:5173>
- Backend: <http://localhost:4000>
- Backend health check: <http://localhost:4000/>

For a production-style frontend build:

```bash
cd frontend
npm run build
npm run preview
```

## API reference

The backend base URL is `http://localhost:4000`.

### Authentication routes

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Create an account and start a session. |
| `POST` | `/api/auth/login` | Public | Sign in and create a session. |
| `POST` | `/api/auth/logout` | Public | Clear the authentication cookie. |
| `POST` | `/api/auth/send-verify-otp` | Required | Send an account-verification OTP. |
| `POST` | `/api/auth/verify-account` | Required | Verify the account using an OTP. |
| `GET` | `/api/auth/is-auth` | Required | Check whether the current session is valid. |
| `POST` | `/api/auth/send-reset-otp` | Public | Send a password-reset OTP. |
| `POST` | `/api/auth/reset-password` | Public | Reset a password using an email and OTP. |

### User routes

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `GET` | `/api/user/data` | Required | Return the current user's display name and verification status. |

Authentication is cookie-based. When calling the API from another client,
include credentials so the `token` cookie is sent with requests.

## Testing

### TypeScript Playwright suite

Make sure MongoDB, the backend, and the frontend are running, then execute:

```bash
cd playwright-ts
npm test
```

Useful alternatives:

```bash
npm run test:headed
npm run test:ui
npm run test:debug
npm run report
```

The suite includes API tests and browser tests for registration, login,
logout, authentication state, email verification, and password reset.

### Python pytest suite

After installing the `qa/` dependencies and starting the application:

```bash
cd qa
pytest
```

Run a focused group with:

```bash
pytest tests/api
pytest tests/ui
```

## Security notes

- Keep `JWT_SECRET`, SMTP credentials, and database credentials private.
- Use HTTPS and secure cookie settings in production.
- Configure CORS for the deployed frontend origin instead of relying on local
  development URLs.
- Use a dedicated test account and test database for automated tests.
- Never use production credentials in local test environment files.
