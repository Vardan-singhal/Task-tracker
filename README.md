# 🚀 Task Tracker Web Application

A modern, responsive **Task Tracker Web Application** built with the **MERN Stack** that enables users to efficiently manage their daily tasks. The application supports full CRUD operations, advanced filtering, sorting, searching, and real-time task statistics through an intuitive and responsive user interface.

---

## 📖 Overview

The Task Tracker is designed to help users organize their work by allowing them to create, update, delete, search, filter, and sort tasks based on their status, priority, and due dates. The application follows RESTful API principles and provides a clean, user-friendly experience across desktop and mobile devices.

---

## ✨ Features

### Task Management

* ✅ Create new tasks
* ✏️ Edit existing tasks
* 🗑️ Delete tasks
* 📋 View all tasks
* 📅 Set due dates
* 🚩 Assign task priorities
* 📌 Update task status

### Search & Filtering

* 🔍 Debounced live search
* 🎯 Filter by task status
* 📊 Sort by:

  * Newest First
  * Oldest First
  * High Priority
  * Due Date

### Dashboard

* 📈 Total Tasks
* ✅ Completed Tasks
* ⏳ Pending Tasks
* 🚩 High Priority Tasks

### User Experience

* Responsive UI
* Loading indicators
* Toast notifications
* Clean Bootstrap interface
* Mobile-friendly design
* Form validation
* Error handling

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* JavaScript (ES6+)
* Bootstrap 5
* Axios
* React Icons
* React Toastify

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Development Tools

* Git
* GitHub
* Postman
* VS Code

---

# 📂 Project Structure

```
Task-Tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/task-tracker.git
```

```
cd task-tracker
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run the backend.

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

Backend runs on

```
http://localhost:5000
```

---

# 📡 API Endpoints

## Tasks

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/tasks`     | Fetch all tasks |
| GET    | `/api/tasks/:id` | Get task by ID  |
| POST   | `/api/tasks`     | Create new task |
| PUT    | `/api/tasks/:id` | Update task     |
| DELETE | `/api/tasks/:id` | Delete task     |

---

# 📊 Task Model

```javascript
{
  title: String,
  description: String,
  status: String,
  priority: String,
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

# 🚀 Performance Optimizations

* Debounced search for reduced API requests
* Efficient state management with React Hooks
* Memoized event handlers using `useCallback`
* Optimized API calls
* Responsive grid layout
* Modular component architecture

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

* Desktop
* Laptop
* Tablet
* Mobile

---

# 📸 Screenshots

Add screenshots here.

```
/screenshots/dashboard.png
/screenshots/create-task.png
/screenshots/edit-task.png
```

---

# 🔮 Future Enhancements

* User Authentication (JWT)
* User Profiles
* Dark Mode
* Task Categories
* Calendar View
* Drag & Drop Kanban Board
* Email Reminders
* File Attachments
* Real-time Updates with Socket.io
* PWA Support

---

# 🧪 Testing

Future improvements include:

* Jest
* React Testing Library
* Backend API Testing
* Integration Testing

---

# 🤝 Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Vardan Singhal**

Full Stack Developer

* LinkedIn: https://www.linkedin.com/in/vardan-singhal-612476214/
* GitHub: https://github.com/your-github-username

---

⭐ If you found this project helpful, don't forget to **star the repository!**
