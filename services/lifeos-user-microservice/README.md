# User Authentication API

## Table of Contents

1. [Authentication](#authentication)
2. [Authentication Controller](#authentication-controller)
   - [Register User](#register-user)
   - [Login User](#login-user)
3. [User Controller](#user-controller)
   - [Get User by ID](#get-user-by-id)
   - [Get User by Email](#get-user-by-email)
4. [Data Transfer Objects (DTOs)](#data-transfer-objects-dtos)
   - [UserDTO](#userdto)
   - [JwtTokenDTO](#jwttokendto)
   - [AuthRequestDTO](#authrequestdto)

## Authentication
This API uses Bearer token authentication for protected endpoints. To access protected endpoints, you must include the JWT token received during login in the Authorization header of your requests.

- Public endpoints (no authentication required):
  - POST `/auth/register`
  - POST `/auth/login`

- Protected endpoints (require Bearer token):
  - All other endpoints under `/user`

For protected endpoints, include the following header in your requests:
```
Authorization: Bearer <your_jwt_token>
```

## Authentication Controller

Base path: `/auth`

### Register User

- **Endpoint:** POST `/auth/register`
- **Authentication:** Public
- **Description:** Register a new user
- **Request Body:** AuthRequestDTO
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** 
  - Status: 201 Created
  - Body: User object

### Login User

- **Endpoint:** POST `/auth/login`
- **Authentication:** Public
- **Description:** Authenticate a user and receive a JWT token
- **Request Body:** AuthRequestDTO
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** 
  - Status: 200 OK
  - Body: JwtTokenDTO
  ```json
  {
    "token": "string",
    "type": "Bearer",
    "user": {
      "userId": "UUID",
      "name": "string",
      "email": "string",
      "knowledgeXp": "BigInteger"
    },
    "expiresIn": "string"
  }
  ```

## User Controller

Base path: `/user`

**Note:** All endpoints in this controller require authentication with a valid JWT token.

### Get User by ID

- **Endpoint:** GET `/user/{userId}`
- **Authentication:** Required (Bearer Token)
- **Description:** Retrieve user information by user ID
- **Path Parameter:** 
  - `userId` (UUID)
- **Header Parameter:**
  - `userId` (optional): ID of the requesting user
- **Response:**
  - Status: 200 OK
  - Body: UserDTO
  ```json
  {
    "userId": "UUID",
    "name": "string",
    "email": "string",
    "knowledgeXp": "BigInteger"
  }
  ```
  - Status: 404 Not Found
  - Body: "User not found"

### Get User by Email

- **Endpoint:** GET `/user/{email}`
- **Authentication:** Required (Bearer Token)
- **Description:** Retrieve user information by email
- **Path Parameter:**
  - `email` (string)
- **Header Parameter:**
  - `userId`: ID of the requesting user (required)
- **Response:**
  - Status: 200 OK
  - Body: UserDTO
  ```json
  {
    "userId": "UUID",
    "name": "string",
    "email": "string",
    "knowledgeXp": "BigInteger"
  }
  ```
  - Status: 404 Not Found
  - Body: "User not found"

## Data Transfer Objects (DTOs)

### UserDTO

- **Description:** Represents user information
- **Fields:**
  - `userId` (UUID)
  - `name` (string)
  - `email` (string)
  - `knowledgeXp` (BigInteger)

### JwtTokenDTO

- **Description:** Represents JWT token information
- **Fields:**
  - `token` (string)
  - `type` (string): Always "Bearer"
  - `user` (UserDTO)
  - `expiresIn` (string): Expiration time in minutes

### AuthRequestDTO

- **Description:** Represents authentication request data
- **Fields:**
  - `email` (string)
  - `password` (string)

## Notes

- All endpoints return appropriate HTTP status codes.
- The JWT token implementation is not complete, as indicated by the TODO comment for refresh token.
- Ensure to keep your JWT token secure and do not share it with unauthorized parties.