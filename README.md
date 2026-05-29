# Connect

A modern, full-stack social media application built with the MERN stack (MongoDB, Express, React, Node.js). Connect provides a platform for users to share updates, follow friends, and engage with content in a beautifully designed, premium dark-mode glassmorphism interface.

## 🚀 Features

- **User Authentication**: Secure signup and login functionality using JWT and bcrypt.
- **Dynamic Timeline**: View posts from users you follow, sorted chronologically.
- **Social Interactions**: Like and dislike posts, and follow or unfollow other users.
- **Profile Management**: Customize your profile with a cover photo, profile picture, and personal information.
- **Media Uploads**: Seamlessly upload and share images on your timeline.
- **Premium UI**: A sleek, responsive dark mode interface powered by Tailwind CSS v4 and glassmorphism design principles.

## 💻 Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS v4
- Redux & Redux Thunk (State Management)
- Axios (API requests)

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for Authentication
- Multer (File Uploads)

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js installed
- MongoDB database (local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd connect
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add the following variables:
```env
MONGODB_URL=your_mongodb_connection_string
JWT_KEY=your_secret_key
```
Start the backend server:
```bash
npm start
# or for development: npm run dev
```

### 3. Frontend Setup
Open a new terminal window and navigate to the client directory:
```bash
cd client
npm install
```
Start the frontend development server:
```bash
npm run dev
```

## 📸 Screenshots
*(Add screenshots of your amazing new UI here!)*

## 📝 License
This project is licensed under the ISC License.
