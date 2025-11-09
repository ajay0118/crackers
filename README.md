# EcomDemoGen - E-commerce Demo Application

A full-stack TypeScript e-commerce application built with React, Express, and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL database (or a PostgreSQL connection string)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

The application requires a `DATABASE_URL` environment variable for PostgreSQL. You can set it in one of the following ways:

**Option A: Create a `.env` file in the root directory:**
```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

**Option B: Set it in your terminal (PowerShell):**
```powershell
$env:DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

**Option C: Set it in your terminal (Command Prompt):**
```cmd
set DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

### 3. Set Up the Database (if needed)

If you need to push the database schema:
```bash
npm run db:push
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will start on **port 5000** by default (or the port specified in the `PORT` environment variable).

Open your browser and navigate to: **http://localhost:5000**

## Available Scripts

- `npm run dev` - Start the development server (with hot reload)
- `npm run build` - Build the application for production
- `npm run start` - Start the production server (requires build first)
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes to your database

## Project Structure

- `client/` - React frontend application
- `server/` - Express backend API
- `shared/` - Shared TypeScript schemas and types
- `attached_assets/` - Static assets (images, etc.)

## Notes

- The development server runs both the frontend (Vite) and backend (Express) on the same port
- In development mode, Vite handles hot module replacement for the frontend
- The application uses Drizzle ORM for database management
- Default port is 5000, but can be changed via the `PORT` environment variable

## Pre-Deployment Checklist

**⚠️ IMPORTANT:** Before deploying, make sure your project builds successfully!

See **[PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md)** for a complete checklist.

**Quick Pre-Deployment Steps:**
```bash
# 1. Type check
npm run check

# 2. Build the project
npm run build

# 3. (Optional) Test production build locally
npm run start
```

If all steps pass, you're ready to deploy! ✅

## Deployment to Vercel

This project is configured for easy deployment to Vercel. See **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** for complete step-by-step instructions.

**Quick Start:**
1. ✅ Complete pre-deployment checklist (build must succeed)
2. Set up a PostgreSQL database (Vercel Postgres, Neon, Supabase, etc.)
3. Push your code to GitHub
4. Import the project to Vercel
5. Add `DATABASE_URL` environment variable
6. Deploy!

The project includes:
- ✅ `vercel.json` configuration
- ✅ Serverless function wrapper in `api/index.ts`
- ✅ Optimized build settings

