export interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: Date;
  status: string;
  user_id: string;
  category_id?: string;
  priority_id: number;
  created_at: Date;
  updated_at: Date;
}

export class TaskRepository {
  constructor(private db: any) {}

  async create(
    task: Omit<Task, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Task> {
    const result = await this.db.query(
      `INSERT INTO tasks (title, description, due_date, status, user_id, category_id, priority_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        task.title,
        task.description,
        task.due_date,
        task.status,
        task.user_id,
        task.category_id,
        task.priority_id,
      ]
    );
    return result.rows[0];
  }

  async findById(id: string): Promise<Task | null> {
    const result = await this.db.query('SELECT * FROM tasks WHERE id = $1', [
      id,
    ]);
    return result.rows[0] || null;
  }

  async findAll(filter: any = {}): Promise<Task[]> {
    let query = 'SELECT * FROM tasks WHERE 1=1';
    const values = [];
    let idx = 1;
    if (filter.user_id) {
      query += ` AND user_id = $${idx}`;
      values.push(filter.user_id);
      idx++;
    }
    if (filter.status) {
      query += ` AND status = $${idx}`;
      values.push(filter.status);
      idx++;
    }
    if (filter.priority_id) {
      query += ` AND priority_id = $${idx}`;
      values.push(filter.priority_id);
      idx++;
    }
    if (filter.search) {
      query += ` AND (title ILIKE $${idx} OR description ILIKE $${idx})`;
      values.push(`%${filter.search}%`);
      idx++;
    }
    query += ' ORDER BY due_date ASC';
    const result = await this.db.query(query, values);
    return result.rows;
  }

  async update(
    id: string,
    data: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<Task | null> {
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
      `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    );
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.db.query('DELETE FROM tasks WHERE id = $1', [id]);
  }
}
