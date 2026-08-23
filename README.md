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

{
  "status": "ok"
}

---

# Features

## API Functionality

- Create tasks
- Retrieve all tasks
- Retrieve tasks by ID
- Update tasks
- Delete tasks

## Backend

- Node.js
- Express.js
- SQLite database
- Repository pattern

## API Engineering Practices

- RESTful API design
- Request validation middleware
- Error handling middleware
- Request logging middleware
- OpenAPI 3.0 documentation
- Swagger UI documentation

## Testing

- Jest
- Supertest
- Automated API endpoint testing

Current test status:

13 passing tests

## DevOps

- GitHub version control
- GitHub Actions CI pipeline
- Automated testing on push
- OpenAPI validation
- Render cloud deployment

---

# API Endpoints

## Health

GET /health

Response:

{
  "status": "ok"
}

## Tasks

GET /tasks

GET /tasks/:id

POST /tasks

PUT /tasks/:id

DELETE /tasks/:id

---

# Running Locally

Clone repository:

git clone https://github.com/begallardo13/task-api.git

Install dependencies:

npm install

Start server:

npm start

API runs on:

http://localhost:3000

---

# Running Tests

Execute:

npm test

Expected:

13 passing tests

---

# API Documentation

OpenAPI specification:

docs/openapi.yaml

Validate documentation:

npm run lint

Swagger UI:

/api-docs

---

# Future Improvements

- JWT authentication
- API key authentication
- Environment configuration
- PostgreSQL migration
- Docker support
- Rate limiting
- External API integrations
- Webhooks
- Event-driven architecture

---

# Author

Bien Gallardo

API Development Practice Project
