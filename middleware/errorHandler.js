const errorHandler = (err, req, res, next) => { // Create middleware that handles errors
  console.error(err.stack); // Print the full error details in the server console

  res.status(500).json({ // Send a JSON error response
    error: 'Something went wrong'
  });
};

module.exports = errorHandler; // Export the error handling middleware
