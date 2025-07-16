import bcrypt from 'bcrypt';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name?: string;
  created_at: Date;
}

export class UserRepository {
  constructor(private db: any) {}

  async create(user: {
    email: string;
    password: string;
    name?: string;
  }): Promise<User> {
    const hash = await bcrypt.hash(user.password, 10);
    const result = await this.db.query(
      'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, password_hash, name, created_at',
      [user.email, hash, user.name]
    );
    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    return result.rows[0] || null;
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    return result.rows[0] || null;
  }

  async update(
    id: string,
    data: Partial<Omit<User, 'id' | 'created_at'>>
  ): Promise<User | null> {
    const fields = [];
    const values = [];
    let idx = 1;
    for (const key in data) {
      fields.push(`${key} = $${idx++}`);
      values.push((data as any)[key]);
    }
    if (fields.length === 0) return this.findById(id);
    values.push(id);
    await this.db.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    );
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.db.query('DELETE FROM users WHERE id = $1', [id]);
  }
}
