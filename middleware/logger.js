const logger = (req, res, next) => { // Create a middleware function named logger
  const now = new Date(); // Capture the current date and time
  const time = now.toLocaleTimeString(); // Convert the time into a readable format

  console.log(`[${time}] ${req.method} ${req.url}`); // Log the time, HTTP method, and URL

  next(); // Pass the request to the next middleware or route
};

module.exports = logger; // Export the logger middleware
