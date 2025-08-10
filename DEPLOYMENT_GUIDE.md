# 🚀 Aptitude Test Application - Deployment Guide

## ✅ GitHub Repository
Your code is successfully pushed to: **https://github.com/Suther2005/AptitudeTest-Application**

## 🌐 Vercel Deployment Steps

### Step 1: Login to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Grant access to your repositories

### Step 2: Import Your Project
1. Click **"New Project"**
2. Select **"Import Git Repository"**
3. Choose: `Suther2005/AptitudeTest-Application`
4. Click **"Import"**

### Step 3: Configure Build Settings

**Framework Preset:** Vite

**Root Directory:** `frontend` (IMPORTANT: Change from ./ to frontend)

**Build Command:**
```bash
npm run build
```

**Output Directory:** 
```
dist
```

**Install Command:**
```bash
npm install
```

**⚠️ IMPORTANT:** Make sure to set Root Directory to `frontend` - this is crucial!

### Step 4: Environment Variables
In Vercel dashboard, add these environment variables:

**For Frontend Build:**
- `VITE_API_URL` = `https://your-vercel-app.vercel.app/api`

**⚠️ Important:** Replace `your-vercel-app` with your actual app name that Vercel assigns.

**Example:** If Vercel gives you `aptitude-test-application-suther2005.vercel.app`, then:
- `VITE_API_URL` = `https://aptitude-test-application-suther2005.vercel.app/api`

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Your app will be live at: `https://your-app-name.vercel.app`

## 🔧 Post-Deployment Configuration

### Update API URL
After deployment, update the frontend environment:
1. Go to Vercel Project Settings
2. Navigate to Environment Variables
3. Update `VITE_API_URL` with your actual Vercel app URL
4. Redeploy the project

### Example URLs
- **Frontend:** `https://aptitude-test-app-suther2005.vercel.app`
- **Backend API:** `https://aptitude-test-app-suther2005.vercel.app/api`

## 📋 Features Deployed

✅ **Live Question Generation** - Fetches questions from external APIs
✅ **Indian Rupee Support** - All financial questions use ₹
✅ **Question Randomization** - Different questions every test
✅ **Multiple Difficulty Levels** - Easy (25Q), Hard (50Q), Advanced (75Q)
✅ **Professional Scoring System** - Accurate score calculation
✅ **Enhanced Results Page** - Shows score, percentage, grade, time
✅ **Responsive Design** - Works on mobile and desktop
✅ **Serverless Functions** - Backend runs on Vercel functions

## 🚨 Important Notes

1. **No Database Required** - Uses in-memory storage with session management
2. **API Rate Limiting** - Handles external API limits gracefully
3. **Professional Questions** - Generates backup questions when APIs are unavailable
4. **Real-time Updates** - Questions are fetched live each time

## 🛠️ Local Development

To run locally:
```bash
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## 📞 Support

If you encounter any issues during deployment:
1. Check Vercel build logs
2. Verify environment variables
3. Ensure GitHub repository is public or Vercel has access

**Your application is ready for deployment! 🎉**
