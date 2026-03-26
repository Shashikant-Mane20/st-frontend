# ✅ Frontend Vercel Deployment Checklist

## Pre-Deployment 📋

- [ ] All code committed to GitHub
- [ ] `.env` file is NOT in GitHub (proper `.gitignore`)
- [ ] `vercel.json` exists in frontend folder ✓
- [ ] `package.json` has valid build script ✓
- [ ] `package.json` has valid start script ✓
- [ ] Backend is deployed and running (`https://st-backend-l3nw.onrender.com/api`)
- [ ] Backend environment variables are configured
- [ ] All imports in `src/` resolve correctly

## Vercel Setup 🚀

### Step 1: Create Vercel Account

- [ ] Go to https://vercel.com/signup
- [ ] Sign up with GitHub (recommended)
- [ ] Verify email
- [ ] Authorize Vercel to access GitHub

### Step 2: Import Project

- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New..." → "Project"
- [ ] Select `tours-and-travels-website` repository
- [ ] Click "Import"

### Step 3: Configure Project

- [ ] Framework Preset: **React** ✓ (auto-detected)
- [ ] Build Command: **npm run build** ✓ (auto-detected)
- [ ] Output Directory: **build** ✓ (should have `vercel.json`)
- [ ] Root Directory: **frontend/** ← IMPORTANT!
- [ ] Click "Next" to continue

### Step 4: Add Environment Variables

- [ ] `REACT_APP_API_URL`: `https://st-backend-l3nw.onrender.com/api`
- [ ] `REACT_APP_ENV`: `production`
- [ ] Click "Deploy"

## Deployment 🎯

### Building & Deployment

- [ ] Wait for "Building..." to complete (2-5 minutes)
- [ ] Status should change to ✅ "Ready"
- [ ] Get your deployment URL (e.g., shreeja-tours.vercel.app)
- [ ] Check "Preview" to see the live site

### First Deployment Check

- [ ] Frontend URL is accessible
- [ ] No "Failed to compile" errors
- [ ] Homepage loads properly
- [ ] Navigation menu displays
- [ ] No console errors (check DevTools F12)

## Testing Functionality ✅

### Page Navigation

- [ ] Homepage loads ✓
- [ ] Navigate to "Browse Tours" works ✓
- [ ] Tour Detail page loads ✓
- [ ] Contact page works ✓

### API Integration

- [ ] Tours load from backend API ✓
- [ ] Search/Filter works ✓
- [ ] Booking form submits to backend ✓
- [ ] User authentication works (Sign Up/Login) ✓
- [ ] My Bookings page loads (if logged in) ✓

### Admin Features (if you're admin user)

- [ ] Admin Dashboard accessible ✓
- [ ] Can create new tour ✓
- [ ] Can view bookings ✓
- [ ] Can delete/edit tours ✓

### Responsive Design

- [ ] Mobile view looks good (375px) ✓
- [ ] Tablet view responsive (768px) ✓
- [ ] Desktop view optimized (1440px+) ✓
- [ ] Navigation hamburger menu works on mobile ✓

### Images & Assets

- [ ] Tour images load properly ✓
- [ ] Booking card images display ✓
- [ ] No broken image icons ✓
- [ ] Icons and logos load correctly ✓

## Production Settings 📊

### Monitoring Setup

- [ ] Enable Vercel Analytics (optional)
- [ ] Check "Deployments" tab regularly
- [ ] Monitor error logs in "Monitoring" tab
- [ ] Set up GitHub PR preview deployments (optional)

### Performance

- [ ] Run Lighthouse audit (DevTools → Lighthouse)
- [ ] Target: 90+ Performance score
- [ ] Check Core Web Vitals in Vercel Analytics

### Environment Variables Management

- [ ] Saved in Vercel dashboard
- [ ] **NOT** in GitHub repo
- [ ] Can be updated anytime in Settings

## Auto-Deployment 🔄

### Enable Auto-Deploy

- [ ] Every GitHub push auto-deploys (default)
- [ ] No manual action needed
- [ ] Check Deployments tab for status
- [ ] Verified by committing test changes

### Rollback Procedure

- [ ] Go to "Deployments" tab
- [ ] Find previous stable deployment
- [ ] Click three dots → "Promote to Production"

## Post-Deployment 🎉

### Share Your Live Site

- [ ] Frontend URL: `https://your-vercel-url.vercel.app`
- [ ] Backend API: `https://st-backend-l3nw.onrender.com/api`
- [ ] Share with team/stakeholders
- [ ] Test on mobile devices
- [ ] Get feedback

### Optional: Custom Domain

- [ ] Go to Vercel Project → Settings → Domains
- [ ] Add your custom domain
- [ ] Follow DNS instructions
- [ ] Wait for SSL certificate (~5-10 mins)
- [ ] Test with custom domain

## Troubleshooting 🔧

| Issue                        | Status | Solution                            |
| ---------------------------- | ------ | ----------------------------------- |
| Build failed                 | ❌     | Check build logs in Deployments tab |
| Routes not working (404)     | ❌     | vercel.json rewrites fix this ✓     |
| API calls fail               | ❌     | Check REACT_APP_API_URL env var     |
| Images not loading           | ❌     | Check backend is running            |
| Slow performance             | ⚠️     | Check Vercel Analytics              |
| Environment vars not applied | ❌     | Redeploy in Deployments tab         |

## Quick Links 🔗

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Project:** https://vercel.com/dashboard/[project-name]
- **Deployments:** Go to project → Deployments tab
- **Environment Variables:** Go to project → Settings → Environment Variables
- **Support:** https://vercel.com/support

---

## Summary

- ✅ **Frontend:** Ready for Vercel
- ✅ **Backend:** Already on Render (st-backend-l3nw.onrender.com)
- ✅ **Database:** MongoDB Atlas connected
- ✅ **Configuration:** vercel.json ready, env vars configured
- ⏳ **Next Step:** Sign up for Vercel → Import repo → Deploy!

**Estimated Time to Live:** 10-15 minutes 🚀
