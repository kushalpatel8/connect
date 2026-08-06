# Connect - Social Media Application

Welcome to **Connect**, a fully-featured social media platform built using the MERN stack (MongoDB, Express, React, Node.js). 

Connect allows users to share updates, interact with friends, follow other users, and engage with a global timeline. It features a stunning, modern **Dark Mode Glassmorphism** user interface, complete with smooth animations and dynamic responsive layouts.

---

## 🌟 Features

* **User Authentication**: Secure sign up and login using JWT (JSON Web Tokens) and bcrypt password hashing.
* **Timeline Feed**: A dynamic timeline that displays your own posts mixed seamlessly with posts from users you follow.
* **Post Creation**: Share your thoughts with the world. Upload text and images directly to your feed.
* **Engagement**: Like and unlike posts in real-time.
* **Social Connections**: Follow and unfollow other users to customize your timeline experience.
* **User Profiles**: Dedicated profile pages showcasing user details, followers/following count, and personal post history.
* **Premium UI**: Built with a sleek dark space mesh gradient backdrop and frosted glass cards (glassmorphism) using Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend (Client)
* **React** (via Vite)
* **Redux** (for global state management of Auth and Posts)
* **Tailwind CSS v4** (for rapid, modern styling and glassmorphism)
* **Axios** (for API communication)
* **React Router** (for client-side routing)

### Backend (Server)
* **Node.js & Express** (for building the RESTful API)
* **MongoDB & Mongoose** (for database and schema management)
* **JWT** (for secure user sessions)
* **Bcrypt** (for encrypting user passwords)
* **Multer** (for handling image uploads)

### Infrastructure & DevOps
* **Docker** (Containerization of client and server)
* **Docker Compose** (Multi-container orchestration)
* **Nginx** (Serving the built React frontend inside Docker)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/en/) installed on your machine (for manual setup).
* A [MongoDB](https://www.mongodb.com/) account and cluster URL.
* [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (if running via Docker).

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd connect
```

### 2. Run with Docker (Recommended)

The easiest way to run the application is using Docker Compose.

1. Create a `.env` file in the `server` directory and add your MongoDB Atlas string and JWT Key:
   ```env
   MONGODB_URL = your_mongodb_connection_string
   JWT_KEY = your_secret_jwt_key
   ```
2. In the root directory, start the containers:
   ```bash
   docker-compose up --build
   ```
3. The frontend will be available at `http://localhost:5173` and the backend server at `http://localhost:3000`.

### 3. Manual Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add the following variables:
   ```env
   MONGODB_URL = your_mongodb_connection_string
   JWT_KEY = your_secret_jwt_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   # Server will start on http://localhost:3000
   ```

### 4. Manual Frontend Setup

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   # Client will run on http://localhost:5173
   ```

---

## 🎨 UI/UX Highlights

The application was recently overhauled to prioritize rich aesthetics:
* **Frosted Glass Cards**: Containers utilize `backdrop-filter: blur` to create a depth-of-field glass effect.
* **Mesh Gradients**: A sleek dark mode gradient dynamically anchors the background.
* **Micro-interactions**: Hovering over buttons, icons, and cards triggers subtle scaling and shadow animations to make the interface feel alive.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.
