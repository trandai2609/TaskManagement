import React from 'react';
import Auth from './users/Auth';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const { register, loading, error } = useAuth();
  return (
    <div className='register-container container py-5'>
      <Auth
        onSubmit={({ email, password, name }) =>
          register(email, password, name ?? '')
        }
        loading={loading}
        error={error}
        isRegister
      />
    </div>
  );
};

export default Register;
