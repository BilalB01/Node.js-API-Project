const { dbHelpers } = require('../config/database');

class News {
    // Haal alle news items op met limit en offset
    static getAll(limit = 10, offset = 0) {
        const sql = `
      SELECT * FROM news 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
        return dbHelpers.all(sql, [limit, offset]);
    }

    // Haal totaal aantal news items op
    static getCount() {
        const result = dbHelpers.get('SELECT COUNT(*) as count FROM news');
        return result.count;
    }

    // Haal één news item op basis van ID
    static getById(id) {
        const sql = 'SELECT * FROM news WHERE id = ?';
        return dbHelpers.get(sql, [id]);
    }

    // Zoek news items op basis van titel en content
    static search(searchTerm, limit = 10, offset = 0) {
        const sql = `
      SELECT * FROM news 
      WHERE title LIKE ? OR content LIKE ?
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
        const searchPattern = `%${searchTerm}%`;
        return dbHelpers.all(sql, [searchPattern, searchPattern, limit, offset]);
    }

    // Maak een nieuw news item aan
    static create(data) {
        const sql = `
      INSERT INTO news (title, content, published_at, created_at, updated_at)
      VALUES (?, ?, datetime('now'), datetime('now'), datetime('now'))
    `;
        const result = dbHelpers.run(sql, [
            data.title,
            data.content
        ]);

        return this.getById(result.lastInsertRowid);
    }

    // Update een bestaand news item
    static update(id, data) {
        const sql = `
      UPDATE news 
      SET title = ?, content = ?, updated_at = datetime('now')
      WHERE id = ?
    `;
        dbHelpers.run(sql, [
            data.title,
            data.content,
            id
        ]);

        return this.getById(id);
    }

    // Verwijder een news item
    static delete(id) {
        const sql = 'DELETE FROM news WHERE id = ?';
        const result = dbHelpers.run(sql, [id]);
        return result.changes > 0;
    }
}

module.exports = News;
