# Charity Minds API Specification

This document covers the HTTP endpoints currently implemented in the Express server located in `src/server.js`. All paths below assume the {{NODE_ENV}} base URL {{BASE_URL}}.

## General Behavior

- **Content type**: Requests and responses are JSON unless otherwise noted.
- **CORS**: All origins are allowed with credentials.
- **Error format**: Errors return a JSON body that includes at least a `message` field and, when relevant, a `success` boolean.
- **404 handling**: Any unmatched path responds with `404 Not Found` and `{ "message": "Not found" }`.

## Authentication

- Auth is cookie-based. Successful login sets an HTTP-only cookie named via `process.env.AUTH_COOKIE_NAME`.
- The JWT stores the user object (`{ user: { _id } }`) and is valid for 24 hours.
- Protected routes verify the cookie using `process.env.JWT_SECRET` and expose the authenticated user id as `req.userId`.

## Endpoints

### Root

| Method | Path | Auth | Description                                                             |
| ------ | ---- | ---- | ----------------------------------------------------------------------- |
| GET    | `/`  | None | Returns `{ "message": "Silence is golden" }`. Useful as a health probe. |

### API v1 (`/api/v1`)

#### GET `/api/v1/`

- **Auth**: None
- **Response**: `200 OK`, plain text `"Hello from v1"`

#### POST `/api/v1/auth/register`

- **Auth**: None
- **Request body**:
  - `firstName`, `lastName`, `username`, `email`, `phone`, `dob`, `gender`, `password`, `confirmPassword` – all required strings. Password and confirmPassword must match, and email must pass a basic regex check.
- **Success**: `201 Created`
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "user": {
      "_id": "...",
      "firstName": "...",
      "lastName": "...",
      "username": "...",
      "email": "...",
      "phone": "...",
      "dob": "...",
      "gender": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```
  The `password` field is removed from the returned user object.
- **Failure cases**:
  - `400 Bad Request` with `{ "success": false, "message": "<validation error>" }` when validation fails.
  - `500 Internal Server Error` with `{ "success": false, "message": "Something went wrong" }` for database or unexpected issues.

#### POST `/api/v1/auth/login`

- **Auth**: None
- **Request body**: `{ "email": "string", "password": "string" }`
- **Behavior**: Looks up the user by email, verifies the password via bcrypt, and sets the auth cookie.
- **Success**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Login Successful"
  }
  ```
- **Failure**: `400 Bad Request` with `{ "success": false, "message": "Incorrect credentials" }` when the user is not found or the password does not match.

#### DELETE `/api/v1/auth/logout`

- **Auth**: Requires valid auth cookie to have been previously set, but the route will still respond even if the cookie is missing.
- **Behavior**: Clears the auth cookie named by `process.env.AUTH_COOKIE_NAME`.
- **Success**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Logout Successful"
  }
  ```

#### GET `/api/v1/users`

- **Auth**: None (defined before the `requiresAuthentication` middleware).
- **Response**: `200 OK`
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "...",
        "firstName": "...",
        "lastName": "...",
        "username": "...",
        "email": "...",
        "phone": "...",
        "dob": "...",
        "gender": "...",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
  }
  ```
  Password hashes are excluded via `.select("-password")`.

#### GET `/api/v1/protected`

- **Auth**: Required. The `requiresAuthentication` middleware must validate the JWT cookie.
- **Success**: `200 OK`
  ```json
  {
    "message": "This is a protected route"
  }
  ```
- **Unauthorized**: `401 Unauthorized` with `{ "message": "You are not authenticated." }` if the cookie is missing or invalid.

### API v2 (`/api/v2`)

#### GET `/api/v2/`

- **Auth**: None
- **Response**: `200 OK`, plain text `"Hello from v2"`

## Environment Variables of Note

- `AUTH_COOKIE_NAME`: Name of the HTTP-only cookie that stores the JWT.
- `JWT_SECRET`: Secret key used to sign and verify JWTs.
- `NODE_ENV`: Controls whether the auth cookie is marked `secure`.
- MongoDB configuration is handled inside `src/database/connect-database.js` via other environment variables (e.g., connection string).

## Future Considerations

- Expand request validation for login (`validateUserLogin`) beyond the placeholder.
- Document forthcoming v2 endpoints as they are implemented.
