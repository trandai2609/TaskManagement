# API Request/Response Examples for Task Management System

## 1. User Registration

### Request

POST /api/auth/register

```json
{
  "email": "user@example.com",
  "password": "StrongPass123!",
  "name": "Jane Doe"
}
```

### Response (201)

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Jane Doe",
  "created_at": "2025-07-08T12:00:00Z"
}
```

## 2. User Login

### Request

POST /api/auth/login

```json
{
  "email": "user@example.com",
  "password": "StrongPass123!"
}
```

### Response (200)

```json
{
  "token": "jwt-token"
}
```

## 3. Create Task

### Request

POST /api/tasks

```json
{
  "title": "Finish project report",
  "description": "Complete the final report for the project.",
  "due_date": "2025-07-15",
  "priority_id": 2,
  "category_id": "uuid"
}
```

### Response (201)

```json
{
  "id": "uuid",
  "title": "Finish project report",
  "description": "Complete the final report for the project.",
  "due_date": "2025-07-15",
  "priority_id": 2,
  "category_id": "uuid",
  "status": "Incomplete",
  "created_at": "2025-07-08T12:00:00Z"
}
```

## 4. Error Example (Invalid Login)

### Request

POST /api/auth/login

```json
{
  "email": "user@example.com",
  "password": "wrongpassword"
}
```

### Response (401)

```json
{
  "error": "Invalid email or password."
}
```

## 5. Update Task

### Request

PATCH /api/tasks/uuid

```json
{
  "status": "Complete"
}
```

### Response (200)

```json
{
  "id": "uuid",
  "status": "Complete",
  "updated_at": "2025-07-08T13:00:00Z"
}
```
