
---

# API Documentation

## Overview

This document provides details on how to interact with the API endpoints of this project. It includes information on URL paths, request headers, and bodies required for each endpoint.

## Base URL

For local development, the base URL is:

```
http://localhost:5000/api
```

## Authentication Headers

For endpoints that require authentication, include the following header in your requests:

```plaintext
Authorization: Bearer <your_jwt_token>
```

Replace `<your_jwt_token>` with the actual JWT token obtained from the login process.

---

## Endpoints

### User Authentication

#### Register a New User

- **URL**: `/auth/register`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```

- **Success Response**:
  - **Code**: 201
  - **Content**:

    ```json
    {
      "message": "Email verification token sent to email."
    }
    ```

- **Error Response**:
  - **Code**: 500
  - **Content**:

    ```json
    {
      "message": "Error message"
    }
    ```

#### Verify Email

- **URL**: `/auth/verify/:token`
- **Method**: `GET`
- **URL Params**:
  - `token` (string): The email verification token

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    {
      "message": "Email verified"
    }
    ```

- **Error Response**:
  - **Code**: 400
  - **Content**:

    ```json
    {
      "message": "Invalid or expired token"
    }
    ```

#### Log In

- **URL**: `/auth/login`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    {
      "token": "<your_jwt_token>"
    }
    ```

- **Error Response**:
  - **Code**: 400
  - **Content**:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

#### Log Out

- **URL**: `/auth/logout`
- **Method**: `POST`
- **Headers**:

  ```plaintext
  Authorization: Bearer <your_jwt_token>
  ```

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    {
      "message": "Logged out successfully"
    }
    ```

#### Forgot Password

- **URL**: `/auth/forgot-password`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "email": "user@example.com"
  }
  ```

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    {
      "message": "Password reset token sent to email."
    }
    ```

#### Reset Password

- **URL**: `/auth/reset-password`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "token": "<reset_token>",
    "newPassword": "newpassword"
  }
  ```

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    {
      "message": "Password reset successfully"
    }
    ```

- **Error Response**:
  - **Code**: 404
  - **Content**:

    ```json
    {
      "message": "User not found"
    }
    ```

---

### YouTube URLs

#### Get All YouTube URLs

- **URL**: `/youtube/allurls`
- **Method**: `GET`

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    [
      {
        "_id": "url_id",
        "email": "user@example.com",
        "url": "https://www.youtube.com/watch?v=example",
        "createdAt": "2024-09-09T00:00:00.000Z"
      }
    ]
    ```

- **Error Response**:
  - **Code**: 500
  - **Content**:

    ```json
    {
      "message": "Server error"
    }
    ```

#### Create a New YouTube URL

- **URL**: `/youtube`
- **Method**: `POST`
- **Headers**:

  ```plaintext
  Authorization: Bearer <your_jwt_token>
  ```

- **Request Body**:

  ```json
  {
    "url": "https://www.youtube.com/watch?v=example"
  }
  ```

- **Success Response**:
  - **Code**: 201
  - **Content**:

    ```json
    {
      "_id": "url_id",
      "email": "user@example.com",
      "url": "https://www.youtube.com/watch?v=example",
      "createdAt": "2024-09-09T00:00:00.000Z"
    }
    ```

- **Error Response**:
  - **Code**: 400
  - **Content**:

    ```json
    {
      "message": "YouTube URL is required"
    }
    ```

#### Get User's YouTube URLs

- **URL**: `/youtube`
- **Method**: `GET`
- **Headers**:

  ```plaintext
  Authorization: Bearer <your_jwt_token>
  ```

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    [
      {
        "_id": "url_id",
        "email": "user@example.com",
        "url": "https://www.youtube.com/watch?v=example",
        "createdAt": "2024-09-09T00:00:00.000Z"
      }
    ]
    ```

#### Update a YouTube URL

- **URL**: `/youtube/:id`
- **Method**: `PUT`
- **Headers**:

  ```plaintext
  Authorization: Bearer <your_jwt_token>
  ```

- **URL Params**:
  - `id` (string): The ID of the YouTube URL to update

- **Request Body**:

  ```json
  {
    "url": "https://www.youtube.com/watch?v=new_example"
  }
  ```

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    {
      "_id": "url_id",
      "email": "user@example.com",
      "url": "https://www.youtube.com/watch?v=new_example",
      "createdAt": "2024-09-09T00:00:00.000Z"
    }
    ```

- **Error Response**:
  - **Code**: 404
  - **Content**:

    ```json
    {
      "message": "YouTube URL not found or unauthorized"
    }
    ```

#### Delete a YouTube URL

- **URL**: `/youtube/:id`
- **Method**: `DELETE`
- **Headers**:

  ```plaintext
  Authorization: Bearer <your_jwt_token>
  ```

- **URL Params**:
  - `id` (string): The ID of the YouTube URL to delete

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    {
      "message": "YouTube URL deleted successfully"
    }
    ```

- **Error Response**:
  - **Code**: 404
  - **Content**:

    ```json
    {
      "message": "YouTube URL not found or unauthorized"
    }
    ```

---

### Programs

#### Get All Programs

- **URL**: `/programs/allprograms`
- **Method**: `GET`

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    [
      {
        "_id": "program_id",
        "email": "user@example.com",
        "title": "Program Title",
        "description": "Program description",
        "price": 100,
        "createdAt": "2024-09-09T00:00:00.000Z"
      }
    ]
    ```

- **Error Response**:
  - **Code**: 500
  - **Content**:

    ```json
    {
      "message": "Server error"
    }
    ```

#### Create a New Program

- **URL**: `/programs`
- **Method**: `POST`
- **Headers**:

  ```plaintext
  Authorization: Bearer <your_jwt_token>
  ```

- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "title": "New Program",
    "description": "This is a program description",
    "price": 100
  }
  ```

- **Success Response**:
  - **Code**: 201
  - **

Content**:

    ```json
    {
      "_id": "program_id",
      "email": "user@example.com",
      "title": "New Program",
      "description": "This is a program description",
      "price": 100,
      "createdAt": "2024-09-09T00:00:00.000Z"
    }
    ```

- **Error Response**:
  - **Code**: 400
  - **Content**:

    ```json
    {
      "message": "All fields are required"
    }
    ```

#### Get User's Programs

- **URL**: `/programs`
- **Method**: `GET`
- **Headers**:

  ```plaintext
  Authorization: Bearer <your_jwt_token>
  ```

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    [
      {
        "_id": "program_id",
        "email": "user@example.com",
        "title": "Program Title",
        "description": "Program description",
        "price": 100,
        "createdAt": "2024-09-09T00:00:00.000Z"
      }
    ]
    ```

#### Update a Program

- **URL**: `/programs/:id`
- **Method**: `PUT`
- **Headers**:

  ```plaintext
  Authorization: Bearer <your_jwt_token>
  ```

- **URL Params**:
  - `id` (string): The ID of the program to update

- **Request Body**:

  ```json
  {
    "title": "Updated Program Title",
    "description": "Updated program description",
    "price": 150
  }
  ```

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    {
      "_id": "program_id",
      "email": "user@example.com",
      "title": "Updated Program Title",
      "description": "Updated program description",
      "price": 150,
      "createdAt": "2024-09-09T00:00:00.000Z"
    }
    ```

- **Error Response**:
  - **Code**: 404
  - **Content**:

    ```json
    {
      "message": "Program not found or unauthorized"
    }
    ```

#### Delete a Program

- **URL**: `/programs/:id`
- **Method**: `DELETE`
- **Headers**:

  ```plaintext
  Authorization: Bearer <your_jwt_token>
  ```

- **URL Params**:
  - `id` (string): The ID of the program to delete

- **Success Response**:
  - **Code**: 200
  - **Content**:

    ```json
    {
      "message": "Program deleted successfully"
    }
    ```

- **Error Response**:
  - **Code**: 404
  - **Content**:

    ```json
    {
      "message": "Program not found or unauthorized"
    }
    ```

---

