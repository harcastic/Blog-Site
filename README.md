# Full-Stack Blog Platform

A complete full-stack blogging platform with user authentication, post creation, comments, and likes functionality.

## ⚡ Quick Start (Recommended)

**Get started in 30 seconds!** Pull pre-built images from Docker Hub:

```powershell
# Clone the repository
git clone <your-repo-url>
cd blog-site

# Run with Docker Hub images (no build required!)
docker-compose -f docker-compose.hub.yml up

# Open http://localhost in your browser
```

**For local development** (builds from source):
```powershell
docker-compose up --build
```

> 💡 See [DEPLOYMENT_OPTIONS.md](DEPLOYMENT_OPTIONS.md) for detailed comparison

---

## 🚀 Tech Stack

### Frontend
- React 18 (functional components + hooks)
- React Router v6
- Axios for API calls
- CSS3 for styling
- JWT authentication

### Backend
- Node.js + Express
- MySQL 8.0
- JWT authentication
- Bcrypt password hashing
- Express-validator for input validation

### DevOps
- Docker & Docker Compose
- Nginx (reverse proxy)
- Multi-stage Docker builds

---

## 📁 Project Structure

```
blog-site/
├── backend/
│   ├── config/
│   │   └── database.js          # MySQL connection pool
│   ├── controllers/
│   │   ├── authController.js    # Auth logic (register/login)
│   │   ├── categoryController.js
│   │   ├── commentController.js
│   │   └── postController.js
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── errorHandler.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Comment.js
│   │   ├── Like.js
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── commentRoutes.js
│   │   └── postRoutes.js
│   ├── .dockerignore
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── CommentSection.js
│   │   │   ├── Navbar.js
│   │   │   ├── PostCard.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js   # Global auth state
│   │   ├── pages/
│   │   │   ├── CreatePost.js
│   │   │   ├── Dashboard.js
│   │   │   ├── EditPost.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── PostDetail.js
│   │   │   └── Register.js
│   │   ├── services/
│   │   │   └── api.js           # Axios API service
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── database/
│   └── init.sql                 # MySQL schema & seed data
├── .dockerignore
├── docker-compose.yml
└── README.md
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Posts Table
```sql
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category_id INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
```

### Comments Table
```sql
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Likes Table
```sql
CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_like (post_id, user_id)
);
```

### Categories Table
```sql
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Getting Started

### Prerequisites
- **Docker Desktop** installed ([Download here](https://www.docker.com/products/docker-desktop))
- **Git** installed
- Ports **80**, **3306**, and **5000** available

### Option 1: Quick Start with Docker Hub (Recommended)

**Fastest way to get started - no build required!**

```powershell
# 1. Clone the repository
git clone <your-repo-url>
cd blog-site

# 2. Verify your setup (optional but recommended)
.\verify-setup.ps1    # Windows
# or
./verify-setup.sh     # Linux/Mac

# 3. Run with pre-built images from Docker Hub
docker-compose -f docker-compose.hub.yml up

# 4. Open your browser
# Frontend: http://localhost
# Backend API: http://localhost:5000
```

**That's it!** The application will download pre-built images and start immediately.

### Option 2: Build from Source (For Developers)

**If you want to modify the code:**

```powershell
# 1. Clone the repository
git clone <your-repo-url>
cd blog-site

# 2. Build and start all services
docker-compose up --build

# 3. Open your browser
# Frontend: http://localhost
```

First build takes 2-5 minutes. Subsequent starts are faster.

### Stopping the Application

```powershell
# Stop services (keeps data)
docker-compose down

# Stop and remove all data (clean slate)
docker-compose down -v
```

### Quick Reference

| Command | Description |
|---------|-------------|
| `docker-compose -f docker-compose.hub.yml up` | Run with Docker Hub images |
| `docker-compose up --build` | Build and run locally |
| `docker-compose down` | Stop services |
| `docker-compose logs backend` | View backend logs |
| `docker-compose logs frontend` | View frontend logs |
| `docker-compose restart backend` | Restart backend only |

---

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Step-by-step getting started guide
- **[DEPLOYMENT_OPTIONS.md](DEPLOYMENT_OPTIONS.md)** - Docker Hub vs Local Build comparison
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete API reference
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute to the project
- **[ENVIRONMENT_GUIDE.md](ENVIRONMENT_GUIDE.md)** - Environment variables explained

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Posts
- `GET /api/posts` - Get all posts (public)
- `GET /api/posts/:id` - Get single post (public)
- `GET /api/posts/user/my-posts` - Get current user's posts (protected)
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `POST /api/posts/:id/like` - Like post (protected)
- `DELETE /api/posts/:id/unlike` - Unlike post (protected)

### Comments
- `GET /api/comments/post/:postId` - Get post comments
- `POST /api/comments/post/:postId` - Add comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (protected)

---

## 🎯 What's Included

### ✅ Complete Features
- User authentication with JWT (login/register)
- Create, edit, and delete blog posts
- Comment on posts
- Like/unlike posts
- Post categories
- User dashboard
- Protected routes
- Responsive design
- Docker multi-container setup
- Production-ready configuration

### 🏗️ Architecture
- **Frontend**: React SPA with React Router
- **Backend**: RESTful API with Express
- **Database**: MySQL with relational schema
- **Authentication**: JWT tokens with 7-day expiry
- **Security**: Bcrypt password hashing, input validation
- **Deployment**: Docker containers with Nginx reverse proxy

---

## 🧪 Testing the Application

### Register and Login
1. Navigate to http://localhost
2. Click "Register" and create an account
3. You'll be automatically logged in

### Create a Post
1. Click "Create Post" in the navbar
2. Enter a title and content
3. Select a category (optional)
4. Submit

### Interact with Posts
- ❤️ **Like** posts by clicking the heart icon
- 💬 **Comment** on posts
- ✏️ **Edit** your own posts from the Dashboard
- 🗑️ **Delete** your own posts

---

## 🛠️ Development Guide

### Project Structure
```
blog-site/
├── backend/          # Node.js/Express API
├── frontend/         # React application
├── database/         # MySQL schema
├── docker-compose.yml           # Local build config
└── docker-compose.hub.yml       # Docker Hub config
```

### Making Changes

**Backend changes:**
```powershell
# Edit files in backend/
docker-compose restart backend
```

**Frontend changes:**
```powershell
# Edit files in frontend/src/
docker-compose restart frontend
```

**Database changes:**
```powershell
# Edit database/init.sql
docker-compose down -v
docker-compose up --build
```

### Viewing Logs
```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

---

## 🐳 Docker Hub Images

This project is available on Docker Hub:

- **Backend**: `harcastic/blog-site:backend`
- **Frontend**: `harcastic/blog-site:frontend`

Pull directly:
```powershell
docker pull harcastic/blog-site:backend
docker pull harcastic/blog-site:frontend
```

---

## 🚨 Troubleshooting

### Port Already in Use
```powershell
# Find what's using port 80
netstat -ano | findstr :80

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Docker Not Starting
1. Ensure Docker Desktop is running
2. Check Docker service: `docker info`
3. Restart Docker Desktop

### Database Connection Issues
```powershell
# Reset database
docker-compose down -v
docker-compose up
```

### Build Errors
```powershell
# Clean rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

**For more solutions, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)**

---

## 📊 Environment Variables

Backend environment variables are configured in `docker-compose.yml`:

```yaml
DB_HOST=mysql
DB_USER=blog_user
DB_PASSWORD=blog_password
DB_NAME=blog_db
JWT_SECRET=your_secret_key
```

For local development, copy `.env.example` to `.env` and customize.

See **[ENVIRONMENT_GUIDE.md](ENVIRONMENT_GUIDE.md)** for details.

---

## 🤝 Contributing

Contributions are welcome! Please see **[CONTRIBUTING.md](CONTRIBUTING.md)** for guidelines.

### Quick Contribution Steps
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test with: `docker-compose up --build`
5. Commit: `git commit -m "Add amazing feature"`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🌟 Features Roadmap

### Completed ✅
- User authentication
- Post CRUD operations
- Comments system
- Like system
- Categories
- Docker deployment

### Future Enhancements 🚀
- [ ] User profiles with avatars
- [ ] Post search functionality
- [ ] Rich text editor
- [ ] Image uploads
- [ ] Email notifications
- [ ] Social sharing
- [ ] Post drafts
- [ ] Tags system

---

## 📞 Support

- **Issues**: Open an issue on GitHub
- **Questions**: Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Documentation**: Read the docs in this repository

---

## 🙏 Acknowledgments

Built with:
- React
- Node.js & Express
- MySQL
- Docker
- Nginx

---

**Ready to start?** Run `docker-compose -f docker-compose.hub.yml up` and visit http://localhost! 🚀
```

---

## 🛠️ Development Setup (Without Docker)

### Backend Setup

1. Navigate to backend directory:
```powershell
cd backend
```

2. Install dependencies:
```powershell
npm install
```

3. Configure environment (.env file is already created):
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blog_platform
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Create MySQL database and run init.sql:
```sql
mysql -u root -p < ../database/init.sql
```

5. Start backend server:
```powershell
npm start
```

Backend runs on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Start development server:
```powershell
npm start
```

Frontend runs on http://localhost:3000

---

## 🎯 Features

### Authentication & Authorization
- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected routes (middleware)
- ✅ Token-based authentication

### Post Management
- ✅ Create blog posts
- ✅ Edit your own posts
- ✅ Delete your own posts
- ✅ View all posts (public)
- ✅ View single post detail
- ✅ Categorize posts
- ✅ Rich post content

### Social Features
- ✅ Like/unlike posts
- ✅ Comment on posts
- ✅ Delete your own comments
- ✅ View like counts
- ✅ View comment counts

### User Interface
- ✅ Responsive design
- ✅ Clean and modern UI
- ✅ Protected routes (redirects)
- ✅ User dashboard
- ✅ Post listing page
- ✅ Post detail page with comments
- ✅ Create/Edit post forms

---

## 🔐 Security Features

- Password hashing using bcrypt (salt rounds: 10)
- JWT token authentication
- Input validation using express-validator
- SQL injection prevention (parameterized queries)
- CORS enabled
- Protected API routes
- Environment variables for sensitive data

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=blog_platform
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=production
```

⚠️ **Important**: Change `JWT_SECRET` and `DB_PASSWORD` in production!

---

## 🐳 Docker Configuration

### Services
1. **MySQL** (mysql:8.0)
   - Port: 3306
   - Database: blog_platform
   - Auto-initializes with schema

2. **Backend** (Node.js)
   - Port: 5000
   - Depends on MySQL
   - Health checks enabled

3. **Frontend** (React + Nginx)
   - Port: 80
   - Reverse proxy to backend
   - Production optimized build

### Networks
- All services connected via `blog-network` bridge network

### Volumes
- `mysql-data`: Persists MySQL database

---

## 🧪 Testing the Application

### 1. Register a New User
- Go to http://localhost
- Click "Register"
- Fill in username, email, password
- Submit

### 2. Login
- Use registered credentials
- JWT token stored in localStorage

### 3. Create a Post
- Navigate to "Create Post"
- Enter title and content
- Select category (optional)
- Submit

### 4. View Posts
- Homepage shows all posts
- Click on a post to view details

### 5. Like & Comment
- Click heart icon to like
- Add comments at bottom
- Delete your own comments

### 6. Manage Your Posts
- Go to Dashboard
- View all your posts
- Edit or delete posts

---

## 📦 Production Deployment Checklist

- [ ] Change JWT_SECRET to strong random value
- [ ] Change MySQL root password
- [ ] Enable HTTPS/SSL
- [ ] Set NODE_ENV=production
- [ ] Configure proper CORS origins
- [ ] Set up database backups
- [ ] Configure logging
- [ ] Set up monitoring
- [ ] Review security headers
- [ ] Enable rate limiting

---

## 🐛 Troubleshooting

### Backend won't connect to MySQL
```powershell
# Check if MySQL is ready
docker-compose logs mysql

# Restart services
docker-compose restart backend
```

### Frontend API calls failing
- Ensure backend is running
- Check nginx.conf proxy settings
- Verify network connectivity

### Port already in use
```powershell
# Stop all containers
docker-compose down

# Find process using port
netstat -ano | findstr :80
netstat -ano | findstr :5000
netstat -ano | findstr :3306

# Kill process or change ports in docker-compose.yml
```

### Database not initializing
```powershell
# Remove volumes and restart
docker-compose down -v
docker-compose up --build
```

---

## 📚 Technologies & Libraries

### Backend Dependencies
- express: ^4.18.2
- mysql2: ^3.6.5
- bcrypt: ^5.1.1
- jsonwebtoken: ^9.0.2
- cors: ^2.8.5
- dotenv: ^16.3.1
- express-validator: ^7.0.1

### Frontend Dependencies
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.20.1
- axios: ^1.6.2

---

## 👨‍💻 Development Tips

### Hot Reload Development
For development with hot reload, modify docker-compose.yml:

```yaml
backend:
  command: npm run dev
  volumes:
    - ./backend:/app
    - /app/node_modules
```

### Database Management
Access MySQL directly:
```powershell
docker-compose exec mysql mysql -u root -prootpassword blog_platform
```

### View Logs
```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

---

## 🎨 Customization

### Styling
- Modify `frontend/src/App.css` for global styles
- Update `frontend/src/index.css` for base styles
- All colors, fonts, and layouts are in CSS

### Adding New Features
1. Backend: Create model → controller → route
2. Frontend: Create API call → component/page
3. Update documentation

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🤝 Support

For issues or questions:
1. Check troubleshooting section
2. Review API endpoint documentation
3. Check Docker logs for errors

---

**Built with ❤️ using React, Node.js, Express, and MySQL**
