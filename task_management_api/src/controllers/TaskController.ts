import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  constructor(private taskService: TaskService) {}

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  };

  getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.getTask(req.params.id);
      res.json(task);
    } catch (err) {
      next(err);
    }
  };

  listTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await this.taskService.listTasks(req.query);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  };

  updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.updateTask(req.params.id, req.body);
      res.json(task);
    } catch (err) {
      next(err);
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.taskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  markComplete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.markComplete(
        req.params.id,
        req.body.complete
      );
      res.json(task);
    } catch (err) {
      next(err);
    }
  };
}
