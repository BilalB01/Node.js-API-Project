const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

// Database pad uit environment variabelen
const dbPath = path.resolve(__dirname, '../../', process.env.DB_PATH || '../receptenweb/database/database.sqlite');

let db;

try {
  db = new Database(dbPath, { verbose: console.log });
  console.log('✅ Database verbinding succesvol!');
  console.log(`📁 Database locatie: ${dbPath}`);
} catch (error) {
  console.error('❌ Database verbinding mislukt:', error.message);
  process.exit(1);
}

// Database helper functies
const dbHelpers = {
  // Voer een query uit en krijg alle resultaten
  all: (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      return stmt.all(params);
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  },

  // Voer een query uit en krijg één resultaat
  get: (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      return stmt.get(params);
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  },

  // Voer een INSERT, UPDATE of DELETE uit
  run: (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      return stmt.run(params);
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }
};

module.exports = { db, dbHelpers };
