import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';
import { Task } from '../types/models';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error?: string;
  fetchTasks: (params?: any) => Promise<void>;
  createTask: (data: Partial<Task>) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const fetchTasks = async (params?: any) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await api.get('/tasks', { params });
      setTasks(res.data);
    } catch (e: any) {
      setError(e.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data: Partial<Task>) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await api.post('/tasks', data);
      setTasks((prev) => [res.data, ...prev]); // Optimistic update
    } catch (e: any) {
      setError(e.response?.data?.error || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await api.patch(`/tasks/${id}`, data);
      setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch (e: any) {
      setError(e.response?.data?.error || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    setError(undefined);
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e: any) {
      setError(e.response?.data?.error || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
};
