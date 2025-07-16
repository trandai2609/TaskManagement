import React, { useEffect } from 'react';
import Auth from './users/Auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login, loading, error, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/tasks');
    }
  }, [user, navigate]);

  return (
    <div className='login-container container py-5'>
      <Auth
        onSubmit={({ email, password }) => login(email, password)}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Login;
