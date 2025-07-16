// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

// Task Types
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

// Auth Response
export interface AuthResponse {
  token: string;
}
