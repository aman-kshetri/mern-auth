# MERN Auth

A full-stack authentication starter built with **MongoDB, Express, React, and Node.js**.  
It supports signup/login, JWT cookie auth, email verification with OTP, and password reset with OTP.

## Features

- User registration and login
- JWT-based authentication using HTTP-only cookies
- Protected routes with auth middleware
- Email verification via OTP
- Password reset via OTP
- React frontend with route-based auth flows
- Toast notifications for user feedback

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- `bcryptjs`
- Nodemailer

## Project Structure

```text
mern-auth/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── src/
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance
- SMTP credentials (Brevo or compatible SMTP relay)

### 1) Clone and install dependencies

```bash
git clone https://github.com/aman-kshetri/mern-auth.git
cd mern-auth

cd backend && npm install
cd ../frontend && npm install
```

### 2) Configure environment variables

Create these files:

- `backend/.env`
- `frontend/.env`

#### Backend `.env`

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SENDER_EMAIL=your_sender_email
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
NODE_ENV=development
```

> `MONGODB_URI` should be the base URI; the app appends `/mern-auth` as database name.

#### Frontend `.env`

```env
VITE_BACKEND_URL=http://localhost:4000
```

### 3) Run the application

In separate terminals:

```bash
# backend
cd backend
npm run server
```

```bash
# frontend
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## API Endpoints

Base URL: `http://localhost:4000`

### Auth (`/api/auth`)

- `POST /register`
- `POST /login`
- `POST /logout`
- `POST /send-verify-otp` (protected)
- `POST /verify-account` (protected)
- `GET /is-auth` (protected)
- `POST /send-reset-otp`
- `POST /reset-password`

### User (`/api/user`)

- `GET /data` (protected)

## Notes

- Auth state is cookie-based (`token` cookie).
- CORS is currently configured for `http://localhost:5173`.
