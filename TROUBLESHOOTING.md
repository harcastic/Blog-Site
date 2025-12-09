# 🔧 Troubleshooting Guide

Common issues and their solutions for the Blog Platform.

---

## 🚨 Docker Issues

### Issue: Port Already in Use
**Error:** `Bind for 0.0.0.0:80 failed: port is already allocated`

**Solution:**
```powershell
# Find process using the port
netstat -ano | findstr :80
netstat -ano | findstr :5000
netstat -ano | findstr :3306

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change ports in docker-compose.yml
# Change "80:80" to "8080:80" for frontend
# Change "5000:5000" to "5001:5000" for backend
```

---

### Issue: Cannot Start Containers
**Error:** `docker-compose up` fails

**Solution:**
```powershell
# Stop all containers
docker-compose down

# Remove all containers and volumes
docker-compose down -v

# Rebuild and start fresh
docker-compose up --build
```

---

### Issue: MySQL Container Not Starting
**Error:** MySQL health check fails

**Solution:**
```powershell
# Check MySQL logs
docker-compose logs mysql

# Common causes:
# 1. Port 3306 already in use
# 2. Corrupted volume

# Fix: Remove volumes and restart
docker-compose down -v
docker-compose up --build
```

---

### Issue: Backend Can't Connect to MySQL
**Error:** `ECONNREFUSED` or `Can't connect to MySQL server`

**Solution:**
1. Wait longer - MySQL needs 10-30 seconds to initialize
2. Check if MySQL is healthy:
```powershell
docker-compose ps
# mysql should show "healthy"
```

3. Restart backend:
```powershell
docker-compose restart backend
```

---

## 🌐 Frontend Issues

### Issue: White Screen / Blank Page
**Causes & Solutions:**

1. **React build failed**
```powershell
docker-compose logs frontend
# Check for build errors
```

2. **API connection issue**
- Open browser DevTools (F12)
- Check Console for errors
- Check Network tab for failed requests

3. **Fix:**
```powershell
docker-compose down
docker-compose up --build
```

---

### Issue: API Calls Return 404
**Error:** `GET http://localhost/api/posts 404 Not Found`

**Solution:**

1. Check if backend is running:
```powershell
docker-compose ps
# backend should be "Up"
```

2. Test backend directly:
```powershell
curl http://localhost:5000/api/posts
```

3. Check nginx.conf proxy settings in `frontend/nginx.conf`

---

### Issue: Login/Register Not Working
**Causes:**

1. **Backend not running**
```powershell
docker-compose logs backend
```

2. **Database not initialized**
```powershell
docker-compose exec mysql mysql -u root -prootpassword -e "USE blog_platform; SHOW TABLES;"
# Should show 5 tables
```

3. **CORS issue** - Check browser console

**Solution:**
```powershell
docker-compose restart backend
```

---

## 🗄️ Database Issues

### Issue: Tables Not Created
**Error:** `Table 'blog_platform.users' doesn't exist`

**Solution:**
```powershell
# MySQL init script didn't run
# Remove volumes and restart
docker-compose down -v
docker-compose up --build
```

---

### Issue: Can't Login After Registration
**Possible Causes:**

1. **Token not saved** - Check browser localStorage
   - Open DevTools → Application → Local Storage
   - Should see `token` and `user` entries

2. **JWT secret mismatch** - Check `.env` file

3. **Database connection issue** - Check backend logs

**Solution:**
```powershell
# Clear browser data and try again
# Or restart backend
docker-compose restart backend
```

---

### Issue: Lost All Data After Restart
**Cause:** Volumes were removed

**Solution:**
```powershell
# To keep data, use:
docker-compose down
# NOT: docker-compose down -v

# To backup database:
docker-compose exec mysql mysqldump -u root -prootpassword blog_platform > backup.sql

# To restore:
docker-compose exec -T mysql mysql -u root -prootpassword blog_platform < backup.sql
```

---

## 🔐 Authentication Issues

### Issue: "Invalid or expired token"
**Causes:**

1. Token expired (7-day expiry)
2. JWT_SECRET changed
3. Token corrupted

**Solution:**
```javascript
// Clear localStorage in browser console:
localStorage.clear();
// Then login again
```

---

### Issue: Can't Access Protected Routes
**Error:** Redirects to login page

**Solution:**

1. Check if logged in:
```javascript
// In browser console:
console.log(localStorage.getItem('token'));
// Should show a token
```

2. Token invalid - login again

3. Check AuthContext in DevTools → Components

---

## 🐛 Development Issues

### Issue: Changes Not Reflecting
**Solution:**

1. **Docker:** Rebuild containers
```powershell
docker-compose up --build
```

2. **Frontend (dev mode):** Hard refresh
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

3. **Backend:** Check if nodemon is running (dev mode only)

---

### Issue: npm install Fails
**Error:** Package installation errors

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

---

## 🔍 Debugging Tips

### Check All Services Status
```powershell
docker-compose ps
# All should be "Up" and mysql should be "healthy"
```

---

### View Live Logs
```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

---

### Test Backend API
```powershell
# Health check
curl http://localhost:5000/health

# Get posts
curl http://localhost:5000/api/posts

# Get categories
curl http://localhost:5000/api/categories
```

---

### Access MySQL Directly
```powershell
docker-compose exec mysql mysql -u root -prootpassword blog_platform

# Then run SQL:
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM posts;
```

---

### Restart Specific Service
```powershell
docker-compose restart backend
docker-compose restart frontend
docker-compose restart mysql
```

---

### Rebuild Specific Service
```powershell
docker-compose up -d --build backend
docker-compose up -d --build frontend
```

---

## 📊 Health Checks

### 1. Backend Health
```powershell
curl http://localhost:5000/health
# Should return: {"status":"OK","message":"Server is running"}
```

### 2. Frontend Accessibility
Open: http://localhost
Should show homepage

### 3. Database Connection
```powershell
docker-compose exec backend npm test
# Or check backend logs for "Server is running"
```

### 4. API Endpoints
```powershell
# Should return JSON with empty array or posts
curl http://localhost:5000/api/posts
```

---

## 🧹 Clean Slate (Nuclear Option)

If nothing works, start fresh:

```powershell
# Stop everything
docker-compose down -v

# Remove all Docker data (CAUTION: affects all Docker projects)
docker system prune -a --volumes

# Rebuild from scratch
cd blog-site
docker-compose up --build
```

---

## 🆘 Still Having Issues?

### Checklist:
- [ ] Docker Desktop running?
- [ ] Internet connection active?
- [ ] Enough disk space?
- [ ] Ports 80, 5000, 3306 available?
- [ ] .env file exists in backend?
- [ ] All files created correctly?

### Get More Info:
```powershell
# Docker version
docker --version
docker-compose --version

# System resources
docker system df

# Container details
docker-compose ps
docker stats
```

### Log Files to Check:
1. `docker-compose logs mysql` - Database issues
2. `docker-compose logs backend` - API issues
3. `docker-compose logs frontend` - Build/Nginx issues
4. Browser DevTools Console - Frontend errors
5. Browser DevTools Network - API call failures

---

## 📞 Common Error Messages

### "ECONNREFUSED"
- Backend can't connect to MySQL
- Wait longer or restart backend

### "404 Not Found"
- API endpoint doesn't exist
- Check route definitions
- Verify backend is running

### "401 Unauthorized"
- Token missing or invalid
- Login again

### "403 Forbidden"
- Not authorized for this action
- Can only edit/delete your own posts

### "500 Internal Server Error"
- Check backend logs
- Database connection issue
- Check .env file

---

## ✅ Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| Can't start | `docker-compose down -v && docker-compose up --build` |
| Port in use | Change ports in docker-compose.yml |
| White screen | Check browser console, rebuild frontend |
| Can't login | Clear localStorage, check backend logs |
| No data | Volumes removed, will need to re-seed |
| Slow performance | Check Docker resources in Docker Desktop |

---

**Still stuck? Check the logs first!**

```powershell
docker-compose logs -f
```

**This shows real-time logs from all services and reveals most issues!**
