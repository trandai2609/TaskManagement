# Database Schema Design for Task Management System

## Tables

### 1. users

- id (PK, UUID)
- email (unique, varchar)
- password_hash (varchar)
- name (varchar)
- created_at (timestamp)

### 2. categories

- id (PK, UUID)
- name (unique, varchar)
- description (varchar)

### 3. priorities

- id (PK, serial)
- name (unique, varchar) // e.g., Low, Medium, High
- level (int, unique) // e.g., 1=Low, 2=Medium, 3=High

### 4. tasks

- id (PK, UUID)
- title (varchar)
- description (text)
- due_date (date)
- status (varchar) // e.g., Incomplete, Complete
- user_id (FK, UUID, references users(id))
- category_id (FK, UUID, references categories(id))
- priority_id (FK, serial, references priorities(id))
- created_at (timestamp)
- updated_at (timestamp)

### 5. task_assignments

- id (PK, UUID)
- task_id (FK, UUID, references tasks(id))
- user_id (FK, UUID, references users(id))
- assigned_at (timestamp)

## Indexes

- users: email (unique)
- categories: name (unique)
- priorities: name (unique), level (unique)
- tasks: user_id, category_id, priority_id, due_date
- task_assignments: task_id, user_id

---

This schema supports user authentication, task categorization, priority management, and multi-user task assignments.
