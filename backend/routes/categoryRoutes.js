const express = require('express');
const { body } = require('express-validator');
const CategoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

// Validation rules
const categoryValidation = [
  body('categoryName').trim().isLength({ min: 2, max: 100 }).withMessage('Category name must be 2-100 characters'),
  validateRequest
];

// Routes
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/', authMiddleware, categoryValidation, CategoryController.createCategory);

module.exports = router;
