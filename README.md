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

**Havenly** is a full-stack real estate platform designed to connect property owners and property seekers directly, with a focus on a simple, modern, zero-brokerage experience.

The platform is organized as a single repository containing two separate frontend applications — **Web** for property seekers/owners and **Admin** for platform management — backed by a shared **Node.js + Express API service**.

The project is structured so that each application can grow independently while common business logic remains centralized in the API.

---

## ⚡ Animated Tech Stack

### Frontend & UI Ecosystem

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,vite,js,html,css,figma,postman&theme=dark" alt="Frontend Tech Stack" />
  </a>
</p>

- **Core Library:** React 19
- **Build Tooling:** Vite
- **Routing:** React Router
- **Styling:** Modular CSS with responsive layouts, reusable UI components, and micro-interactions
- **Applications:** Separate Web and Admin frontend applications

---

### Backend & Database Engine

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,dotenv&theme=dark" alt="Backend Tech Stack" />
  </a>
</p>

- **Runtime:** Node.js
- **Web Framework:** Express
- **Database Layer:** MongoDB with Mongoose
- **Authentication:** JWT-based authentication with secure cookie support
- **Security:** Password hashing, authentication middleware, authorization/RBAC, CORS, and environment-based configuration
- **API Style:** REST API organized by business modules

---

## ✨ Key Features

### 🔍 1. Multi-Category Property Discovery

- Search and browse properties based on user requirements.
- Support for **Rent**, **Buy**, and **Commercial** property flows.
- Filtering can be extended by location, budget, BHK, property type, and other property attributes.
- Responsive property discovery experience across desktop, tablet, and mobile.

### 🏠 2. Property Owner Listing

- Owners can create and manage property listings.
- Structured property information keeps listing data consistent.
- Property listing workflows can include verification and approval stages.
- Designed for future expansion into property media, amenities, availability, and owner preferences.

### 🛡️ 3. Authentication & Authorization

- Separate user and admin application experiences.
- Secure user authentication through the shared API.
- Passwords are stored using secure hashing.
- JWT-based authentication protects private API resources.
- Role-based authorization keeps admin-only operations separate from regular user operations.
- Admin accounts are intended to be provisioned securely rather than exposing public admin registration.

### 🧑‍💼 4. Dedicated Admin Application

The admin application is intentionally separated from the public web application.

Admin responsibilities can include:

- User management
- Property management
- Listing verification
- Platform monitoring
- Reports and analytics
- Administrative operations

Both applications communicate with the same backend API, keeping the business logic centralized.

### 📱 5. Modern Responsive Experience

- Clean and modern interface.
- Reusable components.
- Responsive layouts.
- Scalable frontend structure.
- Separate Web and Admin UI boundaries.

---

## 📂 Project Architecture

The project follows a **single-repository monorepo-style structure**.

```text
property-listing-web/
│
├── 📁 app/
│   │
│   ├── 📁 web/                         # Public Web Application
│   │   ├── 📁 src/
│   │   │   ├── 📁 app/                 # App setup, providers & routing
│   │   │   ├── 📁 features/            # Business-focused frontend modules
│   │   │   ├── 📁 components/          # Reusable UI components
│   │   │   ├── 📁 pages/               # Web application pages
│   │   │   ├── 📁 hooks/               # Reusable React hooks
│   │   │   ├── 📁 services/            # API/service communication
│   │   │   ├── 📁 utils/               # Helper functions
│   │   │   ├── 📁 constants/            # Shared frontend constants
│   │   │   ├── 📁 types/                # Frontend types/interfaces
│   │   │   └── 📁 assets/               # Images, icons & static assets
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   └── package.json
│   │
│   └── 📁 admin/                       # Admin Dashboard Application
│       ├── 📁 src/
│       │   ├── 📁 app/                 # Admin app setup & routing
│       │   ├── 📁 features/            # Admin business modules
│       │   ├── 📁 components/          # Reusable admin UI components
│       │   ├── 📁 pages/               # Admin pages
│       │   ├── 📁 hooks/               # Reusable admin hooks
│       │   ├── 📁 services/             # API/service communication
│       │   ├── 📁 utils/                # Helper functions
│       │   ├── 📁 constants/            # Admin constants
│       │   ├── 📁 types/                # Admin types/interfaces
│       │   └── 📁 assets/               # Admin assets
│       ├── index.html
│       ├── vite.config.js
│       └── package.json
│
├── 📁 service/
│   └── 📁 api/                         # Shared Backend API
│       ├── 📁 src/
│       │   ├── 📁 config/              # Database & environment configuration
│       │   ├── 📁 modules/             # Business modules
│       │   │   ├── 📁 auth/             # Authentication
│       │   │   ├── 📁 users/            # User management
│       │   │   ├── 📁 admins/           # Admin management
│       │   │   ├── 📁 properties/       # Property management
│       │   │   ├── 📁 search/           # Search & filtering
│       │   │   ├── 📁 payments/         # Payment-related logic
│       │   │   ├── 📁 notifications/    # Notifications
│       │   │   └── 📁 reports/          # Reports & analytics
│       │   ├── 📁 middleware/           # Auth, RBAC & error middleware
│       │   ├── 📁 shared/               # Shared backend utilities
│       │   ├── 📁 routes/               # API route registration
│       │   ├── app.js                   # Express application
│       │   └── server.js                # Server startup
│       ├── package.json
│       └── .env                         # Local environment file (ignored by Git)
│
├── 📁 packages/                         # Shared packages (as the project grows)
│   ├── 📁 types/
│   ├── 📁 constants/
│   ├── 📁 eslint-config/
│   └── 📁 ui/
│
├── 📁 docs/                             # Project documentation
│   ├── 📁 architecture/
│   ├── 📁 api/
│   └── 📁 development/
│
├── 📁 scripts/                          # Project automation & database scripts
│   ├── seedAdmin.js
│   └── seedDatabase.js
│
├── 📁 .github/                          # CI/CD and GitHub configuration
│
├── .gitignore
├── .editorconfig
├── package.json
├── package-lock.json
└── README.md
```

> **Architecture principle:** Web and Admin are separate frontend applications, while the API remains centralized. This keeps the project easy to maintain without duplicating backend business logic.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+
- MongoDB
- Git

---

### 🛠️ 1. Clone the Repository

```bash
git clone <repository-url>
cd property-listing-web
```

---

### 💻 2. Install Web Application

```bash
cd app/web
npm install
```

Start the Web application:

```bash
npm run dev
```

---

### 🧑‍💼 3. Install Admin Application

Open another terminal:

```bash
cd app/admin
npm install
```

Start the Admin application:

```bash
npm run dev
```

---

### ⚙️ 4. Setup API Service

Open another terminal:

```bash
cd service/api
npm install
```

Create your local environment file:

```text
service/api/.env
```

Example:

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

CLIENT_ORIGIN=http://localhost:5173
```

> Never commit `.env` files or real credentials to Git.

Start the API:

```bash
npm run dev
```

---

## 🔐 Authentication & Authorization Flow

Havenly follows a clear separation between **authentication** and **authorization**.

```text
User
 │
 ├── Register
 │      ↓
 │   User Account
 │
 └── Login
        ↓
   Authentication
        ↓
     JWT Token
        ↓
  Auth Middleware
        ↓
   Role / Permission Check
        ↓
 ┌───────────────┬────────────────┐
 │ Regular User  │     Admin      │
 │               │                │
 │ Web App       │   Admin App    │
 └───────────────┴────────────────┘
```

### Admin Account

Admin accounts are designed to be created securely through a controlled provisioning/seed process rather than exposing a public admin registration endpoint.

This keeps administrative account creation separate from normal user registration.

---

## 🔌 API Reference

The API is located inside:

```text
service/api/
```

API routes are organized around business modules rather than placing all controllers and logic into one large directory.

### Planned API Organization

| Module | Responsibility |
| :--- | :--- |
| `/auth` | Authentication and session/token operations |
| `/users` | User profile and account operations |
| `/admins` | Administrative operations |
| `/properties` | Property creation, update and management |
| `/search` | Property search and filtering |
| `/payments` | Payment-related operations |
| `/notifications` | User/admin notifications |
| `/reports` | Reports and analytics |

> Endpoint paths should be documented here as they are implemented. This keeps the README aligned with the actual API instead of documenting endpoints that do not exist yet.

---

## 🗺️ Roadmap & Future Scope

- [x] Initial project architecture
- [x] Separate Web and Admin frontend applications
- [x] Centralized backend API structure
- [x] Environment configuration and Git protection for `.env`
- [ ] User authentication
- [ ] Admin authentication
- [ ] Role-based access control
- [ ] Property listing management
- [ ] Advanced property search & filtering
- [ ] Property verification workflow
- [ ] Real-time chat between owners and seekers
- [ ] Interactive map integration
- [ ] Rental agreement generation
- [ ] Online payment integration
- [ ] Notifications system
- [ ] Reports & analytics dashboard

---

## 🤝 Development Guidelines

To keep the project maintainable as the team grows:

1. Keep **Web** and **Admin** frontend code inside their respective applications.
2. Keep business logic inside the **API service** rather than duplicating it in frontend applications.
3. Organize backend code by **business module**.
4. Keep authentication and authorization logic centralized.
5. Reuse shared code only when it is genuinely shared.
6. Never commit `.env` files, credentials, API keys, or secrets.
7. Keep README and architecture documentation updated when major structure changes are introduced.
8. Prefer small, focused modules over large files containing unrelated responsibilities.

---

## 🌿 Git Workflow

Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

Commit your changes:

```bash
git add .
git commit -m "Add property search feature"
```

Push the branch:

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request for review.

---

## 📄 License

Distributed under the **ISC License**.

---

<div align="center">

  <br />

  <p>Made with ❤️ for a simpler, transparent, zero-brokerage real estate experience.</p>

</div>
