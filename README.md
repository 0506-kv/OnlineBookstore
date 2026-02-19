# 📚 Readora - Online Bookstore

**Readora** is a modern, full-stack online bookstore platform designed to provide a seamless buying and selling experience for book lovers. Built with performance and aesthetics in mind.

---

## ⚡ Tech Stack

### **Frontend**
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State & Routing:** React Hooks, React Router DOM

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT & BCrypt
- **Real-time:** Socket.io

---

## 🛠️ Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (Compass or Atlas)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone <repository_url>
    cd OnlineBookstore
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../frontend
    npm install
    ```
4. Make backend .env file (for local development)
    ```bash
    PORT=4000
    DB_CONNECT=mongodb://localhost:27017/bookstore
    JWT_SECRET=your_jwt_secret
    ```

5. Make frontend .env file (for local development)
    ```bash
    VITE_BASE_URL=http://localhost:4000
    ```
    Same port number for VITE_BASE_URL (frontend) and PORT (backend) is necessary.
---

## 🚀 Running the Project

You need to run both the backend and frontend terminals simultaneously.

### 1. Start the Backend
```bash
cd backend
npm run dev
```

### 2. Start the Frontend
```bash
cd frontend
npm run dev
```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:4000`.

---

## 📂 Directory Structure

- **`frontend/`**: Contains the React application, UI components, and pages.
- **`backend/`**: Contains API routes, controllers, database models, and configuration.
