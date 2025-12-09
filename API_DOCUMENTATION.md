# API Documentation - Blog Platform

Base URL: `http://localhost:5000/api`

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Validation Rules:**
- Username: 3-50 characters
- Email: Valid email format
- Password: Minimum 6 characters

---

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

### Get User Profile
**GET** `/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 📝 Post Endpoints

### Get All Posts
**GET** `/posts`

**Query Parameters:**
- `limit` (optional): Number of posts (default: 50)
- `offset` (optional): Offset for pagination (default: 0)

**Response:** (200 OK)
```json
{
  "success": true,
  "posts": [
    {
      "id": 1,
      "user_id": 1,
      "title": "My First Blog Post",
      "content": "This is the content of my first post...",
      "category_id": 1,
      "category_name": "Technology",
      "username": "johndoe",
      "like_count": 5,
      "comment_count": 3,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### Get Single Post
**GET** `/posts/:id`

**Response:** (200 OK)
```json
{
  "success": true,
  "post": {
    "id": 1,
    "user_id": 1,
    "title": "My First Blog Post",
    "content": "Full content here...",
    "category_id": 1,
    "category_name": "Technology",
    "username": "johndoe",
    "like_count": 5,
    "comment_count": 3,
    "isLiked": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Note:** `isLiked` only present if user is authenticated

---

### Get Current User's Posts
**GET** `/posts/user/my-posts`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "posts": [...]
}
```

---

### Create Post
**POST** `/posts`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "My Amazing Post",
  "content": "This is the full content of my post...",
  "categoryId": 1
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "Post created successfully",
  "postId": 1
}
```

**Validation Rules:**
- Title: 5-255 characters
- Content: Minimum 10 characters
- categoryId: Optional, must be valid category ID

---

### Update Post
**PUT** `/posts/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "categoryId": 2
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Post updated successfully"
}
```

**Authorization:** User must own the post

---

### Delete Post
**DELETE** `/posts/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

**Authorization:** User must own the post

---

### Like Post
**POST** `/posts/:id/like`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Post liked successfully",
  "likeCount": 6
}
```

**Error:** (400 Bad Request) if already liked
```json
{
  "message": "You already liked this post"
}
```

---

### Unlike Post
**DELETE** `/posts/:id/unlike`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Post unliked successfully",
  "likeCount": 5
}
```

---

## 💬 Comment Endpoints

### Get Post Comments
**GET** `/comments/post/:postId`

**Response:** (200 OK)
```json
{
  "success": true,
  "comments": [
    {
      "id": 1,
      "post_id": 1,
      "user_id": 2,
      "username": "janedoe",
      "content": "Great post!",
      "createdAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

---

### Create Comment
**POST** `/comments/post/:postId`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "content": "This is my comment on this post"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "Comment added successfully",
  "commentId": 1
}
```

**Validation Rules:**
- Content: 1-1000 characters

---

### Delete Comment
**DELETE** `/comments/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

**Authorization:** User must own the comment

---

## 🏷️ Category Endpoints

### Get All Categories
**GET** `/categories`

**Response:** (200 OK)
```json
{
  "success": true,
  "categories": [
    {
      "id": 1,
      "category_name": "Technology",
      "createdAt": "2024-01-15T10:00:00.000Z"
    },
    {
      "id": 2,
      "category_name": "Lifestyle",
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

---

### Get Category by ID
**GET** `/categories/:id`

**Response:** (200 OK)
```json
{
  "success": true,
  "category": {
    "id": 1,
    "category_name": "Technology",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

---

### Create Category
**POST** `/categories`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "categoryName": "Science"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "Category created successfully",
  "categoryId": 9
}
```

**Validation Rules:**
- categoryName: 2-100 characters

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Title must be 5-255 characters",
      "param": "title",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Authentication required"
}
```

```json
{
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized to update this post"
}
```

### 404 Not Found
```json
{
  "message": "Post not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## 🔑 Authentication

All protected endpoints require JWT token in header:

```
Authorization: Bearer <your_jwt_token>
```

Token is returned from `/auth/register` and `/auth/login` endpoints.

Token expires after 7 days.

---

## 📊 HTTP Status Codes

- `200 OK` - Successful GET/PUT/DELETE
- `201 Created` - Successful POST (resource created)
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Not authorized for this action
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Create Post (with token)
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test Post","content":"This is test content","categoryId":1}'
```

### Get All Posts
```bash
curl http://localhost:5000/api/posts
```

---

## 🧪 Testing with Postman

1. Import these endpoints as a collection
2. Create environment variable: `token`
3. After login, save token to environment
4. Use `{{token}}` in Authorization header

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- Database uses MySQL timezone settings
- POST/PUT requests require `Content-Type: application/json`
- Like system prevents duplicate likes (unique constraint)
- Deleting posts cascades to comments and likes
- Deleting users cascades to all their content

---

**Happy Coding! 🚀**
