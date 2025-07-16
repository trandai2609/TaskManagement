import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { User, AuthResponse } from '../types/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error?: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      api
        .get('/users/me')
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      const userRes = await api.get<User>('/users/me');
      setUser(userRes.data);
      navigate('/tasks');
    } catch (e: any) {
      setError(e.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(undefined);
    try {
      await api.post('/auth/register', { email, password, name });
      await login(email, password);
    } catch (e: any) {
      setError(e.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, error, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
