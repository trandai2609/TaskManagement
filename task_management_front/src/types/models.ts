// Task Model
export interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  status: string;
  user_id: string;
  category_id?: string;
  priority_id: number;
  created_at: string;
  updated_at: string;
}

// User Model
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

// Context State
export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error?: string;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error?: string;
}
