const taskRepository = require('../database/repositories/taskRepository'); // Import the task database repository

const getTasks = (req, res) => {
  const tasks = taskRepository.findAll();

  tasks.forEach(task => {
    task.completed = Boolean(task.completed);
  });

  res.json(tasks);
};

const getTaskById = (req, res) => { // Create the controller for GET /tasks/:id
  const id = Number(req.params.id); // Convert the URL ID from a string to a number

  const task = taskRepository.findById(id); // Retrieve the task from SQLite

  if (!task) { // Check whether the task was found
    return res.status(404).json({ error: 'Task not found' }); // Return 404 if it does not exist
  }

  task.completed = Boolean(task.completed); // Convert SQLite 0/1 into JavaScript false/true

  res.json(task); // Return the task as JSON
};

const createTask = (req, res) => { // Create the controller for POST /tasks
  const { title } = req.body; // Extract the title from the request body

  const newTask = taskRepository.create(title.trim()); // Create the task in SQLite

  newTask.completed = Boolean(newTask.completed); // Convert SQLite 0/1 to false/true

  res.status(201).json(newTask); // Return the newly created task
};

const updateTask = (req, res) => { // Create the controller for PUT /tasks/:id
  const id = Number(req.params.id); // Convert the URL ID from a string to a number

  const { title, completed } = req.body; // Extract the updated task data

  if (typeof completed !== 'boolean') { // Check that completed is a boolean
    return res.status(400).json({ error: 'Completed must be a boolean' }); // Return 400 for invalid data
  }

  const updatedTask = taskRepository.update(
    id,
    title.trim(),
    completed
  ); // Update the task in SQLite

  if (!updatedTask) { // Check whether the task existed
    return res.status(404).json({ error: 'Task not found' }); // Return 404 if it does not exist
  }

  updatedTask.completed = Boolean(updatedTask.completed); // Convert SQLite 0/1 to false/true

  res.json(updatedTask); // Return the updated task
};

const deleteTask = (req, res) => { // Create the controller for DELETE /tasks/:id
  const id = Number(req.params.id); // Convert the URL ID from a string to a number

  const deleted = taskRepository.deleteTask(id); // Delete the task from SQLite

  if (!deleted) { // Check whether a task was actually deleted
    return res.status(404).json({ error: 'Task not found' }); // Return 404 if it does not exist
  }

  res.status(204).send(); // Return 204 No Content after successful deletion
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask }; // Export all task controllers