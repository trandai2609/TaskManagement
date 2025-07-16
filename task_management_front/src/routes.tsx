import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';
import Profile from './components/Profile';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  if (loading) return <div className='text-center py-5'>Loading...</div>;
  if (!user) return <Navigate to='/login' replace />;
  return <>{children}</>;
};

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route
      path='/tasks'
      element={
        <ProtectedRoute>
          <Tasks />
        </ProtectedRoute>
      }
    />
    <Route
      path='/profile'
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route path='*' element={<Navigate to='/' />} />
  </Routes>
);

export default function AppRouter() {
  return <AppRoutes />;
}
