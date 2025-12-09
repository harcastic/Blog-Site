const db = require('../config/database');

class User {
  static async create(username, email, hashedPassword) {
    const [result] = await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findByUsername(username) {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT id, username, email, createdAt FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }
}

module.exports = User;
