const validateTask = (req, res, next) => { // Create middleware that validates task data
  const { title } = req.body; // Extract the title from the request body

  if (!title || !title.trim()) { // Check whether the title is missing or contains only whitespace
    return res.status(400).json({ error: 'Title is required' }); // Stop the request and return 400 Bad Request
  }

  next(); // Continue to the next middleware or route
};

module.exports = validateTask; // Export the validation middleware
