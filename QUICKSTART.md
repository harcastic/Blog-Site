# Quick Start Guide - Blog Platform

## ⚡ Method 1: Docker Hub (Fastest - Recommended)

**No build time! Pre-built images ready to use.**

### Step 1: Open Terminal in Project Directory
```powershell
cd blog-site
```

### Step 2: Pull and Run from Docker Hub
```powershell
docker-compose -f docker-compose.hub.yml up
```

Wait 10-20 seconds for images to download and start...

### Step 3: Access the Application
Open your browser and go to: **http://localhost**

✅ **Done!** No compilation, no build time, just pull and run!

---

## 🛠️ Method 2: Local Build (For Development)

**Build from source code (takes 2-5 minutes first time).**

### Step 1: Open Terminal in Project Directory
```powershell
cd blog-site
```

### Step 2: Build and Start Everything
```powershell
docker-compose up --build
```

Wait 30-60 seconds for all services to start...

### Step 3: Access the Application
Open your browser and go to: **http://localhost**

---

## 🎯 What Just Happened?

Docker Compose started 3 containers:
1. **MySQL Database** (port 3306) - Auto-initialized with schema
2. **Backend API** (port 5000) - Node.js/Express server
3. **Frontend** (port 80) - React application via Nginx

---

## 🧪 Try It Out!

### Register a New Account
1. Click "Register" in the navbar
2. Enter: username, email, password
3. You'll be automatically logged in

### Create Your First Post
1. Click "Create Post" in navbar
2. Enter title and content
3. Select a category (optional)
4. Click "Create Post"

### Interact with Posts
- ❤️ Like posts by clicking the heart icon
- 💬 Add comments to any post
- ✏️ Edit your own posts from Dashboard
- 🗑️ Delete your own posts

---

## 🛑 Stop the Application

Press `Ctrl+C` in the terminal, then:

```powershell
docker-compose down
```

To completely reset (delete all data):
```powershell
docker-compose down -v
```

---

## 🔄 Restart

Just run again:
```powershell
docker-compose up
```

(No need for `--build` unless you changed code)

---

## 🐛 Something Not Working?

### Check if services are running:
```powershell
docker-compose ps
```

### View logs:
```powershell
docker-compose logs -f
```

### Complete reset:
```powershell
docker-compose down -v
docker-compose up --build
```

---

## 📊 Default Data

The database comes pre-loaded with 8 categories:
- Technology
- Lifestyle
- Travel
- Food
- Health
- Education
- Entertainment
- Business

---

## 🎓 Next Steps

1. Explore the full README.md for API documentation
2. Check the code structure in different directories
3. Modify and customize the application
4. Deploy to production

---

**That's it! You're ready to blog! 🚀**
