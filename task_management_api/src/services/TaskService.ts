import { TaskRepository } from '../models/Task';

export class TaskService {
  constructor(private taskRepo: TaskRepository) {}

  async createTask(data: any) {
    // Validate required fields
    if (!data.title || !data.priority_id || !data.user_id) {
      throw new Error('Title, priority, and user are required');
    }
    // Validate due date (if present)
    if (data.due_date && isNaN(Date.parse(data.due_date))) {
      throw new Error('Invalid due date');
    }
    // Set default status
    data.status = data.status || 'Incomplete';
    return this.taskRepo.create(data);
  }

  async getTask(id: string) {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new Error('Task not found');
    return task;
  }

  async listTasks(filter: any) {
    return this.taskRepo.findAll(filter);
  }

  async updateTask(id: string, data: any) {
    if (data.due_date && isNaN(Date.parse(data.due_date))) {
      throw new Error('Invalid due date');
    }
    return this.taskRepo.update(id, data);
  }

  async deleteTask(id: string) {
    return this.taskRepo.delete(id);
  }

  async markComplete(id: string, complete: boolean) {
    return this.taskRepo.update(id, {
      status: complete ? 'Complete' : 'Incomplete',
    });
  }
}
