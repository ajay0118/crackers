# Pre-Deployment Checklist

Follow these steps **BEFORE** pushing to Git and deploying to Vercel. This ensures everything works correctly.

---

## ✅ Step 1: Verify Dependencies Are Installed

```bash
npm install
```

**Check:** Make sure there are no errors and all packages are installed.

---

## ✅ Step 2: TypeScript Type Checking

```bash
npm run check
```

**Expected:** No errors, just exits cleanly  
**If errors:** Fix TypeScript errors before proceeding

---

## ✅ Step 3: Build the Project Locally

```bash
npm run build
```

**Expected Output:**
- ✅ Vite builds successfully
- ✅ Creates `dist/public/` folder with:
  - `index.html`
  - `assets/` folder with JS, CSS, and images
- ✅ Creates `dist/index.js` (server bundle)

**If build fails:**
- Check error messages
- Fix any import errors
- Ensure all dependencies are installed
- Verify TypeScript types are correct

---

## ✅ Step 4: Test Production Build Locally (Optional but Recommended)

```bash
npm run start
```

**Expected:**
- Server starts on port 5000 (or PORT env variable)
- You can access `http://localhost:5000`
- Frontend loads correctly
- No console errors

**Note:** You'll need `DATABASE_URL` set if your app uses a database:
```powershell
# PowerShell
$env:DATABASE_URL="postgresql://user:pass@host:port/db"
npm run start
```

**If it doesn't work:**
- Check server logs
- Verify environment variables
- Test database connection if needed

---

## ✅ Step 5: Verify Build Output Structure

Make sure these folders/files exist after build:

```
dist/
├── index.js              ← Server bundle
└── public/               ← Frontend build
    ├── index.html
    ├── favicon.png
    └── assets/
        ├── *.js
        ├── *.css
        └── *.png (images)
```

**Check:** All files are present and not corrupted

---

## ✅ Step 6: Review Environment Variables

Make a list of environment variables your app needs:

**Required:**
- `DATABASE_URL` - PostgreSQL connection string

**Optional:**
- `PORT` - Server port (defaults to 5000)
- `NODE_ENV` - Usually set automatically

**Action:** Document these - you'll need to add them in Vercel dashboard

---

## ✅ Step 7: Test Critical Features Locally

Before deploying, test these in development mode:

```bash
npm run dev
```

**Test:**
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Products page displays
- [ ] Product details work
- [ ] Cart functionality (if applicable)
- [ ] API endpoints respond (if any)
- [ ] No console errors
- [ ] No broken images
- [ ] Responsive design works

---

## ✅ Step 8: Check for Sensitive Data

**IMPORTANT:** Before pushing to Git, check for:

- [ ] No API keys in code
- [ ] No passwords in code
- [ ] No `.env` file committed (should be in `.gitignore`)
- [ ] No database credentials hardcoded
- [ ] All secrets moved to environment variables

**Check `.gitignore`:**
```bash
# Should include:
.env
.env.local
node_modules/
dist/
```

---

## ✅ Step 9: Verify Vercel Configuration

Check that these files exist and are correct:

- [ ] `vercel.json` - Configuration file exists
- [ ] `api/index.ts` - Serverless function exists
- [ ] Build command in `vercel.json` matches `package.json` scripts

**Quick check:**
```bash
# Verify files exist
dir vercel.json
dir api\index.ts
```

---

## ✅ Step 10: Final Build Test

Run one final build to ensure everything is ready:

```bash
npm run build
```

**If successful:** ✅ You're ready to deploy!

---

## 🚨 Common Issues & Fixes

### Build Fails with "Cannot find module"
**Fix:** Run `npm install` again

### TypeScript Errors
**Fix:** Run `npm run check` and fix all type errors

### Build Output Missing Files
**Fix:** Check `vite.config.ts` and `package.json` build script

### Port Already in Use
**Fix:** Change PORT or close the process using that port

### Database Connection Errors
**Fix:** Verify `DATABASE_URL` is set correctly

---

## 📋 Quick Pre-Deployment Command Sequence

Run these commands in order:

```bash
# 1. Install dependencies
npm install

# 2. Type check
npm run check

# 3. Build
npm run build

# 4. (Optional) Test production build
# Set DATABASE_URL first if needed
npm run start
```

**If all pass:** ✅ Ready for Git and Vercel!

---

## Next Steps After This Checklist

Once everything passes:

1. ✅ **Initialize Git** (if not already done)
2. ✅ **Commit your code**
3. ✅ **Push to GitHub**
4. ✅ **Deploy to Vercel** (see `VERCEL_DEPLOYMENT.md`)

---

## Summary

**Before deploying, you MUST:**
1. ✅ Build succeeds (`npm run build`)
2. ✅ No TypeScript errors (`npm run check`)
3. ✅ Build output is correct (`dist/public/` exists)
4. ✅ No sensitive data in code
5. ✅ Vercel config files exist

**Then you can:**
- Push to Git
- Deploy to Vercel

---

**Current Status:** ✅ Build tested and working!

