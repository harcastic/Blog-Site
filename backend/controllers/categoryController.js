const Category = require('../models/Category');

class CategoryController {
  static async getAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll();

      res.json({
        success: true,
        categories
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.json({
        success: true,
        category
      });
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { categoryName } = req.body;

      const categoryId = await Category.create(categoryName);

      res.status(201).json({
        success: true,
        message: 'Category created successfully',
        categoryId
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
