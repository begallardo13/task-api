const express = require('express'); // Import the Express framework
const app = express(); // Create an Express application

const taskRoutes = require('./routes/taskRoutes'); // Import the task routes
const logger = require('./middleware/logger'); // Import the request logger middleware
const errorHandler = require('./middleware/errorHandler'); // Import global error handling middleware

const { swaggerUi, swaggerDocument } = require('./docs/swagger');

app.use(logger); // Register the logger middleware for incoming requests
app.use(express.json()); // Allow Express to read JSON request bodies

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(taskRoutes); // Register our task routes with the application

app.get('/health', (req, res) => {
  res.json({
    status: 'ok'
  });
});

app.use(errorHandler); // Register global error handling middleware

module.exports = app; // Export the Express application for testing

