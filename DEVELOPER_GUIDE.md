# Developer Guide - Blog Platform

Welcome! This guide will help you get started with the Blog Platform quickly.

---

## 🎯 Quick Start (Choose Your Path)

### Path 1: I Just Want to Run It (Recommended)

**Use pre-built Docker images - starts in 30 seconds!**

```powershell
# 1. Clone and navigate
git clone <repo-url>
cd blog-site

# 2. Run verification (optional)
.\verify-setup.ps1

# 3. Start with Docker Hub
docker-compose -f docker-compose.hub.yml up

# 4. Open http://localhost
```

✅ **Best for**: Testing, demos, production deployment

---

### Path 2: I Want to Develop/Modify Code

**Build from source - takes 2-5 minutes first time.**

```powershell
# 1. Clone and navigate
git clone <repo-url>
cd blog-site

# 2. Build and start
docker-compose up --build

# 3. Open http://localhost
```

✅ **Best for**: Development, customization, learning

---

## 📋 Prerequisites Checklist

Before you start, ensure you have:

- [ ] **Docker Desktop** installed and running
- [ ] **Git** installed
- [ ] Ports **80**, **3306**, **5000** available
- [ ] Internet connection (for pulling dependencies)
- [ ] At least 2GB free disk space

### Verify Your Setup

**Windows:**
```powershell
.\verify-setup.ps1
```

**Linux/Mac:**
```bash
chmod +x verify-setup.sh
./verify-setup.sh
```

This script checks:
- Docker installation
- Docker Compose availability
- Required files existence
- Port availability
- Docker service status

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Browser                          │
│                http://localhost                     │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────┐
│              Frontend Container                     │
│              (React + Nginx)                        │
│              Port: 80                               │
└────────────────────┬────────────────────────────────┘
                     │ Reverse Proxy
                     ↓
┌─────────────────────────────────────────────────────┐
│              Backend Container                      │
│              (Node.js + Express)                    │
│              Port: 5000                             │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────┐
│              MySQL Container                        │
│              (Database)                             │
│              Port: 3306                             │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Key Files to Know

### Configuration Files
- `docker-compose.yml` - Local build configuration
- `docker-compose.hub.yml` - Docker Hub deployment
- `.env.example` - Environment variables template
- `verify-setup.ps1/.sh` - Setup verification script

### Backend Files
- `backend/server.js` - Express app entry point
- `backend/config/database.js` - MySQL connection
- `backend/routes/` - API route definitions
- `backend/controllers/` - Business logic
- `backend/models/` - Database queries
- `backend/middleware/` - Auth, validation, errors

### Frontend Files
- `frontend/src/App.js` - React app entry point
- `frontend/src/pages/` - Page components
- `frontend/src/components/` - Reusable components
- `frontend/src/services/api.js` - API client
- `frontend/src/context/AuthContext.js` - Auth state

### Database Files
- `database/init.sql` - Schema and seed data

---

## 🚀 Common Development Tasks

### Starting the Application

**With Docker Hub (fast):**
```powershell
docker-compose -f docker-compose.hub.yml up
```

**With local build:**
```powershell
docker-compose up --build
```

**In detached mode (background):**
```powershell
docker-compose up -d
```

---

### Viewing Logs

**All services:**
```powershell
docker-compose logs -f
```

**Specific service:**
```powershell
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

**Last 100 lines:**
```powershell
docker-compose logs --tail=100 backend
```

---

### Restarting Services

**Restart all:**
```powershell
docker-compose restart
```

**Restart specific service:**
```powershell
docker-compose restart backend
docker-compose restart frontend
```

**Rebuild and restart:**
```powershell
docker-compose up --build -d
```

---

### Making Code Changes

#### Frontend Changes

1. Edit files in `frontend/src/`
2. Rebuild frontend:
```powershell
docker-compose restart frontend
```
3. Refresh browser

#### Backend Changes

1. Edit files in `backend/`
2. Restart backend:
```powershell
docker-compose restart backend
```
3. Test API endpoints

#### Database Schema Changes

1. Edit `database/init.sql`
2. Reset database:
```powershell
docker-compose down -v
docker-compose up --build
```

---

### Stopping the Application

**Stop services (keeps data):**
```powershell
docker-compose down
```

**Stop and remove volumes (clean slate):**
```powershell
docker-compose down -v
```

**Force stop all:**
```powershell
docker-compose down --remove-orphans
```

---

## 🧪 Testing the Application

### Manual Testing Flow

1. **Register a User**
   - Go to http://localhost
   - Click "Register"
   - Enter: username, email, password
   - Should redirect to home page

2. **Login**
   - Click "Login"
   - Enter credentials
   - Should see your username in navbar

3. **Create a Post**
   - Click "Create Post"
   - Enter title and content
   - Select category
   - Click "Create Post"
   - Should redirect to Dashboard

4. **View Posts**
   - Go to home page
   - See all posts
   - Click on a post to view details

5. **Like a Post**
   - Click heart icon
   - Count should increase
   - Click again to unlike

6. **Comment on a Post**
   - View post details
   - Enter comment
   - Submit
   - Should appear in comment list

7. **Edit Post**
   - Go to Dashboard
   - Click "Edit" on your post
   - Modify and save
   - Changes should reflect

8. **Delete Post**
   - Go to Dashboard
   - Click "Delete" on your post
   - Confirm deletion
   - Post should be removed

---

## 🔍 Debugging

### Check Container Status
```powershell
docker-compose ps
```

### Enter Container Shell
```powershell
# Backend container
docker-compose exec backend sh

# Frontend container
docker-compose exec frontend sh

# MySQL container
docker-compose exec mysql bash
```

### Check MySQL Database
```powershell
# Connect to MySQL
docker-compose exec mysql mysql -ublog_user -pblog_password blog_db

# Run SQL queries
mysql> SHOW TABLES;
mysql> SELECT * FROM users;
mysql> SELECT * FROM posts;
```

### View Environment Variables
```powershell
docker-compose exec backend env
```

---

## 🐛 Common Issues and Solutions

### Issue: Port 80 Already in Use

**Solution:**
```powershell
# Find process using port 80
netstat -ano | findstr :80

# Kill process (replace <PID>)
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
ports:
  - "8080:80"  # Use port 8080 instead
```

---

### Issue: Cannot Connect to MySQL

**Solution:**
```powershell
# Check MySQL is running
docker-compose ps

# View MySQL logs
docker-compose logs mysql

# Reset database
docker-compose down -v
docker-compose up
```

---

### Issue: Frontend Shows 404

**Solution:**
```powershell
# Rebuild frontend
docker-compose build --no-cache frontend
docker-compose up frontend

# Check Nginx config
docker-compose exec frontend cat /etc/nginx/nginx.conf
```

---

### Issue: Backend API Not Responding

**Solution:**
```powershell
# Check backend logs
docker-compose logs backend

# Restart backend
docker-compose restart backend

# Test health endpoint
curl http://localhost:5000/health
```

---

## 📊 Environment Variables

### Backend Environment Variables

Set in `docker-compose.yml` or create `.env` file:

```env
# Server
PORT=5000
NODE_ENV=production

# Database
DB_HOST=mysql
DB_USER=blog_user
DB_PASSWORD=blog_password
DB_NAME=blog_db
DB_PORT=3306

# Authentication
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost
```

**Security Note**: Change `JWT_SECRET` in production!

---

## 🚀 Deployment

### Push to Docker Hub

After making changes:

```powershell
# 1. Build images
docker-compose build

# 2. Tag images
docker tag blog-site-backend:latest harcastic/blog-site:backend
docker tag blog-site-frontend:latest harcastic/blog-site:frontend

# 3. Login to Docker Hub
docker login

# 4. Push images
docker push harcastic/blog-site:backend
docker push harcastic/blog-site:frontend
```

### Update docker-compose.hub.yml

Ensure it references your Docker Hub repository:

```yaml
backend:
  image: harcastic/blog-site:backend
  
frontend:
  image: harcastic/blog-site:frontend
```

---

## 📚 Additional Resources

### Documentation Files
- **[README.md](README.md)** - Project overview
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API endpoints
- **[DEPLOYMENT_OPTIONS.md](DEPLOYMENT_OPTIONS.md)** - Deployment methods
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

### Useful Commands

| Task | Command |
|------|---------|
| Start (Hub) | `docker-compose -f docker-compose.hub.yml up` |
| Start (Local) | `docker-compose up --build` |
| Stop | `docker-compose down` |
| Reset | `docker-compose down -v` |
| Logs | `docker-compose logs -f` |
| Restart | `docker-compose restart` |
| Status | `docker-compose ps` |
| Shell | `docker-compose exec backend sh` |

---

## 🎓 Learning Path

### For Beginners

1. **Start Simple**: Use Docker Hub option first
2. **Explore UI**: Register, create posts, comment
3. **Check Logs**: See how services interact
4. **View Code**: Read through backend/frontend files
5. **Make Changes**: Edit a component, restart, test

### For Intermediate

1. **Understand Architecture**: Review all three containers
2. **Modify Features**: Add new API endpoint
3. **Test Changes**: Build locally and test
4. **Database**: Add new table/column
5. **Deploy**: Push to Docker Hub

### For Advanced

1. **Optimize**: Improve Docker image sizes
2. **Add Features**: Implement new functionality
3. **Testing**: Add unit/integration tests
4. **CI/CD**: Set up GitHub Actions
5. **Production**: Deploy to cloud (AWS/Azure/GCP)

---

## 💡 Tips and Best Practices

1. **Always verify setup first**: Run `verify-setup.ps1` before starting
2. **Use Docker Hub for speed**: Local builds take 2-5 minutes
3. **Check logs frequently**: `docker-compose logs -f` is your friend
4. **Reset when stuck**: `docker-compose down -v && docker-compose up`
5. **Document changes**: Update relevant .md files
6. **Test both methods**: Ensure both docker-compose files work
7. **Keep backups**: Export database before major changes

---

## 🤝 Getting Help

### Before Asking for Help

1. ✅ Run `verify-setup.ps1` - check all prerequisites
2. ✅ Check logs: `docker-compose logs`
3. ✅ Read [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
4. ✅ Try clean restart: `docker-compose down -v && docker-compose up`
5. ✅ Test with Docker Hub: `docker-compose -f docker-compose.hub.yml up`

### Getting Support

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions, share ideas
- **Documentation**: Check all .md files first

### When Reporting Issues

Include:
- Operating System
- Docker version: `docker --version`
- Command you ran
- Full error message
- Relevant logs: `docker-compose logs`

---

**Ready to start developing?** Choose your path above and get coding! 🚀

**Questions?** Check the documentation files or open an issue.

**Happy Coding!** 💻✨
