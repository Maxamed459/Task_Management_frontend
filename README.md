# Tasky App – Task Management Frontend

Tasky App is a modern, feature-rich task management application built with **Next.js, React, Redux Toolkit, and Tailwind CSS**, designed for easy task and productivity tracking.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Core Pages & Components](#core-pages--components)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Help & Support](#help--support)
- [License](#license)

---

## Features

- **User Authentication**: Login and registration interfaces
- **Task CRUD**: Create, view, update, and mark tasks as complete/incomplete
- **Task Prioritization**: Assign and visualize priorities (low, medium, high)
- **Task Status**: Clearly track which tasks are completed or pending
- **Responsive UI**: Looks great on devices of all sizes
- **State Management**: Powered by Redux Toolkit
- **API Integration**: Fetches and persists tasks from a backend using secure API calls
- **Notifications**: SweetAlert2 for elegant, interactive alerts

---

## Project Structure

```
/app
    /dashboard
        /add-tasks        → Add new tasks page
        /tasks            → View all tasks & detail pages
        /completed-tasks  → View completed tasks
        /settings         → Settings (placeholder)
        /help             → Help & Support resources
/components              → Reusable UI components
/state                   → Redux Toolkit setup & slices
/types                   → TypeScript type definitions
/public                  → Static images and assets
```

---

## Getting Started

First, install all dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

---

## Core Pages & Components

### 🗂 Dashboard `/dashboard/tasks`

View your list of tasks, filter by completion, and click on a task for details. Tasks display priority and deadline.

### ✔ Completed Tasks `/dashboard/completed-tasks`

See all your completed tasks in a dedicated view.

### ➕ Add Tasks `/dashboard/add-tasks`

Create a new task by entering its title, description, due date, priority, and status (completed/on progress).

### ⚙ Settings `/dashboard/settings`

Settings page (currently a placeholder for future features).

### ❓ Help `/dashboard/help`

Resources for help, documentation, and support.

---

## Environment Variables

You must configure an API endpoint for backend connectivity, typically in a `.env.local` file:

```
NEXT_PUBLIC_BACKEND_BASE_URL_TASKS=https://your-api-url/api/tasks
```

---

## Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm start` – Run built app in production mode
- `npm run lint` – Run ESLint on the codebase

---

## Dependencies

- **next** (16+)
- **react** (19+)
- **@reduxjs/toolkit**
- **@tanstack/react-query**
- **axios**
- **lucide/lucide-react**
- **sweetalert2**
- **zod** (validation)
- **tailwindcss** (with PostCSS setup)

---

## Help & Support

- Frequently Asked Questions: `/faq`
- Contact Support: `/contact`
- Documentation: `/documentation`

If you need additional help, check the [Help](/dashboard/help) page in the navigation.

---

## License

This project is for educational and personal productivity purposes. Feel free to customize and extend!
