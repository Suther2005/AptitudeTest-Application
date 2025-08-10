# 🚀 Deployment Guide

## GitHub Setup

1. **Create GitHub Repository**
   - Go to [https://github.com/new](https://github.com/new)
   - Repository name: `aptitude-test-app`
   - Description: `Professional Aptitude Test Application with live questions`
   - Make it **Public**
   - **Don't** initialize with README (we already have one)
   - Click "Create repository"

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/aptitude-test-app.git
   git push -u origin main
   ```

## Vercel Deployment

1. **Sign up/Login to Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" or "Import Project"
   - Select your GitHub repository `aptitude-test-app`
   - Vercel will automatically detect the configuration

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy both frontend and backend
   - You'll get a live URL like: `https://aptitude-test-app.vercel.app`

## Environment Variables (Optional)

No additional environment variables needed! The app is configured to work out of the box.

## Features Included

- ✅ **Live Question Generation**: Fetches from OpenTDB API
- ✅ **Professional Fallback**: Indian context questions with ₹ currency
- ✅ **Randomization**: Different questions every time
- ✅ **Real-time Scoring**: Instant results with grades
- ✅ **Responsive Design**: Works on all devices
- ✅ **Production Ready**: Optimized builds

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Ensure all files are pushed to GitHub
3. Verify the `vercel.json` configuration is correct

## Success! 🎉

Your aptitude test application will be live and accessible worldwide!

**Sample URLs:**
- Frontend: `https://your-app-name.vercel.app`
- API: `https://your-app-name.vercel.app/api/health`
