const db = require("../../db");

class ScanHistory {
  static async createTable() {
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
    await db.query(sql);
  }

  static async addScanRecord(record) {
    const sql = `
      INSERT INTO scan_history 
        (user_id, scan_type, content, google_result, open_phish_result, virus_total_result, spam_detection_result) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      record.userId,
      record.scanType,
      record.content,
      record.results.googleSafeBrowsing
        ? JSON.stringify(record.results.googleSafeBrowsing)
        : null,
      record.results.openPhish
        ? JSON.stringify(record.results.openPhish)
        : null,
      record.results.virusTotal
        ? JSON.stringify(record.results.virusTotal)
        : null,
      record.results.spamDetection
        ? JSON.stringify(record.results.spamDetection)
        : null,
    ];

    await db.query(sql, params);
  }

  static async getHistoryByUser(userId) {
    const sql = `
      SELECT 
        id,
        scan_type,
        content,
        timestamp,
        google_result,
        open_phish_result,
        virus_total_result,
        spam_detection_result
      FROM scan_history
      WHERE user_id = ?
      ORDER BY timestamp DESC
    `;

    const history = await db.query(sql, [userId]);

    return history.map((record) => {
      const baseResult = {
        id: record.id,
        scanType: record.scan_type,
        content: record.content,
        timestamp: record.timestamp,
      };

      // Helper function to safely parse JSON or return the object if already parsed
      const parseIfNeeded = (data) => {
        if (typeof data === "string") {
          try {
            return JSON.parse(data);
          } catch (e) {
            console.error("Failed to parse JSON:", data);
            return null;
          }
        }
        return data;
      };

      if (record.scan_type === "url") {
        return {
          ...baseResult,
          results: {
            googleSafeBrowsing: record.google_result
              ? parseIfNeeded(record.google_result)
              : null,
            openPhish: record.open_phish_result
              ? parseIfNeeded(record.open_phish_result)
              : null,
            virusTotal: record.virus_total_result
              ? parseIfNeeded(record.virus_total_result)
              : null,
          },
        };
      } else {
        return {
          ...baseResult,
          results: {
            spamDetection: record.spam_detection_result
              ? parseIfNeeded(record.spam_detection_result)
              : null,
          },
        };
      }
    });
  }
}

module.exports = ScanHistory;
