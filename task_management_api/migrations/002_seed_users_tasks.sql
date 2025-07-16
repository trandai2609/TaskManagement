-- Insert default priorities
INSERT INTO priorities (name, level) VALUES
  ('Low', 1),
  ('Medium', 2),
  ('High', 3)
ON CONFLICT (name) DO NOTHING;

-- Seed data for users and tasks
INSERT INTO users (email, password_hash, name)
VALUES
  ('alice@example.com', '$2b$10$GcAJjSrRDKvmGwciTazFq.ptcLwuTtjnrI2xlIaUEBDqGRYGIXl8q', 'Alice'),
  ('bob@example.com', '$2b$10$GcAJjSrRDKvmGwciTazFq.ptcLwuTtjnrI2xlIaUEBDqGRYGIXl8q', 'Bob');

INSERT INTO tasks (title, description, status, user_id, priority_id)
SELECT 'Sample Task 1', 'This is a sample task for Alice.', 'Incomplete', u.id, 1
FROM users u WHERE u.email = 'alice@example.com';

INSERT INTO tasks (title, description, status, user_id, priority_id)
SELECT 'Sample Task 2', 'This is a sample task for Bob.', 'Incomplete', u.id, 2
FROM users u WHERE u.email = 'bob@example.com';
