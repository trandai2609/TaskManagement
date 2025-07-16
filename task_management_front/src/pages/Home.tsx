import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from 'components/users/Auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';

const Home: React.FC = () => {
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

export default Home;
