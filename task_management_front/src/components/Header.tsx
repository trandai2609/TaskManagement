import { useAuth } from 'context/AuthContext';
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top'>
      <div className='container-fluid'>
        <div className='navbar-brand fw-bold text-primary'>
          {user && (
            <div>
              Wellcome: {user.name}
            </div>
          )}
        </div>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            {user ? (
              <>
                <li className='nav-item'>
                  <button
                    onClick={logout}
                    className='btn btn-danger btn-sm ms-2'
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/register' className='nav-link'>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
