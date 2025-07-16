import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/db';
import { config } from '../config';
import { validatePassword } from '../middlewares/passwordValidation';

const router = Router();

// Registration
router.post(
  '/register',
  validatePassword,
  async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
      const userExists = await db.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );
      if (userExists.rows.length > 0) {
        return res.status(409).json({ error: 'Email already registered' });
      }
      const hash = await bcrypt.hash(password, 10);
      const result = await db.query(
        'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
        [email, hash, name]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
);

// Login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const user = await db.query(
      'SELECT id, email, password_hash, name FROM users WHERE email = $1',
      [email]
    );
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const valid = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      config.jwt.secret as string,
      { expiresIn: '1d' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
