import express from 'express';
import { TaskController } from '../controllers/TaskController';
import { UserController } from '../controllers/UserController';
import { TaskService } from '../services/TaskService';
import { UserService } from '../services/UserService';
import { TaskRepository } from '../models/Task';
import { UserRepository } from '../models/User';
import { db } from '../config/db';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { authRateLimiter, securityHeaders } from '../middlewares/security';

const router = express.Router();

// Instantiate repositories and services
const taskRepo = new TaskRepository(db);
const userRepo = new UserRepository(db);
const taskService = new TaskController(new TaskService(taskRepo));
const userService = new UserController(new UserService(userRepo));

// Security headers
router.use(securityHeaders);

// API versioning
const api = express.Router();

// Auth routes
api.post('/auth/register', authRateLimiter, (req, res, next) =>
  userService.register(req, res, next)
);
api.post('/auth/login', authRateLimiter, (req, res, next) =>
  userService.login(req, res, next)
);
api.post('/auth/reset-password', (req, res, next) =>
  userService.resetPassword(req, res, next)
);

// User profile (protected)
api.get('/users/me', authenticateJWT, (req, res, next) =>
  userService.getProfile(req, res, next)
);
api.patch('/users/me', authenticateJWT, (req, res, next) =>
  userService.updateProfile(req, res, next)
);

// Task routes (protected)
api.get('/tasks', authenticateJWT, (req, res, next) =>
  taskService.listTasks(req, res, next)
);
api.post('/tasks', authenticateJWT, (req, res, next) =>
  taskService.createTask(req, res, next)
);
api.get('/tasks/:id', authenticateJWT, (req, res, next) =>
  taskService.getTask(req, res, next)
);
api.patch('/tasks/:id', authenticateJWT, (req, res, next) =>
  taskService.updateTask(req, res, next)
);
api.delete('/tasks/:id', authenticateJWT, (req, res, next) =>
  taskService.deleteTask(req, res, next)
);
api.patch('/tasks/:id/complete', authenticateJWT, (req, res, next) =>
  taskService.markComplete(req, res, next)
);

// Mount versioned API
router.use('/api/v1', api);

export default router;
