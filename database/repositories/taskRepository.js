const db = require('../database'); // Import the SQLite database connection

const findAll = () => { // Retrieve all tasks
  return db.prepare(`
    SELECT id, title, completed
    FROM tasks
  `).all();
};

const findById = (id) => { // Retrieve one task by ID
  return db.prepare(`
    SELECT id, title, completed
    FROM tasks
    WHERE id = ?
  `).get(id);
};

const create = (title) => { // Create a new task in SQLite
  const result = db.prepare(`
    INSERT INTO tasks (title, completed)
    VALUES (?, ?)
  `).run(title, 0); // Insert the title and mark the task as incomplete

  return findById(result.lastInsertRowid); // Retrieve and return the newly created task
};

const update = (id, title, completed) => { // Update an existing task in SQLite
  const result = db.prepare(`
    UPDATE tasks
    SET title = ?, completed = ?
    WHERE id = ?
  `).run(title, completed ? 1 : 0, id); // Store the boolean as SQLite 1 or 0

  if (result.changes === 0) { // Check whether a task was actually updated
    return null; // Return null when the task does not exist
  }

  return findById(id); // Retrieve and return the updated task
};

const deleteTask = (id) => { // Delete a task from SQLite
  const result = db.prepare(`
    DELETE FROM tasks
    WHERE id = ?
  `).run(id); // Execute the DELETE statement

  return result.changes > 0; // Return true if a task was deleted
};

module.exports = { findAll, findById, create, update, deleteTask }; // Export the repository functions