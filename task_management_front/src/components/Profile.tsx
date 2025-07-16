import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className='profile-container container py-5'>
      <div className='card p-4 shadow-sm mx-auto' style={{ maxWidth: 600 }}>
        <h2 className='profile-title text-danger text-center mb-4'>Profile</h2>
        <div className='mb-2'>
          <strong>Name:</strong> {user.name || '-'}
        </div>
        <div className='mb-2'>
          <strong>Email:</strong> {user.email}
        </div>
        <div className='mb-2'>
          <strong>Joined:</strong> {user.created_at}
        </div>
      </div>
    </div>
  );
};

export default Profile;
