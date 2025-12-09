const db = require('../config/database');

class Category {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY category_name');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(categoryName) {
    const [result] = await db.query(
      'INSERT INTO categories (category_name) VALUES (?)',
      [categoryName]
    );
    return result.insertId;
  }
}

module.exports = Category;
