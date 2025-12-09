# Deployment Options

This project can be run in two ways:

---

## Option 1: Pull from Docker Hub (Recommended for Users)

**Fastest way - no build required!**

Uses pre-built images from Docker Hub.

### Steps:
```powershell
# Use the Docker Hub configuration
docker-compose -f docker-compose.hub.yml up
```

**What happens:**
- ✅ Pulls pre-built images from `harcastic/blog-site`
- ✅ No build time (starts immediately)
- ✅ Same experience for everyone
- ✅ Perfect for testing/deployment

**Requirements:**
- Docker installed
- Internet connection (to pull images)
- `database/init.sql` file present

---

## Option 2: Build Locally (For Development)

**Best for developers who want to modify code.**

Builds images from source code.

### Steps:
```powershell
# Use the default configuration
docker-compose up --build
```

**What happens:**
- ⚙️ Builds images from Dockerfiles
- ⚙️ Takes 2-5 minutes first time
- ⚙️ Rebuilds when code changes
- ⚙️ Perfect for active development

**Requirements:**
- Docker installed
- All source files present
- Internet connection (to download dependencies)

---

## Quick Comparison

| Feature | Docker Hub (hub.yml) | Local Build (default) |
|---------|---------------------|----------------------|
| Speed | ⚡ Instant | 🐢 2-5 minutes |
| Internet | Pull only | Pull + Build |
| Disk Space | Minimal | More (build cache) |
| Code Changes | ❌ Need rebuild | ✅ Auto rebuild |
| Use Case | Production/Testing | Development |

---

## For End Users (Non-Developers)

**Just want to run the app? Use Docker Hub!**

```powershell
# Clone the repo
git clone <repo-url>
cd blog-site

# Run with Docker Hub images
docker-compose -f docker-compose.hub.yml up

# Open http://localhost
```

That's it! No build, no wait, just run.

---

## For Developers

**Want to modify code? Build locally!**

```powershell
# Clone the repo
git clone <repo-url>
cd blog-site

# Run with local build
docker-compose up --build

# Edit code, restart to see changes
docker-compose restart backend
# or
docker-compose restart frontend
```

---

## Pushing Updates to Docker Hub

After making changes:

```powershell
# Rebuild images
docker-compose build

# Tag for Docker Hub
docker tag blog-site-backend:latest harcastic/blog-site:backend
docker tag blog-site-frontend:latest harcastic/blog-site:frontend

# Push to Docker Hub
docker push harcastic/blog-site:backend
docker push harcastic/blog-site:frontend
```

---

## Current Images

- **Backend**: `harcastic/blog-site:backend`
- **Frontend**: `harcastic/blog-site:frontend`
- **MySQL**: `mysql:8.0` (official image)

View on Docker Hub: https://hub.docker.com/r/harcastic/blog-site

---

## Testing Both Methods

### Test with Docker Hub:
```powershell
docker-compose -f docker-compose.hub.yml up
```

### Test with Local Build:
```powershell
docker-compose up --build
```

Both should produce identical results!

---

## Important Notes

### Database Initialization
The `database/init.sql` file is **required** for both methods. It's mounted as a volume, so it must exist locally.

### Environment Variables
Backend environment variables are set in the docker-compose files. Modify as needed for your environment.

### Ports
- Frontend: http://localhost (port 80)
- Backend: http://localhost:5000
- MySQL: localhost:3306

Make sure these ports are available!

---

## Troubleshooting

### "Image not found" error
- Ensure you're using correct file: `docker-compose.hub.yml`
- Check Docker Hub: https://hub.docker.com/r/harcastic/blog-site

### Build fails
- Switch to Docker Hub version: `docker-compose -f docker-compose.hub.yml up`
- Check internet connection
- Ensure all files are present

### Both methods fail
- Check Docker is running
- Check ports are available
- See main TROUBLESHOOTING.md

---

**Recommended**: Use `docker-compose.hub.yml` for production/testing, use default for development.
