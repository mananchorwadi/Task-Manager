# TaskManager

TaskManager is a full-stack task management app built with React + Vite on the frontend and Express + MongoDB on the backend. It supports user authentication, task CRUD, task status updates, search/filtering, pagination, and an improved dashboard UI.

## Live Demo
https://task-manager-pi-ashen.vercel.app

## Features

- User registration and login
- Protected dashboard for authenticated users
- Create, edit, delete, and update task status
- Search tasks by title or description
- Filter tasks by status
- Paginated task list
- Modern responsive UI

## Project Structure

- client/ — React + Vite frontend
- server/ — Express + MongoDB backend

## Tech Stack

Frontend
- React
- Vite
- Tailwind CSS
- Axios

Backend
- Express
- MongoDB with Mongoose
- JWT authentication

## Getting Started

### 1. Backend setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder with:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

The API will run at:

```text
http://localhost:8000
```

### 2. Frontend setup

```bash
cd client
npm install
```

Create a `.env` file in the `client/` folder with:

```env
VITE_API_URI=http://localhost:8000/api
```

Start the frontend:

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:5173
```

## API Overview

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Tasks
- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- PATCH `/api/tasks/:id/status`
- DELETE `/api/tasks/:id`

## Build

Frontend production build:

```bash
cd client
npm run build
```

## Notes

- The backend uses JWT-based authentication.
- Tasks are linked to the logged-in user.
- Make sure MongoDB is running before starting the server.
