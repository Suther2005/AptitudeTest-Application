# Render Deployment Configuration

## Build Settings for Render:

**Build Command:**
```bash
cd frontend && npm install && npm run build
```

**Start Command:**
```bash
cd backend && npm start
```

**Environment:**
- Node.js version: 18.x (automatic)
- Build directory: frontend/dist
- Server: backend/server.js

## Static Site Settings:

**Publish Directory:** `frontend/dist`
**Build Command:** `cd frontend && npm install && npm run build`

## Web Service Settings:

**Environment:** Node
**Build Command:** `cd frontend && npm install && npm run build && cd ../backend && npm install`
**Start Command:** `cd backend && npm start`
**Auto-Deploy:** Yes
