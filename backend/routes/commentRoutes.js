const express = require('express');
const { body } = require('express-validator');
const CommentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

// Validation rules
const commentValidation = [
  body('content').trim().isLength({ min: 1, max: 1000 }).withMessage('Comment must be 1-1000 characters'),
  validateRequest
];

// Routes
router.get('/post/:postId', CommentController.getCommentsByPost);
router.post('/post/:postId', authMiddleware, commentValidation, CommentController.createComment);
router.delete('/:id', authMiddleware, CommentController.deleteComment);

module.exports = router;
