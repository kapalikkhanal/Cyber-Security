const db = require("../../db");
const bcrypt = require("bcrypt");

class User {
  static async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const users = await db.query(sql, [email]);
    return users[0];
  }

  static async findById(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    const users = await db.query(sql, [id]);
    return users[0];
  }

  static async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const sql = `
      INSERT INTO users (name, email, password) 
      VALUES (?, ?, ?)
    `;

    const result = await db.query(sql, [
      userData.name,
      userData.email,
      hashedPassword,
    ]);

    // Get the newly created user
    return this.findById(result.insertId);
  }

  static async comparePassword(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}

module.exports = User;
