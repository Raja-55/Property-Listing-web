<div align="center">

  <!-- Animated Header Title -->
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Outfit&weight=700&size=36&pause=1000&color=2563EB&center=true&vcenter=true&width=700&height=70&lines=HAVENLY+%E2%80%94+ZERO+BROKERAGE+PORTAL;Find%2C+Rent%2C+Buy+%26+List+Properties;Direct+Owner-to-Seeker+Connections;Built+with+React+19+%2B+Node.js+%2B+MongoDB" alt="Typing SVG Header" />
  </a>

  <p align="center">
    <strong>India's Next-Generation Real Estate Platform Connecting Property Owners & Seekers Directly</strong>
  </p>

  <!-- Animated Badges Bar -->
  <p align="center">
    <a href="#-tech-stack"><img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
    <a href="#-tech-stack"><img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="#-tech-stack"><img src="https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" /></a>
    <a href="#-tech-stack"><img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
    <a href="#-tech-stack"><img src="https://img.shields.io/badge/JWT-HTTP--Only_Cookies-FF007F?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT Auth" /></a>
    <a href="#license"><img src="https://img.shields.io/badge/License-ISC-007ACC?style=for-the-badge" alt="License" /></a>
  </p>

  <p align="center">
    <a href="#-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-api-reference">API Endpoints</a> •
    <a href="#-roadmap">Roadmap</a>
  </p>

  ---
</div>

## 📌 About Havenly

**Havenly** is an end-to-end full-stack property portal designed to eliminate middleman commissions and connect property owners directly with buyers and tenants. Built to mimic and elevate modern platforms like NoBroker, Havenly offers an intuitive property discovery engine with real-time dynamic filtering across rental, residential purchase, and commercial real estate categories.

Whether you're looking for a cozy 1 BHK apartment, a luxury villa, or listing your commercial office space, Havenly provides a seamless user journey with zero brokerage fees, instant phone/email verification workflows, and secure authentication.

---

## ⚡ Animated Tech Stack

### Frontend & UI Ecosystem
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,vite,js,html,css,figma,postman&theme=dark" alt="Frontend Tech Stack" />
  </a>
</p>

- **Core Library:** React 19 (`react` & `react-dom`)
- **Build Tooling:** Vite 8 (Hot Module Replacement & Lightning Fast Bundling)
- **Routing:** React Router DOM v7
- **Styling Architecture:** Modular Vanilla CSS Design System with glassmorphism, responsive grid layouts, and custom micro-animations

---

### Backend & Database Engine
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,dotenv&theme=dark" alt="Backend Tech Stack" />
  </a>
</p>

- **Runtime:** Node.js (ES Modules syntax)
- **Web Framework:** Express 5 (`express@^5.2.1`)
- **Database Layer:** MongoDB with Mongoose ODM + **Hybrid In-Memory Fallback System**
- **Security & Authentication:** JSON Web Token (`jsonwebtoken`), `bcryptjs` hashing, HTTP-Only Cookie parser (`cookie-parser`), CORS, Helmet security headers

---

## ✨ Key Features

### 🔍 1. Multi-Category Property Search & Smart Filtering
- Seamless tab switching between **Rent**, **Buy**, and **Commercial** properties.
- Dynamic filtering by **Location**, **Budget range**, **BHK Configuration** (1 BHK to 4+ BHK), and **Property/Space type** (Apartment, Villa, Office, Warehouse).
- Instant visual clear filters and responsive hero search section.

### 🛡️ 2. Dual-Engine Authentication Engine
- **MongoDB + Mongoose Integration**: Production-ready document storage for user profile management.
- **Auto Fallback Memory Database**: Built-in zero-config in-memory fallback allowing seamless operation even when MongoDB is offline or disconnected during development.
- **Secure Token Storage**: Passwords hashed with `bcryptjs` salt factor 12, JWT issued into secure `HTTP-Only` cookies to protect against XSS attacks.

### 🏠 3. Owner Property Listing & Verification Pipeline
- Interactive step-by-step verification pipeline (`/list-property/verify`) for owners.
- Verified badges for listed properties ensuring high-trust transactions.
- Tailored forms capturing detailed property specs, amenities, and rental conditions.

### 📱 4. Responsive & Modern Aesthetics
- Ultra-modern UI designed with curated color palettes, subtle hover state transitions, and responsive grid layouts optimized for mobile, tablet, and desktop views.

---

## 📂 Project Architecture

```
nobroker_website/
├── 📁 backend/                    # Node.js & Express API Server
│   ├── 📁 src/
│   │   ├── 📁 config/            # DB Connections & Environment Config
│   │   ├── 📁 Controllers/       # Business Logic & Auth Handlers
│   │   ├── 📁 Middlewares/       # JWT Verification & Global Error Handler
│   │   ├── 📁 Models/            # Mongoose Schemas (User, Temp OTP)
│   │   ├── 📁 Routes/            # Express Router Definitions (/api/user)
│   │   ├── 📁 utils/             # AppError class, JWT Signing, Async Catchers
│   │   ├── app.js               # Express application initialization
│   │   └── server.js            # Server startup & DB initialization listener
│   ├── package.json
│   └── nodemon.json
│
└── 📁 frontend/                   # React 19 + Vite Web Application
    ├── 📁 src/
    │   ├── 📁 assets/            # Static media and brand logos
    │   ├── 📁 components/        # Reusable UI Components (AuthForm, Brand, Icons)
    │   ├── 📁 contexts/          # React Context API (AuthContext, State)
    │   ├── 📁 data/              # Static Mock Data & Options
    │   ├── 📁 pages/             # Page Views (Browsing, Buy, Rent, List, Verification)
    │   ├── 📁 utils/             # API Axios/Fetch Helper utilities
    │   ├── App.jsx               # Protected & Public Router Configuration
    │   ├── style.css             # Main Design System & Global Stylesheet
    │   └── main.jsx              # React DOM Root Renderer
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- [npm](https://www.npmjs.com/) v9.0.0 or higher
- [MongoDB](https://www.mongodb.com/) (Optional - in-memory mode automatically activates if MongoDB is absent)

---

### 🛠️ 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/havenly
   JWT_SECRET=your_super_secret_jwt_key_here
   CLIENT_URL=http://localhost:5173
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:5000`*

---

### 💻 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will be accessible at `http://localhost:5173`*

---

## 🔐 API Reference

### Base URL: `/api`

| Endpoint | Method | Access | Description |
| :--- | :---: | :---: | :--- |
| `/health` | `GET` | Public | System status and API health check |
| `/user/register` | `POST` | Public | Register new user account (Full Name, Email, Phone, Password) |
| `/user/login` | `POST` | Public | Authenticate user & issue HTTP-Only JWT Cookie |
| `/user/admin/login` | `POST` | Admin only | Authenticate an existing account whose `role` is `admin` |
| `/user/logout` | `POST` | Public | Clear JWT token cookie |
| `/user/me` | `GET` | Protected | Fetch current logged-in user profile |

---

## 🗺️ Roadmap & Future Scope

- [x] Initial UI Design System & Component Library
- [x] Rent, Buy, & Commercial Property Search Engine
- [x] Dual-engine Auth (MongoDB + Fallback Memory DB)
- [x] Property Verification Workflow for Owners
- [ ] Real-time Chat between Property Owners & Buyers/Tenants (Socket.io)
- [ ] Interactive Map Integration (Mapbox API / Google Maps API)
- [ ] Integrated Rental Agreement Generator & E-Signature
- [ ] Online Rent Payment Gateway Integration (Razorpay / Stripe)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**. See `LICENSE` for more information.

<div align="center">
  <br />
  <p>Made with ❤️ for a hassle-free, zero-brokerage real estate experience.</p>
</div>
