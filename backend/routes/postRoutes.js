const express = require('express');
const { body } = require('express-validator');
const PostController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

// Validation rules
const postValidation = [
  body('title').trim().isLength({ min: 5, max: 255 }).withMessage('Title must be 5-255 characters'),
  body('content').trim().isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('categoryId').optional().isInt().withMessage('Invalid category ID'),
  validateRequest
];

// Public routes
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);

// Protected routes
router.get('/user/my-posts', authMiddleware, PostController.getUserPosts);
router.post('/', authMiddleware, postValidation, PostController.createPost);
router.put('/:id', authMiddleware, postValidation, PostController.updatePost);
router.delete('/:id', authMiddleware, PostController.deletePost);
router.post('/:id/like', authMiddleware, PostController.likePost);
router.delete('/:id/unlike', authMiddleware, PostController.unlikePost);

module.exports = router;
