const request = require('supertest'); // Import Supertest for making HTTP requests
const app = require('../index'); // Import the Express application

const errorHandler = require('../middleware/errorHandler'); // Import the error handler

const { resetDatabase } = require('./helpers/testDatabase');

app.get('/test-error', (req, res, next) => { // Create a test-only route
  next(new Error('Test error')); // Deliberately trigger an error
});

app.use(errorHandler); // Attach the error handler for this test

describe('Task API', () => {
        beforeEach(() => {
        resetDatabase();
  });
    

  test('GET /tasks should return all tasks', async () => { // Test retrieving all tasks
    const response = await request(app).get('/tasks'); // Send a GET request to /tasks

    expect(response.statusCode).toBe(200); // Verify that the response status is 200
    expect(response.body).toBeInstanceOf(Array); // Verify that the response body is an array
  });
  
  test('GET /tasks/:id should return a specific task', async () => { // Test retrieving one task
    const response = await request(app).get('/tasks/1'); // Send a GET request for task 1

    expect(response.statusCode).toBe(200); // Verify that the response status is 200
    expect(response.body.id).toBe(1); // Verify that the returned task has ID 1
    expect(response.body.title).toBe('Learn REST APIs'); // Verify the task title
    expect(response.body.completed).toBe(false); // Verify the completed status
  });
  
  test('GET /tasks/:id should return 404 when task does not exist', async () => { // Test requesting a nonexistent task
    const response = await request(app).get('/tasks/999'); // Send a GET request for a nonexistent task

    expect(response.statusCode).toBe(404); // Verify that the response is 404
    expect(response.body.error).toBe('Task not found'); // Verify the error message
  });  
  
  test('POST /tasks should create a new task', async () => { // Test creating a new task
    const response = await request(app) // Start a request to our Express application
      .post('/tasks') // Send a POST request to /tasks
      .send({ title: 'Test task' }); // Send the task data as JSON

    expect(response.statusCode).toBe(201); // Verify that the response is 201 Created
    expect(response.body.title).toBe('Test task'); // Verify the title
    expect(response.body.completed).toBe(false); // Verify that new tasks start as incomplete
    expect(response.body.id).toBeDefined(); // Verify that the API generated an ID
  });  
  
  test('POST /tasks middleware should allow valid tasks through', async () => { // Test that valid requests pass validation middleware
  const response = await request(app) // Start a request to the Express application
    .post('/tasks') // Send a POST request to create a task
    .send({ title: 'Middleware passed' }); // Send valid task data

  expect(response.statusCode).toBe(201); // Verify that middleware allowed the request to continue
  expect(response.body.title).toBe('Middleware passed'); // Verify that the task was created
});
  
  test('POST /tasks should return 400 when title is missing', async () => { // Test validation for a missing title
    const response = await request(app) // Start a request to our Express application
      .post('/tasks') // Send a POST request to /tasks
      .send({}); // Send an empty JSON object

    expect(response.statusCode).toBe(400); // Verify that the response is 400 Bad Request
    expect(response.body.error).toBe('Title is required'); // Verify the validation error
  });
  
  test('POST /tasks should return 400 when title contains only whitespace', async () => { // Test whitespace-only title validation
    const response = await request(app) // Start a request to our Express application
      .post('/tasks') // Send a POST request to /tasks
      .send({ title: '   ' }); // Send a title containing only spaces

    expect(response.statusCode).toBe(400); // Verify that the response is 400 Bad Request
    expect(response.body.error).toBe('Title is required'); // Verify the validation error
  });
  
  test('PUT /tasks/:id should update an existing task', async () => { // Test updating an existing task
    const response = await request(app) // Start a request to our Express application
      .put('/tasks/1') // Send a PUT request for task 1
      .send({ // Send the updated task data
        title: 'Learn Advanced REST APIs', // Provide the new title
        completed: true // Mark the task as completed
      });

    expect(response.statusCode).toBe(200); // Verify that the response is 200 OK
    expect(response.body.id).toBe(1); // Verify that the ID remains 1
    expect(response.body.title).toBe('Learn Advanced REST APIs'); // Verify the title was updated
    expect(response.body.completed).toBe(true); // Verify the completed status was updated
  });
  
  test('PUT /tasks/:id should return 400 when completed is not a boolean', async () => { // Test validation of the completed field
    const response = await request(app) // Start a request to our Express application
      .put('/tasks/1') // Send a PUT request for task 1
      .send({ // Send invalid task data
        title: 'Invalid update', // Provide a valid title
        completed: 'yes' // Incorrectly provide a string instead of a boolean
      });

    expect(response.statusCode).toBe(400); // Verify that the response is 400 Bad Request
    expect(response.body.error).toBe('Completed must be a boolean'); // Verify the validation error
  });
  
  test('PUT /tasks/:id should return 404 when task does not exist', async () => { // Test updating a nonexistent task
    const response = await request(app) // Start a request to our Express application
      .put('/tasks/999') // Send a PUT request for a nonexistent task
      .send({ // Send valid-looking task data
        title: 'Does not exist', // Provide a title
        completed: true // Provide a valid boolean
      });

    expect(response.statusCode).toBe(404); // Verify that the response is 404 Not Found
    expect(response.body.error).toBe('Task not found'); // Verify the error message
  });

  test('DELETE /tasks/:id should delete an existing task', async () => { // Test deleting an existing task
    const response = await request(app).delete('/tasks/2'); // Send a DELETE request for task 2

    expect(response.statusCode).toBe(204); // Verify that the response is 204 No Content
    expect(response.body).toEqual({}); // Verify that the response contains no body
  });
  
  test('DELETE /tasks/:id should return 404 when task does not exist', async () => { // Test deleting a nonexistent task
    const response = await request(app).delete('/tasks/999'); // Send a DELETE request for a nonexistent task

    expect(response.statusCode).toBe(404); // Verify that the response is 404 Not Found
    expect(response.body.error).toBe('Task not found'); // Verify the error message
  });
  
  test('GET /test-error should return 500 when an error occurs', async () => { // Test that unexpected errors return a 500 response
    const response = await request(app).get('/test-error'); // Send a request to the temporary error route

    expect(response.statusCode).toBe(500); // Verify that the API returned Internal Server Error
    expect(response.body.error).toBe('Something went wrong'); // Verify the standardized error message
  });


});
