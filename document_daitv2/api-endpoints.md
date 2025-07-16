# REST API Endpoint Specifications for Task Management System

## Authentication

- POST /api/auth/register — Register a new user
- POST /api/auth/login — User login
- POST /api/auth/logout — User logout
- POST /api/auth/password-reset-request — Request password reset
- POST /api/auth/password-reset — Reset password

## User Management

- GET /api/users/me — Get current user profile
- PATCH /api/users/me — Update current user profile

## Task Management

- GET /api/tasks — List tasks (with filtering, search, and pagination)
- POST /api/tasks — Create a new task
- GET /api/tasks/{taskId} — Get task details
- PATCH /api/tasks/{taskId} — Update a task
- DELETE /api/tasks/{taskId} — Delete a task
- PATCH /api/tasks/{taskId}/complete — Mark task as complete/incomplete

## Categories

- GET /api/categories — List categories
- POST /api/categories — Create a category
- GET /api/categories/{categoryId} — Get category details
- PATCH /api/categories/{categoryId} — Update a category
- DELETE /api/categories/{categoryId} — Delete a category

## Priorities

- GET /api/priorities — List priorities

## Task Assignments

- POST /api/tasks/{taskId}/assign — Assign user(s) to a task
- DELETE /api/tasks/{taskId}/assign/{userId} — Remove user assignment from a task

---

All endpoints (except authentication) require JWT authentication. Filtering and search are supported via query parameters on GET /api/tasks.
