const db = require('../config/database');

class Post {
  static async create(userId, title, content, categoryId) {
    const [result] = await db.query(
      'INSERT INTO posts (user_id, title, content, category_id) VALUES (?, ?, ?, ?)',
      [userId, title, content, categoryId]
    );
    return result.insertId;
  }

  static async findAll(limit = 50, offset = 0) {
    const [rows] = await db.query(
      `SELECT p.*, u.username, c.category_name,
       (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as like_count,
       (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
       FROM posts p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN categories c ON p.category_id = c.id
       ORDER BY p.createdAt DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(
      `SELECT p.*, u.username, c.category_name,
       (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as like_count,
       (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
       FROM posts p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async findByUserId(userId) {
    const [rows] = await db.query(
      `SELECT p.*, u.username, c.category_name,
       (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as like_count,
       (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
       FROM posts p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.user_id = ?
       ORDER BY p.createdAt DESC`,
      [userId]
    );
    return rows;
  }

  static async update(id, title, content, categoryId) {
    const [result] = await db.query(
      'UPDATE posts SET title = ?, content = ?, category_id = ? WHERE id = ?',
      [title, content, categoryId, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows;
  }

  static async isOwner(postId, userId) {
    const [rows] = await db.query(
      'SELECT user_id FROM posts WHERE id = ?',
      [postId]
    );
    return rows[0] && rows[0].user_id === userId;
  }
}

module.exports = Post;
