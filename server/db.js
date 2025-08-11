const mysql = require("mysql2/promise");
require("dotenv").config();

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async query(sql, params) {
    const [rows] = await this.pool.execute(sql, params);
    return rows;
  }

  async init() {
    await this.createUsersTable();
    await this.createScanHistoryTable();
    console.log("Database initialized");
  }

  async createUsersTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await this.query(sql);
  }

  async createScanHistoryTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS scan_history (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      scan_type ENUM('url', 'email') NOT NULL,
      content TEXT NOT NULL,
      google_result JSON,
      open_phish_result JSON,
      virus_total_result JSON,
      spam_detection_result JSON,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
    await this.query(sql);
  }
}

module.exports = new Database();
