const db = require('../../database/database');

const resetDatabase = () => {
  db.exec(`
    DELETE FROM tasks;

    INSERT INTO tasks (id, title, completed)
    VALUES
      (1, 'Learn REST APIs', 0),
      (2, 'Practice Node.js', 0);
  `);
};

module.exports = { resetDatabase };
