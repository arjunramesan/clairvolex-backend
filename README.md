# Bookstore API

## Description
The Bookstore API is a RESTful web service for managing books in a bookstore. It provides endpoints to search for books based on various criteria such as title, author, publication date, genre, and availability. The API also supports sorting, pagination, and authentication using JWT tokens.

## Features
- Search for books by title, author, publication date, genre, and availability.
- Sort search results by title, author, or publication date.
- Paginate search results to improve performance.
- Generate authentication tokens for accessing protected endpoints.
- Supports JSON format for responses.

## Technologies Used
- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- Swagger (OpenAPI Specification)

## Installation
1. Clone the repository: `git clone https://github.com/yourusername/bookstore-api.git`
2. Navigate to the project directory: `cd bookstore-api`
3. Install dependencies: `npm install`
4. Set up the MySQL database and configure the connection in `config.js`.
5. Start the server: `npm start`

## Usage
- Send HTTP requests to the endpoints using tools like cURL or Postman.

## API Endpoints
- **POST /generate-token**: Generate authentication token.
- **GET /books**: Retrieve a list of books based on search c
