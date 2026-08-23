const express = require('express'); // Import the Express framework
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController'); // Import the task controllers
const router = express.Router(); // Create a router to hold our task routes
const validateTask = require('../middleware/validateTask'); // Import the task validation middleware

// Handle GET requests to /tasks
router.get('/tasks', getTasks); // Send GET /tasks requests to the controller

// Handle GET requests for a specific task
router.get('/tasks/:id', getTaskById); // Send GET /tasks/:id requests to the controller

// Handle POST requests to create a new task
router.post('/tasks', validateTask, createTask); // Validate the task, then create it

// Handle PUT requests to update an existing task
router.put('/tasks/:id', validateTask, updateTask); // Validate the title, then update the task

// Handle DELETE requests to remove an existing task
router.delete('/tasks/:id', deleteTask); // Send DELETE requests to the delete controller

module.exports = router; // Export the router so index.js can use it
