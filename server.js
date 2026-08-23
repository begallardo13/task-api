const app = require('./index'); // Import the Express application

const PORT = process.env.PORT || 3000; // Define the port our API will use

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Confirm the server started
});
