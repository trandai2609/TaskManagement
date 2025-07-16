import { db } from '../../src/config/db';

export async function resetDatabase() {
  await db.query('DELETE FROM tasks');
  await db.query('DELETE FROM users');
}

export const testUser = {
  email: 'test@a.com',
  password: 'Test1234!',
  name: 'Test User',
};

export const testTask = {
  title: 'Test Task',
  priority_id: 1,
  user_id: '1',
};
