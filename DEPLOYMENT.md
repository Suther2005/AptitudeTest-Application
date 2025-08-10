# Deploying AptitudeTest Application to Vercel

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a MongoDB Atlas cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
3. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Prepare MongoDB Atlas

1. Create a MongoDB Atlas cluster
2. Create a database user with read/write permissions
3. Get your connection string (it should look like: `mongodb+srv://username:password@cluster.mongodb.net/quizDB`)
4. Add your connection string to Vercel environment variables

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect the configuration from `vercel.json`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
6. Click "Deploy"

#### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Set environment variables
vercel env add MONGODB_URI
# Paste your MongoDB connection string when prompted
```

### 3. Environment Variables Required

Set these in your Vercel project settings:

- `MONGODB_URI`: Your MongoDB Atlas connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/quizDB`

### 4. Project Structure

```
├── api/
│   └── index.js          # Vercel serverless function entry point
├── backend/
│   ├── server.js         # Express server
│   ├── models/           # MongoDB models
│   └── ...
├── frontend/
│   ├── src/              # React source code
│   ├── dist/             # Built files (generated)
│   └── package.json
├── vercel.json           # Vercel configuration
└── .env.example          # Environment variables template
```

### 5. How It Works

- **Frontend**: Built as a static site and served from `/`
- **Backend**: Runs as serverless functions under `/api`
- **Database**: MongoDB Atlas (cloud-hosted)
- **API Calls**: Frontend makes requests to `/api/*` which routes to your Express server

### 6. Local Development

```bash
# Backend
cd backend
npm install
npm start

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

### 7. Troubleshooting

- **MongoDB Connection Issues**: Ensure your IP is whitelisted in MongoDB Atlas
- **API Not Working**: Check that your API routes start with `/api/`
- **Build Failures**: Check that all dependencies are listed in `package.json`
- **Environment Variables**: Ensure `MONGODB_URI` is set in Vercel dashboard

### 8. Post-Deployment

1. Test all functionality on the deployed site
2. Check that API endpoints work correctly
3. Verify database connections
4. Test the quiz functionality end-to-end

## Support

If you encounter issues, check:
- Vercel deployment logs
- Browser developer console for frontend errors
- Vercel function logs for backend errors
