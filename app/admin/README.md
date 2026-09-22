# Havenly Admin Command Center (`app/admin`)

This directory houses the administrative dashboard application for Havenly (No Brokerage Direct Deals Property Marketplace).

---

## 🏗️ Architecture & State Overview

The admin application is built with **React 19**, **React Router v7**, **Vite**, and **Recharts**. It is designed with a decoupled architecture where data fetching goes through a repository pattern (`adminRepository.js`), enabling seamless switching between **Instant Reactive Mock Mode** and **Live REST API Mode**.

### Key Architectural Layers:

```
┌─────────────────────────────────────────────────────────┐
│                  React UI Components                    │
│     (DashboardPage, UsersPage, PropertiesPage, etc.)    │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    useAdminResource                     │
│                (Client Caching & Hooks)                 │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    adminRepository                      │
│        (Unified Interface for Data Operations)          │
└──────────────┬───────────────────────────┬──────────────┘
               │ (Mock Mode)               │ (API Mode)
               ▼                           ▼
┌────────────────────────────┐  ┌─────────────────────────┐
│     mockAdminService       │  │        apiClient        │
│   (Instant 0ms Fallback)   │  │ (Axios REST HTTP API)   │
└────────────────────────────┘  └─────────────────────────┘
```

---

## 🔌 Backend Integration Specification

To connect a live backend server (Node.js/Express, Python/Django, Go, etc.):

1. Configure `VITE_API_BASE_URL` in your `.env` file inside `app/admin`:
   ```env
   VITE_API_BASE_URL=https://api.havenly.com/api
   VITE_USE_MOCK=false
   ```
2. Ensure your backend returns CORS headers (`Access-Control-Allow-Credentials: true`).

---

## 📑 API Endpoint Integration Matrix

The table below outlines every endpoint, its function, query parameters, request/response schema, and whether it requires backend implementation.

| Feature / Module | Method | Endpoint Path | Managed By | Description & Payload Schema |
| :--- | :--- | :--- | :--- | :--- |
| **Marketplace Telemetry** | `GET` | `/admin/dashboard?period={period}` | **BACKEND REQUIRED** | Returns KPIs, monthly growth trends, city breakdown, distribution, and top listings. `period` supports `7d`, `30d`, `3m`, `6m`, `1y`. |
| **Approve Listing** | `POST` | `/admin/properties/:id/approve` | **BACKEND REQUIRED** | Updates property status to `PUBLISHED` & verification to `VERIFIED`. |
| **Reject Listing** | `POST` | `/admin/properties/:id/reject` | **BACKEND REQUIRED** | Updates property status to `REJECTED`. |
| **User Directory** | `GET` | `/admin/users` | **BACKEND REQUIRED** | List all registered seekers, owners, and agents with filtering support. |
| **User Detail** | `GET` | `/admin/users/:id` | **BACKEND REQUIRED** | Returns detailed user profile, posted listings, and enquiry history. |
| **Property Directory** | `GET` | `/admin/properties` | **BACKEND REQUIRED** | Returns all property listings across residential & commercial categories. |
| **Property Detail** | `GET` | `/admin/properties/:id` | **BACKEND REQUIRED** | Detailed property specs, floorplan, owner details, verification flags. |
| **Locations Tree** | `GET` | `/admin/locations` | **BACKEND REQUIRED** | Hierarchical state > city > locality > project tree. |
| **Services Catalog** | `GET` | `/admin/services` | **BACKEND REQUIRED** | Partner home services (painting, legal, packers & movers). |
| **Payments Audit** | `GET` | `/admin/payments` | **BACKEND REQUIRED** | Transaction audit logs with gateway status (UPI, Card, NetBanking). |
| **Fraud Reports** | `GET` | `/admin/reports` | **BACKEND REQUIRED** | Flagged properties, fake listings, price discrepancy reports. |
| **CMS Content** | `GET/POST`| `/admin/cms` | **BACKEND REQUIRED** | Banners, FAQs, SEO metadata, landing page management. |
| **Support Desk** | `GET/PUT` | `/admin/support` | **BACKEND REQUIRED** | Support tickets, priority levels, assignment, resolution logs. |
| **Admin Management** | `GET/POST`| `/admin/admins` | **BACKEND REQUIRED** | Manage admin team members, role RBAC permissions. |
| **Activity Audit** | `GET` | `/admin/activity-logs` | **BACKEND REQUIRED** | Audit log stream of all administrative actions. |
| **Header Search** | Client / `GET` | `/admin/search?q={query}` | **Frontend + Backend** | Local module search is handled client-side. Backend can extend for global DB entity search. |
| **Date Period Filter** | Client / `GET` | Dynamic parameter | **Frontend + Backend** | Header date picker updates `period` state in context, triggering repository re-fetch. |
| **Admin Profile Edit** | Client / `PUT` | `/admin/profile` | **Frontend + Backend** | Managed immediately in `AdminDataContext` state. Wire `PUT /admin/profile` for persistent DB saving. |

---

## 🛠️ Frontend Features Managed Locally (No Backend Required Now)

1. **Collapsible Sidebar Rail**: Responsive desktop 76px rail mode & mobile sliding overlay drawer handled entirely by CSS & local state.
2. **Global Search Shortcut**: `⌘K` keyboard listener & quick navigation dropdown menu.
3. **Admin Profile & Settings Modal**: Instant state updates for name, email, avatar, and notification preferences via `AdminDataContext`.
4. **Interactive Approval Actions**: Instant UI queue item removal & status badge transitions.
5. **Chart Tab Switching**: Tab selection for Revenue, Users, Properties, and Enquiries metrics.
6. **Lazy Loading Code Splitting**: `React.lazy` component loading with `SkeletonDashboard` placeholders.

---

## 🚀 Step-by-Step Developer Backend Integration Guide

1. **Implement Endpoints**: Build your API server routes matching the Endpoint Matrix above.
2. **Enable Credentials**: Support cookies/JWT bearer headers in your backend CORS middleware.
3. **Environment Setup**: Update `.env` in `app/admin`:
   ```bash
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_USE_MOCK=false
   ```
4. **Run Verification**: Test data fetching with real database tables. In development, any failing API endpoint will gracefully fall back to `mockAdminService`.
