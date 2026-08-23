const { DatabaseSync } = require('node:sqlite'); // Import Node's built-in SQLite support

const databaseFile = process.env.NODE_ENV === 'test'
  ? './database/test.db'
  : './database/tasks.db';

const db = new DatabaseSync(databaseFile); // Open the appropriate SQLite database

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  )
`);

module.exports = db; // Export the database connection