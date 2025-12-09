# Contributing to Blog Platform

Thank you for considering contributing to this project!

## 🚀 Getting Started

### Prerequisites
- Docker Desktop installed
- Git installed
- Basic knowledge of React, Node.js, and MySQL

### Setup for Development

1. **Clone the repository**
```powershell
git clone <repo-url>
cd blog-site
```

2. **Run with local build** (for development)
```powershell
docker-compose up --build
```

3. **Access the application**
- Frontend: http://localhost
- Backend API: http://localhost:5000
- MySQL: localhost:3306

---

## 📝 Development Workflow

### Making Changes

#### Frontend Changes
1. Edit files in `frontend/src/`
2. Rebuild frontend:
```powershell
docker-compose restart frontend
```

#### Backend Changes
1. Edit files in `backend/`
2. Restart backend:
```powershell
docker-compose restart backend
```

#### Database Changes
1. Edit `database/init.sql`
2. Remove and recreate database:
```powershell
docker-compose down -v
docker-compose up --build
```

---

## 🧪 Testing Your Changes

### Test Locally
```powershell
# Stop existing containers
docker-compose down

# Rebuild and start
docker-compose up --build

# Access http://localhost and test
```

### Test with Docker Hub Images
After pushing to Docker Hub:
```powershell
docker-compose -f docker-compose.hub.yml up
```

---

## 📦 Building and Pushing Images

### Build Images
```powershell
docker-compose build
```

### Tag for Docker Hub
```powershell
docker tag blog-site-backend:latest harcastic/blog-site:backend
docker tag blog-site-frontend:latest harcastic/blog-site:frontend
```

### Push to Docker Hub
```powershell
docker push harcastic/blog-site:backend
docker push harcastic/blog-site:frontend
```

---

## 🎯 Code Style Guidelines

### JavaScript/React
- Use functional components with hooks
- Use arrow functions
- Use `const` and `let`, avoid `var`
- Add PropTypes or TypeScript for type checking
- Keep components small and focused

### File Structure
- Components go in `components/`
- Pages go in `pages/`
- API calls go in `services/`
- Models go in `models/`
- Controllers go in `controllers/`

### Naming Conventions
- Components: PascalCase (`PostCard.js`)
- Functions: camelCase (`getUserPosts`)
- Constants: UPPER_SNAKE_CASE (`JWT_SECRET`)
- Files: Match component name or camelCase

---

## 🐛 Reporting Issues

### Before Reporting
1. Check existing issues
2. Try with Docker Hub images: `docker-compose -f docker-compose.hub.yml up`
3. Try rebuilding: `docker-compose up --build`
4. Check logs: `docker-compose logs backend` or `docker-compose logs frontend`

### Issue Template
```
**Description:**
Brief description of the issue

**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS: Windows/Mac/Linux
- Docker version: 
- Browser (if frontend issue):

**Logs:**
Paste relevant logs here
```

---

## 🎁 Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**
```powershell
git checkout -b feature/amazing-feature
```

3. **Make your changes**
4. **Test thoroughly**
```powershell
docker-compose down
docker-compose up --build
```

5. **Commit with clear message**
```powershell
git commit -m "Add amazing feature: description"
```

6. **Push to your fork**
```powershell
git push origin feature/amazing-feature
```

7. **Open a Pull Request**
- Describe what you changed
- Reference any related issues
- Include screenshots if UI changes

### PR Guidelines
- One feature per PR
- Update documentation if needed
- Test with both docker-compose files
- Follow existing code style
- Add comments for complex logic

---

## 📚 Project Architecture

### Backend (Node.js/Express)
```
backend/
├── config/       # Database connection
├── controllers/  # Business logic
├── middleware/   # Auth, validation, errors
├── models/       # Database queries
├── routes/       # API endpoints
└── server.js     # Entry point
```

### Frontend (React)
```
frontend/
├── public/       # Static files
└── src/
    ├── components/  # Reusable components
    ├── context/     # Global state
    ├── pages/       # Route pages
    └── services/    # API calls
```

### Database (MySQL)
- `users` - User accounts
- `posts` - Blog posts
- `comments` - Post comments
- `likes` - Post likes
- `categories` - Post categories

---

## 🔐 Security

### Reporting Security Issues
**DO NOT** open public issues for security vulnerabilities.
Email: [your-email@example.com]

### Security Best Practices
- Never commit `.env` files
- Use strong JWT secrets in production
- Validate all user inputs
- Sanitize database queries
- Use HTTPS in production

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

## 🙏 Thank You!

Every contribution helps make this project better!

**Questions?** Open an issue or discussion.
