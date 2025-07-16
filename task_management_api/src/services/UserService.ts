import { UserRepository } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export class UserService {
  constructor(private userRepo: UserRepository) {}

  async register(data: { email: string; password: string; name?: string }) {
    // Validate email and password
    if (!data.email || !data.password)
      throw new Error('Email and password required');
    // Check if user exists
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) throw new Error('Email already registered');
    return this.userRepo.create(data);
  }

  async authenticate(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid email or password');
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new Error('Invalid email or password');
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwt.secret as string,
      { expiresIn: '1d' }
    );
    return { token };
    
  }

  async getProfile(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateProfile(id: string, data: any) {
    return this.userRepo.update(id, data);
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('User not found');
    const hash = await bcrypt.hash(newPassword, 10);
    return this.userRepo.update(user.id, { password_hash: hash });
  }
}
