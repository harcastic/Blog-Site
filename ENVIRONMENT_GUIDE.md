# Environment Configuration Guide

Complete guide for configuring environment variables for different deployment scenarios.

---

## 📝 Environment Files

### Backend Environment (.env)
Location: `backend/.env`

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=blog_platform

# Security
JWT_SECRET=your_jwt_secret_key_change_in_production
```

---

## 🔧 Configuration Options

### PORT
- **Default**: `5000`
- **Description**: Port where backend server runs
- **Usage**: Change if port 5000 is occupied
```env
PORT=5000
```

---

### NODE_ENV
- **Options**: `development`, `production`, `test`
- **Default**: `development`
- **Description**: Application environment
- **Impact**: 
  - `development`: Detailed error messages, verbose logging
  - `production`: Minimal logging, optimized for performance
```env
NODE_ENV=production
```

---

### DB_HOST
- **Default**: `mysql` (Docker service name)
- **Description**: MySQL server hostname
- **Docker**: Use `mysql` (service name)
- **Local**: Use `localhost` or `127.0.0.1`
```env
# Docker
DB_HOST=mysql

# Local development
DB_HOST=localhost
```

---

### DB_USER
- **Default**: `root`
- **Description**: MySQL username
- **Production**: Create dedicated user with limited privileges
```env
DB_USER=root

# Production (recommended)
DB_USER=blog_user
```

---

### DB_PASSWORD
- **Default**: `rootpassword`
- **Description**: MySQL password
- **⚠️ CRITICAL**: Change in production!
```env
# Development (current)
DB_PASSWORD=rootpassword

# Production (recommended)
DB_PASSWORD=strong_random_password_here
```

---

### DB_NAME
- **Default**: `blog_platform`
- **Description**: MySQL database name
```env
DB_NAME=blog_platform
```

---

### JWT_SECRET
- **Default**: `your_jwt_secret_key_change_in_production`
- **Description**: Secret key for JWT token generation
- **⚠️ CRITICAL**: Must change in production!
- **Requirements**: 
  - At least 32 characters
  - Random and unpredictable
  - Keep secret and secure

```env
# Development (current - NOT SECURE)
JWT_SECRET=your_jwt_secret_key_change_in_production

# Production (recommended - generate random string)
JWT_SECRET=a8f5j2k9m3n7b4v6c8x1z5q2w7e4r9t6y3u8i1o5p2
```

**Generate secure secret:**
```powershell
# PowerShell (Windows)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Or use online generator:
# https://generate-secret.now.sh/32
```

---

## 🌍 Environment Scenarios

### 1. Development (Docker) - Current Setup
```env
PORT=5000
NODE_ENV=development
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=blog_platform
JWT_SECRET=your_jwt_secret_key_change_in_production
```

**Use when**: Running with `docker-compose up`

---

### 2. Development (Local)
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_local_mysql_password
DB_NAME=blog_platform
JWT_SECRET=dev_secret_key_not_for_production
```

**Requirements**:
- MySQL installed locally
- Database created: `CREATE DATABASE blog_platform;`
- Run init.sql script

**Start backend**:
```powershell
cd backend
npm install
npm start
```

---

### 3. Production (Recommended)
```env
PORT=5000
NODE_ENV=production
DB_HOST=your-production-db-host.com
DB_USER=blog_prod_user
DB_PASSWORD=very_strong_random_password_32_chars_min
DB_NAME=blog_platform_prod
JWT_SECRET=super_secure_random_jwt_secret_min_32_chars
```

**Best Practices**:
- Use environment secrets management (AWS Secrets Manager, Azure Key Vault)
- Never commit production .env to Git
- Use different database for production
- Enable SSL/TLS for database connection
- Regular secret rotation

---

### 4. Testing
```env
PORT=5001
NODE_ENV=test
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=test_password
DB_NAME=blog_platform_test
JWT_SECRET=test_secret_key
```

**Use when**: Running automated tests

---

## 🔒 Security Best Practices

### 1. Never Commit .env to Git
The `.gitignore` already excludes `.env`:
```gitignore
.env
.env.local
.env.production
```

### 2. Use Strong Passwords
- Minimum 16 characters
- Mix of letters, numbers, symbols
- No dictionary words

### 3. Rotate Secrets Regularly
- Change JWT_SECRET every 3-6 months
- Change DB_PASSWORD every 3-6 months
- Invalidates old tokens (users need to re-login)

### 4. Use Environment-Specific Files
```
.env.development
.env.production
.env.test
```

### 5. Limit Database User Privileges
```sql
-- Production: Create dedicated user
CREATE USER 'blog_user'@'%' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON blog_platform.* TO 'blog_user'@'%';
FLUSH PRIVILEGES;
```

---

## 🐳 Docker Environment Variables

### In docker-compose.yml
```yaml
backend:
  environment:
    PORT: 5000
    DB_HOST: mysql
    DB_USER: root
    DB_PASSWORD: rootpassword
    DB_NAME: blog_platform
    JWT_SECRET: ${JWT_SECRET}
    NODE_ENV: production
```

### Using .env file with Docker
Create `.env` in project root:
```env
JWT_SECRET=your_secret_here
DB_PASSWORD=your_password_here
```

Docker Compose automatically loads it!

---

## 🔄 Changing Configuration

### 1. Local Development
1. Edit `backend/.env`
2. Restart backend server
```powershell
# If running locally
npm start

# If using Docker
docker-compose restart backend
```

### 2. Docker Environment
1. Edit `backend/.env`
2. Rebuild and restart:
```powershell
docker-compose down
docker-compose up --build
```

### 3. Production
1. Update environment variables in your hosting platform
2. Restart application
3. Verify changes took effect

---

## ✅ Environment Checklist

### Before Development
- [x] `.env` exists in `backend/` directory
- [x] All variables are set
- [x] DB_HOST matches your setup (mysql for Docker, localhost for local)

### Before Production Deployment
- [ ] Change JWT_SECRET to strong random value
- [ ] Change DB_PASSWORD to strong random value
- [ ] Set NODE_ENV=production
- [ ] Use dedicated database user (not root)
- [ ] Verify DB_HOST points to production database
- [ ] Never commit .env to repository
- [ ] Use secrets manager for sensitive values
- [ ] Enable database SSL/TLS
- [ ] Set up secret rotation schedule

---

## 🧪 Testing Configuration

### Test if environment is loaded correctly:

1. Add to `backend/server.js`:
```javascript
console.log('Environment loaded:');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
// DON'T log passwords or secrets!
```

2. Check backend logs:
```powershell
docker-compose logs backend
```

---

## 🆘 Common Issues

### "Cannot find module 'dotenv'"
```powershell
cd backend
npm install dotenv
```

### Environment variables not loading
1. Check `.env` file exists in `backend/` directory
2. Check `server.js` has: `require('dotenv').config();`
3. Restart the application

### Database connection fails
1. Verify DB_HOST is correct
2. Verify DB_PASSWORD is correct
3. Check if MySQL is running
4. Check logs: `docker-compose logs mysql`

### JWT token issues after changing JWT_SECRET
- All existing tokens become invalid
- Users need to login again
- This is expected behavior

---

## 📚 Additional Resources

### Frontend Environment
Frontend uses `REACT_APP_API_URL` (in `package.json` proxy):
```json
"proxy": "http://backend:5000"
```

For production, set in `frontend/.env`:
```env
REACT_APP_API_URL=https://api.yourdomain.com
```

---

## 🎯 Quick Reference

| Variable | Development | Production | Critical |
|----------|-------------|------------|----------|
| PORT | 5000 | 5000 | ❌ |
| NODE_ENV | development | production | ⚠️ |
| DB_HOST | mysql | prod-db-host | ✅ |
| DB_USER | root | dedicated_user | ✅ |
| DB_PASSWORD | rootpassword | strong_password | 🔥 |
| DB_NAME | blog_platform | blog_platform | ⚠️ |
| JWT_SECRET | default | random_32_chars | 🔥 |

🔥 = Must change for production
✅ = Important to configure
⚠️ = Should change
❌ = Can keep same

---

**Remember**: Security starts with proper configuration! 🔒
