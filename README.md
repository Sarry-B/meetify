<h1 align="center">Meetify 📅</h1>
<p align="center">Minimalistic scheduling app for managing your appointments efficiently.</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/MongoDB-%2320232a?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/TailwindCSS-%231572B6?style=for-the-badge&logo=tailwind-css" />
</p>

---

## 🚀 Features

- 🔐 **User Authentication** using JWT
- 📆 **Appointment Management**: create and delete
- 🌗 **Dark/Light Mode Toggle**
- ⚡ Responsive, fast, and modern UI with Tailwind
- ✅ Real-time feedback on actions

---

## 🛠 Tech Stack

| Frontend      | Backend       | Database |
|---------------|---------------|----------|
| React, TailwindCSS | Node.js, Express.js | MongoDB (Mongoose) |

---

## 🧭 Project Structure

```
meetify/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Dashboard.js
│       │   ├── Appointments.js
│       │   └── ThemeToggle.js
│       ├── App.js
│       └── index.js
└── server/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── .env
    ├── server.js
    └── package.json
```

---

## 🧪 Getting Started

### Clone & Install

```bash
git clone https://github.com/your-username/meetify.git
cd meetify
```

### Backend Setup

```bash
cd server
npm install
touch .env
# Add your environment variables:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret

node server.js
```

### Frontend Setup

```bash
cd ../client
npm install
npm start
```

---

## 🌟 Preview

> Login & Register securely • View your Dashboard • Manage Appointments

---

## 💡 Future Enhancements

- 📝 Edit appointments
- 📅 Calendar integration
- 📧 Email notifications
- 👤 Profile management
