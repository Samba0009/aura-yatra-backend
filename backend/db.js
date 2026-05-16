const { Pool } = require('pg');

// If DATABASE_URL is set, use PostgreSQL (Railway/production)
// Otherwise use SQLite for local development
const usePostgres = !!process.env.DATABASE_URL;

let db;

if (usePostgres) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
  });

  // Create tables if they don't exist
  pool.query(`
    CREATE TABLE IF NOT EXISTS temples (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      location VARCHAR(255),
      city VARCHAR(100),
      icon VARCHAR(50),
      price INTEGER,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS plans (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      description TEXT,
      terrain VARCHAR(100),
      budget VARCHAR(100),
      tags TEXT,
      image_url VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      tag VARCHAR(100),
      title VARCHAR(255),
      author VARCHAR(100),
      time VARCHAR(100),
      color VARCHAR(50),
      likes VARCHAR(100),
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      item_id INTEGER,
      item_type VARCHAR(100),
      user_details TEXT
    );
  `).catch(err => console.log('Tables check completed:', err.message));

  db = pool;
} else {
  // Local SQLite for development
  const Database = require('better-sqlite3');
  const path = require('path');

  const sqlite = new Database(path.join(__dirname, 'aurayatra.db'));
  sqlite.pragma('foreign_keys = ON');

  // Wrap SQLite to match PostgreSQL pool.query() interface
  db = {
    query: (sql, params = []) => {
      return new Promise((resolve, reject) => {
        try {
          // Convert PostgreSQL syntax to SQLite syntax
          let sqliteSql = sql.replace(/\$\d+/g, '?');
          
          // Handle special cases
          if (sql.includes('ILIKE')) {
            sqliteSql = sqliteSql.replace(/ILIKE/g, 'LIKE');
          }
          if (sql.includes('RETURNING')) {
            // For INSERT ... RETURNING, use lastID
            const stmt = sqlite.prepare(sqliteSql);
            const info = stmt.run(...params);
            const returnCol = sql.match(/RETURNING\s+(\w+)/)?.[1] || 'id';
            resolve({ rows: [{ [returnCol]: info.lastInsertRowid }] });
          } else {
            const stmt = sqlite.prepare(sqliteSql);
            const rows = stmt.all(...params);
            resolve({ rows });
          }
        } catch (err) {
          reject(err);
        }
      });
    }
  };
}

module.exports = db;
