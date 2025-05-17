# 🚗 ReadyGo - Modern Ride Sharing Application

A full-stack ride-sharing platform that connects passengers with drivers in real-time, built with modern web technologies and best practices.

## ✨ Features

- 🔐 Secure user authentication and authorization
- 🚀 Real-time ride booking and tracking
- 🗺️ Interactive maps for location selection
- 👨‍✈️ Driver management system
- 🔔 Real-time notifications
- 💳 Secure payment processing
  - Credit/Debit Cards
  - UPI Payments
  - Cash Payments
- 📊 Ride history and user profiles
- 📱 Responsive design for all devices

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js (v18)
- ⚡ Vite (Build Tool)
- 🎨 Tailwind CSS (Styling)
- 🔄 React Router (Routing)
- 📡 Socket.io-client (Real-time communication)
- 🗺️ Leaflet (Maps integration)
- ✨ GSAP (Animations)
- 🔄 Axios (HTTP client)

### Backend
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB (via Mongoose)
- 📡 Socket.io (Real-time communication)
- 🔑 JWT (Authentication)
- 🔒 Bcrypt (Password hashing)
- 📧 Nodemailer (Email notifications)

## 📁 Project Structure

```
├── Frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context providers
│   │   ├── pages/          # Route components
│   │   ├── assets/         # Static files
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
│
└── Backend/
    ├── controllers/        # Business logic
    ├── models/            # Database models
    ├── routes/            # API endpoints
    ├── services/          # Reusable services
    ├── middlewares/       # Request processing
    ├── db/                # Database configuration
    ├── app.js             # Express application
    ├── server.js          # Server entry point
    └── package.json       # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install Frontend dependencies:
```bash
cd Frontend
npm install
```

3. Install Backend dependencies:
```bash
cd ../Backend
npm install
```

4. Create environment files:
   - Frontend: Create `.env` file in Frontend directory
   - Backend: Create `.env` file in Backend directory

5. Start the development servers:

Frontend:
```bash
cd Frontend
npm run dev
```

Backend:
```bash
cd Backend
node server.js
```

## ⚙️ Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
VITE_MAPS_API_KEY=your_maps_api_key
```

### Backend (.env)
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

## 🔌 API Routes

- `/api/users` - User management
- `/api/rides` - Ride management
- `/api/maps` - Maps integration
- `/api/drivers` - Driver management


---

Made with ❤️ by Tejas Detroja