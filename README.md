# PurpleZone MERN Grammar Test

PurpleZone is a full-stack MERN application with registration, login, grammar correction, backend score validation, and a responsive multi-page React experience.

## Folder Structure

```text
project-root/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## Features

- User registration and login with MongoDB persistence
- React Router navigation across authentication, test, editor, and results pages
- Editable grammar test with backend scoring logic
- Submission history stored in MongoDB
- Responsive UI with reusable React components

## Installation

1. Clone the repository.
2. Open two terminals, one for `server` and one for `client`.
3. Copy environment templates:

```bash
cd server
cp .env.example .env
cd ../client
cp .env.example .env
```

4. Install dependencies:

```bash
cd server
npm install
cd ../client
npm install
```

5. Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017`.

## Run Commands

Server:

```bash
cd server
npm run dev
```

Client:

```bash
cd client
npm run dev
```

App URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/submissions`
- `GET /api/health`

## Environment Variables

Server `.env`

```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/purplezone
CLIENT_URL=http://localhost:5173
```

Client `.env`

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

## Scoring Logic

The backend validates submissions against these answers:

1. `He goes to school every day.`
2. `I have a pen and a book.`
3. `What is your name?`

The API stores each submission with per-question correctness and returns a final score plus success or failure messaging.

## GitHub Push Commands

```bash
git init
git add .
git commit -m "Build PurpleZone MERN grammar test application"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Notes

- The visual design uses a professional warm glassmorphism direction because no Figma file was included in the workspace.
- Authentication is local-development oriented and stores the logged-in user in browser local storage.
