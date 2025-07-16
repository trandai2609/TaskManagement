import { UserService } from '../../src/services/UserService';
import { UserRepository } from '../../src/models/User';
import bcrypt from 'bcrypt';
jest.mock('bcrypt');

const mockRepo = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  beforeEach(() => {
    jest.clearAllMocks();
    service = new UserService(mockRepo as any as UserRepository);
  });

  it('should register a new user', async () => {
    mockRepo.findByEmail.mockResolvedValue(null);
    mockRepo.create.mockResolvedValue({
      id: '1',
      email: 'a@b.com',
      password_hash: 'hash',
    });
    const result = await service.register({
      email: 'a@b.com',
      password: 'pass',
    });
    expect(result).toHaveProperty('id');
  });

  it('should not register if email exists', async () => {
    mockRepo.findByEmail.mockResolvedValue({ id: '1' });
    await expect(
      service.register({ email: 'a@b.com', password: 'pass' })
    ).rejects.toThrow('Email already registered');
  });

  // ...more edge case tests...
});
