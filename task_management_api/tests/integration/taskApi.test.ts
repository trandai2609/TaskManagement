import request from 'supertest';
import app from '../../src/app'; // Assume you have an Express app export
import { db } from '../../src/config/db';

describe('Task API Integration', () => {
  let token: string;
  beforeAll(async () => {
    // Setup: create user and get token
    await db.query('DELETE FROM users');
    await db.query('DELETE FROM tasks');
    await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'test@a.com', password: 'Test1234!', name: 'Test' });
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test@a.com', password: 'Test1234!' });
    token = res.body.token;
  });

  afterAll(async () => {
    await db.query('DELETE FROM tasks');
    await db.query('DELETE FROM users');
    await db.pool.end();
  });

  it('should create a task', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Integration Task', priority_id: 1, user_id: '1' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  // ...more integration tests...
});
