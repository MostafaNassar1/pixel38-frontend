# Pixel38 CMS — Frontend

Public website + admin dashboard for a wood products/services CMS — built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, as part of the Pixel38 Full Stack Developer Technical Assessment.

- **Backend repository:** https://github.com/MostafaNassar1/pixel38-backend
- **Deployed frontend:** https://pixel38-frontend-o3tecj1rs-mostafanassar1s-projects.vercel.app/
- **Backend repository:** https://github.com/MostafaNassar1/pixel38-frontend
- **Note:** The backend is not currently deployed (see backend README for details). Live/dynamic features (admin login, dashboard, database-driven content) require running the backend locally alongside this frontend — see [Setup Instructions](#1-setup-instructions).

## Admin Login Credentials (for local use)

```
Email:    admin@pixel38.com
Password: Admin123
```

---

## Tech Stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **Styling:** Tailwind CSS v4
- **Auth:** React Context holding a short-lived access token in memory, backed by an httpOnly refresh-token cookie issued by the backend

---

## 1. Setup Instructions

### Prerequisites
- Node.js v18+
- The backend running locally (see backend README) for any dynamic/authenticated functionality

### Install and run

```bash
git clone https://github.com/MostafaNassar1/pixel38-frontend.git
cd pixel38-frontend
npm install
```

Create `.env.local` (see [Environment Variables](#2-environment-variables) below).

```bash
npm run dev
```

The site runs at `http://localhost:3001` (port set explicitly to avoid colliding with the backend on port 3000).

### Pages

| Route | Description |
|---|---|
| `/` | Public homepage — hero, wood types, gallery, advantages, about, contact form |
| `/gallery`, `/prices`, `/about`, `/contact` | Public sub-pages |
| `/admin/login` | Admin login |
| `/admin` | Dashboard overview (protected) |
| `/admin/services` | Services CRUD (protected) |
| `/admin/products` | Products CRUD + image upload/management (protected) |
| `/admin/homepage` | Homepage content editor (protected) |

---

## 2. Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

This must point at wherever the backend is actually running/deployed. For local development against a local backend, the value above is correct as-is.

---

## 3. Architecture Overview

```
app/
├── components/
│   ├── layout/       # Header (with transparent-on-homepage variant), Footer
│   ├── sections/       # Hero, WoodTypes, Gallery, Advantages, AboutUs, ContactForm, PriceList, ContactInfo
│   └── admin/            # ServiceForm, ProductForm (modals used by the dashboard)
├── admin/
│   ├── layout.tsx        # Wraps all /admin routes in AuthProvider + route guard
│   ├── login/page.tsx
│   ├── page.tsx           # Dashboard overview
│   ├── services/page.tsx
│   ├── products/page.tsx
│   └── homepage/page.tsx
├── lib/
│   ├── api.ts               # Public data fetch functions + adminFetch() authenticated helper
│   ├── auth.ts                # login / refreshAccessToken / getMe API calls
│   └── AuthContext.tsx          # React Context holding access token + user, exposes login()/logout()
├── page.tsx                       # Homepage
├── not-found.tsx                   # Custom 404
├── layout.tsx                       # Root layout, font loading
└── globals.css                        # Design tokens (colors, fonts) via Tailwind v4 @theme
```

**Architectural Overview:**

Access tokens are held in React state (in-memory), not `localStorage`, which is safer against XSS since the token disappears on refresh; session persistence across refreshes and new tabs is instead handled by silently calling the backend's `/auth/refresh` endpoint on app load, which succeeds automatically via the browser's httpOnly cookie. `AuthProvider` and a route guard are applied once, in `app/admin/layout.tsx`, so every route under `/admin` automatically shares the same auth state and redirects to `/admin/login` if no valid session exists, rather than each page re-implementing that check. All backend communication is centralized through `getProducts()` and `adminFetch()` in `lib/`, so components never write raw `fetch()` calls inline, keeping the base URL, auth headers, and error handling in one place. Design tokens (colors, fonts) are defined once in `globals.css` via Tailwind v4's `@theme inline` block and consumed as utility classes (`bg-card-brown`, `text-accent-orange`, `font-display`) throughout every component, rather than hardcoded hex values scattered across files. Responsive behavior follows Tailwind's `md:` breakpoint (768px) throughout, matching the desktop/mobile Figma frames provided.

## 4. AI Tools Used

**Claude** 
**Copilot** 

## 5. Time Spent

See backend README — approximately 1–2 days total across both frontend and backend.
