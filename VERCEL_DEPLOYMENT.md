# Shreeja Tours Frontend - Vercel Deployment Guide

## Prerequisites

1. **GitHub Account** - Your code must be pushed to GitHub
2. **Vercel Account** - Free tier works perfectly (https://vercel.com)
3. **Backend Already Deployed** - Should be running on Render at `https://st-backend-l3nw.onrender.com/api`

---

## Step 1: Push Frontend Code to GitHub

```bash
cd tours-and-travels-website/frontend
git add .
git commit -m "Frontend ready for Vercel deployment"
git push origin main
```

**Make sure:**

- Your `.env` file is in `.gitignore` (it already is)
- Only `package.json` and `package-lock.json` are in git
- All source files in `src/` are committed

---

## Step 2: Create Vercel Account

1. Go to https://vercel.com/signup
2. Choose **"Continue with GitHub"** (recommended)
3. Authorize Vercel to access your GitHub repositories
4. Verify your email
5. You're ready to deploy!

---

## Step 3: Deploy Your Frontend

### Option A: Direct from Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** button
3. Select **"Project"**
4. Find and select your `tours-and-travels-website` repository
5. Click **"Import"**

### Option B: Deploy from GitHub UI

1. Go to your GitHub repository
2. Go to **Settings** → **Integrations**
3. Connect Vercel integration
4. Select the frontend folder to deploy

---

## Step 4: Configure Project Settings

### Framework & Build Settings

- **Framework Preset:** React
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `build` (auto-detected)
- **Install Command:** `npm install` (auto-detected)
- **Development Command:** `npm start` (auto-detected)

### Root Directory (IMPORTANT)

- Set to: `frontend/`
- This tells Vercel where your React app is located

Click **"Continue"** to proceed

---

## Step 5: Add Environment Variables

On the **"Environment Variables"** page, add these:

### Required Variables

| Key                 | Value                                      |
| ------------------- | ------------------------------------------ |
| `REACT_APP_API_URL` | `https://st-backend-l3nw.onrender.com/api` |
| `REACT_APP_ENV`     | `production`                               |

**Important:**

- Only you see these in Vercel dashboard
- They're injected into your build automatically
- React env vars MUST start with `REACT_APP_`

Click **"Deploy"** to start the build and deployment

---

## Step 6: Monitor Deployment

1. Your Vercel dashboard shows real-time build progress
2. Wait for status to turn **"✅ Ready"** (usually 2-5 minutes)
3. You'll see a URL like: `https://shreeja-tours.vercel.app`
4. Click the URL to visit your live frontend!

---

## Step 7: Test Your Deployment

### Check These Features

```
1. ✅ Homepage loads without errors
2. ✅ Navigation menu works
3. ✅ Tours page loads (fetches from backend)
4. ✅ Tour detail page works
5. ✅ Booking form loads
6. ✅ Sign Up / Log In works
7. ✅ My Bookings page works (if logged in)
8. ✅ Admin Dashboard accessible (if admin user)
```

### Quick Test

Open browser DevTools (F12) → Console and check for any errors related to API calls.

---

## Your Production Environment Variables

### Frontend (.env for production)

```
REACT_APP_API_URL=https://st-backend-l3nw.onrender.com/api
REACT_APP_ENV=production
```

### Backend (.env on Render)

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
NODE_ENV=production
PORT=10000
```

---

## Auto-Deployment from GitHub

Every time you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel **automatically deploys** the latest version. No manual action needed!

---

## Create Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain:
   - e.g., `shreeja-tours.com`
   - Follow DNS setup instructions
   - Wait for SSL certificate (usually 5-10 minutes)

---

## Monitoring & Logs

### View Logs

1. Go to your Vercel project dashboard
2. Click **"Deployments"** tab
3. Click a deployment to see build logs
4. Check for any build errors or warnings

### View Real-time Logs

1. Click **"Monitoring"** tab
2. See real-time requests and errors from your live app

---

## Troubleshooting

### Issue: Build Fails

**Check:**

1. Go to Deployments tab and click the failed deployment
2. Scroll to "Build" section to see error message
3. Common causes:
   - Missing dependencies in `package.json`
   - JavaScript syntax errors
   - Port already in use (shouldn't happen on Vercel)

**Solution:**

```bash
# Test locally first
npm install
npm run build

# Check for errors
npm run test
```

### Issue: Routes Not Working (404 errors)

**Root Cause:** React Router routes need rewrite rules
**Solution:** ✅ Already configured in `vercel.json` with:

```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

### Issue: API Calls Fail (Backend Errors)

**Check:**

1. Is backend running? Test: `curl https://st-backend-l3nw.onrender.com/api`
2. Are environment variables set correctly in Vercel dashboard?
3. Check browser console (F12) for error messages
4. Check Vercel Monitoring tab for server-side errors

### Issue: Images Not Loading

**Check:**

1. Image URLs are correct (check in Network tab F12)
2. Backend is serving images properly
3. CORS enabled on backend (it is)

### Issue: Slow Load Time

**Vercel Optimization Tips:**

1. Use `vercel/image` component for image optimization
2. Enable Code Splitting in React
3. Check Vercel Analytics for bottlenecks
4. Upgrade to Pro plan if needed

---

## Environment Variable Management

### Changing Environment Variables

1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Environment Variables"**
3. Edit or add variables
4. **Important:** Redeploy for changes to take effect!

### Redeploying After Env Changes

1. Go to **"Deployments"** tab
2. Click three dots on latest deployment
3. Select **"Redeploy"**
4. Vercel rebuilds with new env variables

---

## Performance Tips

- **React Optimization:**
  - Use `memo()` for expensive components
  - Lazy load routes with `React.lazy()`
  - Use `useCallback()` and `useMemo()` for performance

- **Vercel Optimization:**
  - Enable Preview Deployments for PRs
  - Use Vercel Analytics to monitor performance
  - Consider upgrading to Pro for better performance

---

## Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [React Deployment Best Practices](https://create-react-app.dev/deployment/)
- [Your Vercel Dashboard](https://vercel.com/dashboard)

---

## Deployment Summary

| Component      | Status      | URL                                        |
| -------------- | ----------- | ------------------------------------------ |
| **Frontend**   | ✅ Deployed | `https://your-app.vercel.app`              |
| **Backend**    | ✅ Deployed | `https://st-backend-l3nw.onrender.com/api` |
| **Database**   | ✅ Running  | MongoDB Atlas                              |
| **Full Stack** | ✅ Ready    | Production-Ready MERN App                  |

---

**Your frontend is ready to deploy!** 🚀

Next steps:

1. Push code to GitHub
2. Create Vercel account
3. Import GitHub repository
4. Add environment variables
5. Deploy!

Questions? Check Vercel's documentation or your Vercel dashboard logs.
