# Armadillo Amarillo Technical Test

REST API for user management and authentication

## Technologies

- Node.js
- Fastify
- PostgreSQL
- JWT
- Bcrypt

## Installation

1. Extract the provided `.rar` file.
2. Enter the `backend` folder:
  ```bash
  cd backend
  ```
3. Install dependencies:
  ```bash
  npm install
  ```
4. Set up environment variables in a `.env` file:
  ```
  DATABASE_URL=your_postgres_url
  JWT_SECRET=your_secret
  JWT_EXPIRATION=1d
  ```
5. Start the server:
  ```bash
  npm run dev 
  or
  npm run start
  ```

## Main Endpoints

### Authentication

- `POST /auth/register`  
  Register a new user.  
  **Body:**  
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
  **Response:**  
  - 201 Created: User registered successfully.
  - 400 Bad Request: Validation errors.

- `POST /auth/login`  
  Authenticate a user and receive a JWT token.  
  **Body:**  
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
  **Response:**  
  - 200 OK: Returns JWT token.
  - 401 Unauthorized: Invalid credentials.

### Users

- `GET /users`  
  Get a list of all users.  
  **Headers:**  
  - `Authorization: Bearer <token>`
  **Response:**  
  - 200 OK: Array of user objects.
  - 401 Unauthorized: Missing or invalid token.

- `GET /users/:id`  
  Get details of a user by ID.  
  **Headers:**  
  - `Authorization: Bearer <token>`
  **Response:**  
  - 200 OK: User object.
  - 404 Not Found: User does not exist.
  - 401 Unauthorized: Missing or invalid token.

- `PUT /users/:id`  
  Update user information.  
  **Headers:**  
  - `Authorization: Bearer <token>`
  **Body:**  
  ```json
  {
    "username": "string (optional)",
    "email": "string (optional)",
    "password": "string (optional)"
  }
  ```
  **Response:**  
  - 200 OK: User updated.
  - 400 Bad Request: Validation errors.
  - 404 Not Found: User does not exist.
  - 401 Unauthorized: Missing or invalid token.

- `DELETE /users/:id`  
  Delete a user by ID.  
  **Headers:**  
  - `Authorization: Bearer <token>`
  **Response:**  
  - 204 No Content: User deleted.
  - 404 Not Found: User does not exist.
  - 401 Unauthorized: Missing or invalid token.


## Notes

- Passwords are securely hashed.
- Authentication uses JWT.
- Service/Repository-based architecture.

---

> For questions, contact Javier Alonso Gallego.
