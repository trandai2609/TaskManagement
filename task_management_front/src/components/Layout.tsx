import React from 'react';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-light min-vh-100 d-flex flex-column">
    <Header />
    <main className="container flex-grow-1 pt-4">{children}</main>
  </div>
);

export default Layout;
