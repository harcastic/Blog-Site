const db = require('../config/database');

class Comment {
  static async create(postId, userId, content) {
    const [result] = await db.query(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [postId, userId, content]
    );
    return result.insertId;
  }

  static async findByPostId(postId) {
    const [rows] = await db.query(
      `SELECT c.*, u.username 
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ?
       ORDER BY c.createdAt DESC`,
      [postId]
    );
    return rows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM comments WHERE id = ?', [id]);
    return result.affectedRows;
  }

  static async isOwner(commentId, userId) {
    const [rows] = await db.query(
      'SELECT user_id FROM comments WHERE id = ?',
      [commentId]
    );
    return rows[0] && rows[0].user_id === userId;
  }
}

module.exports = Comment;
