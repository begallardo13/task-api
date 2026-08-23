const db = require('./database'); // Import our SQLite database connection

db.prepare(`
  INSERT INTO tasks (id, title, completed)
  VALUES (?, ?, ?)
`).run(1, 'Learn REST APIs', 0); // Insert the first task

db.prepare(`
  INSERT INTO tasks (id, title, completed)
  VALUES (?, ?, ?)
`).run(2, 'Practice Node.js', 0); // Insert the second task

console.log('Initial tasks inserted'); // Confirm that the seed completed
