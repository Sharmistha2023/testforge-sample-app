const Database = require('better-sqlite3');

const db = new Database(process.env.DB_PATH || ':memory:');
db.exec(`
  CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, role TEXT);
  CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT, status TEXT, owner_id INTEGER, estimate INTEGER);
  CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, task_id INTEGER, body TEXT);
`);

module.exports = db;
