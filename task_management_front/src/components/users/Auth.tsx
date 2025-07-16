import React, { useState } from 'react';

interface AuthFormProps {
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  loading?: boolean;
  error?: string;
  isRegister?: boolean;
}

const Auth: React.FC<AuthFormProps> = ({
  onSubmit,
  loading,
  error,
  isRegister,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isRegister && !name)) {
      setFormError('All fields are required');
      return;
    }
    setFormError('');
    onSubmit({ email, password, name: isRegister ? name : undefined });
  };

  return (
    <form
      className='bg-white p-4 rounded shadow-sm mx-auto border needs-validation'
      style={{ maxWidth: 400 }}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className='text-center mb-4 fw-bold'>
        {isRegister ? 'Register' : 'Login'}
      </h2>
      {formError && (
        <div className='alert alert-danger py-2 mb-2'>{formError}</div>
      )}
      {error && <div className='alert alert-danger py-2 mb-2'>{error}</div>}
      {isRegister && (
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}
      <div className='mb-3'>
        <label className='form-label'>Email</label>
        <input
          className='form-control'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='mb-4'>
        <label className='form-label'>Password</label>
        <input
          className='form-control'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        className='btn btn-primary w-100'
        type='submit'
        disabled={loading}
      >
        {loading
          ? isRegister
            ? 'Registering...'
            : 'Logging in...'
          : isRegister
          ? 'Register'
          : 'Login'}
      </button>
    </form>
  );
};

export default Auth;
