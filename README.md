

# 📝 Notes App

A full-stack Notes Management application built with **Next.js (React)** and **Node.js + Express + MongoDB**.
It allows users to **register, log in, create, edit, and organize personal notes with tags**, all protected with secure JWT authentication.

## 🚀 Live Demo

Frontend: [https://notes-bs.vercel.app/](https://notes-bs.vercel.app/)
Backend API: [https://notes-vwk0.onrender.com/](https://notes-vwk0.onrender.com/)

## 🧩 Overview

This Notes App enables users to securely manage their ideas and notes.
After logging in, users can create, edit, and delete notes with tags, search through existing notes, and manage their profile information.
The UI is clean, responsive, and optimized for both desktop and mobile.

## ⚙️ Tech Stack

**Frontend**

* Next.js (React)
* Axios + React Query for API management
* Tailwind CSS for styling
* React Hot Toast for notifications

**Backend**

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* bcrypt, dotenv, and CORS

## 📚 Features

* User Registration and Login
* JWT-based Authentication
* Create, Read, Update, Delete (CRUD) Notes
* Tagging and Search Support
* Update Profile Information
* Responsive and Modern UI

## 🧠 Folder Structure

```
client/
  ├── app/
  ├── components/
  ├── lib/
  └── pages/
server/
  ├── controllers/
  ├── models/
  ├── routes/
  └── server.js
```

## 🧰 Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/notes.git
cd notes
```

### 2. Install dependencies

```bash
cd client
npm install
cd ../server
npm install
```

### 3. Add environment variables

Create a `.env` file inside the `server` folder with the following values:

```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

### 4. Run the development servers

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

Frontend runs at `http://localhost:3000`
Backend runs at `http://localhost:5000/api`

## 🧾 API Documentation

Base URL: `https://notes-vwk0.onrender.com/api`

### Authentication Routes

#### Register

**POST** `/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Login

**POST** `/auth/login`

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

#### Logout

**POST** `/auth/logout`
Headers:
`Authorization: Bearer <JWT_TOKEN>`

### Profile Routes

#### Get Profile

**GET** `/profile`
Headers:
`Authorization: Bearer <JWT_TOKEN>`

#### Update Profile

**PUT** `/profile`

```json
{
  "name": "Updated Name",
  "bio": "Updated bio text"
}
```

### Notes Routes

#### Create Note

**POST** `/notes`

```json
{
  "title": "Meeting Notes",
  "content": "Discussed project timeline",
  "tags": ["meeting", "planning"]
}
```

#### Get All Notes

**GET** `/notes`
Optional query params: `?search=meeting&tag=planning`

#### Get Single Note

**GET** `/notes/:id`

#### Update Note

**PUT** `/notes/:id`

```json
{
  "title": "Updated Note",
  "content": "Updated content here"
}
```

#### Delete Note

**DELETE** `/notes/:id`

## 🧠 Error Responses

**400 – Bad Request**

```json
{
  "success": false,
  "message": "Title is required"
}
```

**401 – Unauthorized**

```json
{
  "success": false,
  "message": "Invalid token"
}
```

## 🌐 Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

## ✉️ Contact

**Developer:** Shaik Bhasidh
**Email:** [basidhshaik85@gmail.com](mailto:basidhshaik85@gmail.com)
**GitHub:** [https://github.com/bhasidhshaik](https://github.com/bhasidhshaik)

## 🧩 Summary

This project demonstrates a complete **MERN-stack implementation** with authentication, note management, and a responsive frontend.
It’s built with scalability and clarity in mind — a solid foundation for any production-level notes or task management system.

