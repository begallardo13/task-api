# Task API

A RESTful Task Management API built with Node.js, Express, and SQLite.

This project demonstrates modern API development practices including REST architecture, database persistence, automated testing, API documentation, CI/CD, and cloud deployment.

---

## 🚀 Live API

Production URL:

https://task-api-fcrx.onrender.com

Health Check:

GET /health

Response:
	```json
		{
  		"status": "ok"
		}

Features
API Functionality
- Create tasks
- Retrieve all tasks
- Retrieve tasks by ID
- Update tasks
- Delete tasks
Backend
- Node.js
- Express.js
- SQLite database
- Repository pattern
API Engineering Practices
- RESTful API design
- Request validation middleware
- Error handling middleware
- Request logging middleware
- OpenAPI 3.0 documentation
- Swagger UI documentation
Testing
- Jest
- Supertest
- Automated API endpoint testing
Current test coverage: 13 passing tests

DevOps
- GitHub version control
- GitHub Actions CI pipeline
- Automated testing on push
- OpenAPI validation
- Render cloud deployment

API Endpoints
Health
Check API Status
GET /health
Response:
{
  "status": "ok"
}

Tasks
Get All Tasks
GET /tasks

Get Task By ID
GET /tasks/:id
Example:
GET /tasks/1

Create Task
POST /tasks
Request:
{
  "title": "Learn API Security"
}

Update Task
PUT /tasks/:id
Request:
{
  "title": "Learn Advanced REST APIs",
  "completed": true
}

Delete Task
DELETE /tasks/:id

Running Locally
Clone repository:
git clone https://github.com/begallardo13/task-api.git

Install dependencies:
npm install

Start server:
npm start

API runs on:
http://localhost:3000

Running Tests

Execute:
npm test

Expected:
13 passing tests

API Documentation
OpenAPI specification:
docs/openapi.yaml

Validate documentation:
npm run lint

Swagger UI:
/api-docs

Project Structure
task-api
│
├── controllers
│   └── taskController.js
│
├── database
│   ├── database.js
│   └── repositories
│
├── docs
│   ├── openapi.yaml
│   └── swagger.js
│
├── middleware
│   ├── errorHandler.js
│   ├── logger.js
│   └── validateTask.js
│
├── routes
│   └── taskRoutes.js
│
├── tests
│   └── tasks.test.js
│
├── index.js
└── server.js

Future Improvements
Planned enhancements:
- JWT authentication
- API key authentication
- Environment configuration
- PostgreSQL migration
- Docker support
- Rate limiting
- External API integrations
- Webhooks
- Event-driven architecture

Author
Bien Gallardo
API Development Practice Project
