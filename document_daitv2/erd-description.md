# ERD Description for Task Management System

## Entities and Relationships

### 1. users

- Represents users of the system.
- Each user can create multiple tasks.
- Each user can be assigned to multiple tasks (via task_assignments).

### 2. categories

- Represents categories for organizing tasks (e.g., Work, Personal).
- Each category can have multiple tasks.

### 3. priorities

- Represents priority levels (e.g., Low, Medium, High).
- Each priority can be assigned to multiple tasks.

### 4. tasks

- Represents individual tasks.
- Each task is created by a user (user_id).
- Each task belongs to a category (category_id).
- Each task has a priority (priority_id).
- Each task can have multiple users assigned (via task_assignments).

### 5. task_assignments

- Represents the assignment of users to tasks (many-to-many relationship).
- Each record links a user to a task.

## Relationships

- users (1) --- (M) tasks: A user can create many tasks.
- users (1) --- (M) task_assignments: A user can be assigned to many tasks.
- tasks (1) --- (M) task_assignments: A task can have many assigned users.
- categories (1) --- (M) tasks: A category can have many tasks.
- priorities (1) --- (M) tasks: A priority can be assigned to many tasks.

---

This ERD structure supports user management, task categorization, priority levels, and collaborative task assignments.
