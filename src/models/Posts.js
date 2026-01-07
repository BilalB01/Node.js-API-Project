const { dbHelpers } = require('../config/database');

class Posts {
    // Haal alle posts op met limit en offset
    static getAll(limit = 10, offset = 0) {
        const sql = `
      SELECT * FROM posts 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
        return dbHelpers.all(sql, [limit, offset]);
    }

    // Haal totaal aantal posts op
    static getCount() {
        const result = dbHelpers.get('SELECT COUNT(*) as count FROM posts');
        return result.count;
    }

    // Haal één post op basis van ID
    static getById(id) {
        const sql = 'SELECT * FROM posts WHERE id = ?';
        return dbHelpers.get(sql, [id]);
    }

    // Zoek posts op basis van content
    static search(searchTerm, limit = 10, offset = 0) {
        const sql = `
      SELECT * FROM posts 
      WHERE content LIKE ?
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
        const searchPattern = `%${searchTerm}%`;
        return dbHelpers.all(sql, [searchPattern, limit, offset]);
    }

    // Maak een nieuwe post aan
    static create(data) {
        const sql = `
      INSERT INTO posts (content, user_id, created_at, updated_at)
      VALUES (?, ?, datetime('now'), datetime('now'))
    `;
        const result = dbHelpers.run(sql, [
            data.content,
            data.user_id || 1
        ]);

        return this.getById(result.lastInsertRowid);
    }

    // Update een bestaande post
    static update(id, data) {
        const sql = `
      UPDATE posts 
      SET content = ?, updated_at = datetime('now')
      WHERE id = ?
    `;
        dbHelpers.run(sql, [
            data.content,
            id
        ]);

        return this.getById(id);
    }

    // Verwijder een post
    static delete(id) {
        const sql = 'DELETE FROM posts WHERE id = ?';
        const result = dbHelpers.run(sql, [id]);
        return result.changes > 0;
    }
}

module.exports = Posts;
