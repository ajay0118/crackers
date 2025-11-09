# Vercel Deployment Guide

This guide will walk you through deploying your EcomDemoGen application to Vercel step-by-step.

## Prerequisites

Before you begin, make sure you have:
- A Vercel account (sign up at [vercel.com](https://vercel.com) if you don't have one)
- A PostgreSQL database (you can use services like Neon, Supabase, Railway, or Vercel Postgres)
- Git installed on your computer
- Your project code ready

---

## Step 1: Prepare Your Database

### Option A: Use Vercel Postgres (Recommended for simplicity)

1. Go to your Vercel dashboard
2. Navigate to the **Storage** tab
3. Click **Create Database** → Select **Postgres**
4. Choose a name and region for your database
5. Copy the connection string (you'll need this in Step 4)

### Option B: Use External Database Service

Popular options:
- **Neon** (neon.tech) - Free tier available
- **Supabase** (supabase.com) - Free tier available
- **Railway** (railway.app) - Free tier available

1. Sign up for your chosen service
2. Create a new PostgreSQL database
3. Copy the connection string (format: `postgresql://user:password@host:port/database`)

---

## Step 2: Set Up Your Database Schema

If you need to initialize your database schema:

1. **Set your DATABASE_URL locally:**
   ```powershell
   # PowerShell
   $env:DATABASE_URL="your_connection_string_here"
   ```

   ```bash
   # Bash/CMD
   set DATABASE_URL=your_connection_string_here
   ```

2. **Push the schema:**
   ```bash
   npm run db:push
   ```

This will create the necessary tables in your database.

---

## Step 3: Prepare Your Code for Deployment

The project is already configured for Vercel with:
- ✅ `vercel.json` configuration file
- ✅ `api/index.ts` serverless function wrapper
- ✅ Build scripts configured

**No code changes needed!** Just make sure your code is committed to Git.

---

## Step 4: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended for first-time)

1. **Push your code to GitHub:**
   - Create a new repository on GitHub
   - Push your code:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin https://github.com/yourusername/your-repo-name.git
     git push -u origin main
     ```

2. **Import project to Vercel:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click **Add New** → **Project**
   - Import your GitHub repository
   - Vercel will auto-detect the settings from `vercel.json`

3. **Configure Environment Variables:**
   - In the project settings, go to **Environment Variables**
   - Add the following:
     - **Name:** `DATABASE_URL`
     - **Value:** Your PostgreSQL connection string
     - **Environment:** Production, Preview, and Development (select all)
   - Click **Save**

4. **Deploy:**
   - Click **Deploy**
   - Wait for the build to complete (usually 2-5 minutes)

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked about environment variables, add `DATABASE_URL`

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

---

## Step 5: Configure Environment Variables on Vercel

After deployment, make sure your environment variables are set:

1. Go to your project on Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add/verify these variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NODE_ENV` - Set to `production` (usually set automatically)

4. **Important:** After adding/changing environment variables, you need to redeploy:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Select **Redeploy**

---

## Step 6: Verify Your Deployment

1. **Check the deployment:**
   - Go to your Vercel dashboard
   - Click on your project
   - You should see a deployment URL (e.g., `your-project.vercel.app`)

2. **Test the application:**
   - Open the deployment URL in your browser
   - Test the main features:
     - Homepage loads
     - Products page works
     - Navigation works
     - API endpoints respond (if you have any)

3. **Check logs if there are issues:**
   - Go to **Deployments** tab
   - Click on the deployment
   - Check **Functions** tab for serverless function logs
   - Check **Build Logs** for build errors

---

## Step 7: Custom Domain (Optional)

If you want a custom domain:

1. Go to **Settings** → **Domains**
2. Add your domain
3. Follow Vercel's instructions to configure DNS
4. Wait for DNS propagation (can take up to 48 hours)

---

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
- Make sure all dependencies are in `package.json`
- Check that `npm install` runs successfully locally

**Error: "Build command failed"**
- Check the build logs in Vercel dashboard
- Try building locally: `npm run build`
- Ensure TypeScript compiles: `npm run check`

### Runtime Errors

**Error: "DATABASE_URL is not defined"**
- Go to **Settings** → **Environment Variables**
- Verify `DATABASE_URL` is set for all environments
- Redeploy after adding variables

**Error: "Cannot connect to database"**
- Verify your database connection string is correct
- Check if your database allows connections from Vercel's IPs
- Some databases require IP whitelisting (check your database provider's docs)

**404 errors on routes**
- This is normal for client-side routing
- The `vercel.json` rewrites should handle this
- If not working, check that `dist/public/index.html` exists after build

### Function Timeout

**Error: "Function execution exceeded timeout"**
- Vercel has a 10-second timeout on Hobby plan
- Check your API routes for slow operations
- Consider optimizing database queries
- Upgrade to Pro plan for longer timeouts (60 seconds)

---

## Project Structure for Vercel

```
your-project/
├── api/
│   └── index.ts          # Serverless function (handles all requests)
├── client/               # React frontend
├── server/               # Express backend code
├── shared/               # Shared schemas
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies and scripts
└── dist/                 # Build output (generated)
    └── public/           # Static files served by Vercel
```

---

## Important Notes

1. **Database Connection:**
   - Make sure your database allows connections from anywhere (or whitelist Vercel IPs)
   - Use connection pooling if possible (many providers offer this)

2. **Environment Variables:**
   - Never commit `.env` files to Git
   - Always set environment variables in Vercel dashboard
   - Different values can be set for Production, Preview, and Development

3. **Build Output:**
   - The build creates `dist/public` with your frontend
   - The `api/` folder contains serverless functions
   - Vercel automatically detects and deploys both

4. **Cold Starts:**
   - Serverless functions may have a "cold start" delay on first request
   - This is normal and usually resolves after the first request
   - Consider using Vercel Pro for better performance

5. **File Size Limits:**
   - Serverless function size limit: 50MB (Hobby), 250MB (Pro)
   - If you hit limits, optimize dependencies or use external storage

---

## Next Steps After Deployment

1. **Share the URL with your client:**
   - The deployment URL is automatically generated
   - You can find it in the Vercel dashboard

2. **Set up monitoring:**
   - Enable Vercel Analytics (if needed)
   - Set up error tracking (e.g., Sentry)

3. **Configure preview deployments:**
   - Every Git push creates a preview deployment
   - Perfect for testing before production

4. **Set up CI/CD:**
   - Vercel automatically deploys on Git pushes
   - Configure branch protection if needed

---

## Support

If you encounter issues:
1. Check Vercel's [documentation](https://vercel.com/docs)
2. Review build and function logs in the dashboard
3. Test locally first: `npm run build && npm run start`
4. Check Vercel's [status page](https://www.vercel-status.com/)

---

## Summary Checklist

- [ ] Database created and connection string obtained
- [ ] Database schema initialized (if needed)
- [ ] Code pushed to GitHub/GitLab
- [ ] Project imported to Vercel
- [ ] Environment variables configured (`DATABASE_URL`)
- [ ] Deployment successful
- [ ] Application tested on live URL
- [ ] Custom domain configured (optional)
- [ ] Client notified with deployment URL

Congratulations! Your application is now live on Vercel! 🎉

