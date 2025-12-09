const db = require('../config/database');

class Like {
  static async add(postId, userId) {
    try {
      const [result] = await db.query(
        'INSERT INTO likes (post_id, user_id) VALUES (?, ?)',
        [postId, userId]
      );
      return result.insertId;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Already liked');
      }
      throw error;
    }
  }

  static async remove(postId, userId) {
    const [result] = await db.query(
      'DELETE FROM likes WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    );
    return result.affectedRows;
  }

  static async checkLike(postId, userId) {
    const [rows] = await db.query(
      'SELECT * FROM likes WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    );
    return rows.length > 0;
  }

  static async countByPost(postId) {
    const [rows] = await db.query(
      'SELECT COUNT(*) as count FROM likes WHERE post_id = ?',
      [postId]
    );
    return rows[0].count;
  }
}

module.exports = Like;
