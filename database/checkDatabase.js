const db = require('./database'); // Import our SQLite database connection

const tasks = db.prepare(`
  SELECT * FROM tasks
`).all(); // Retrieve every row from the tasks table

console.log(tasks); // Display the tasks