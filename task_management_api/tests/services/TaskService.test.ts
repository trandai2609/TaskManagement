import { TaskService } from '../../src/services/TaskService';
import { TaskRepository } from '../../src/models/Task';

const mockRepo = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('TaskService', () => {
  let service: TaskService;
  beforeEach(() => {
    jest.clearAllMocks();
    service = new TaskService(mockRepo as any as TaskRepository);
  });

  it('should create a task with valid data', async () => {
    mockRepo.create.mockResolvedValue({
      id: '1',
      title: 'Test',
      priority_id: 1,
      user_id: 'u1',
      status: 'Incomplete',
    });
    const result = await service.createTask({
      title: 'Test',
      priority_id: 1,
      user_id: 'u1',
    });
    expect(result).toHaveProperty('id');
  });

  it('should throw error for missing title', async () => {
    await expect(
      service.createTask({ priority_id: 1, user_id: 'u1' })
    ).rejects.toThrow('Title, priority, and user are required');
  });

  it('should throw error for invalid due date', async () => {
    await expect(
      service.createTask({
        title: 'Test',
        priority_id: 1,
        user_id: 'u1',
        due_date: 'invalid',
      })
    ).rejects.toThrow('Invalid due date');
  });

  // ...more edge case tests...
});
