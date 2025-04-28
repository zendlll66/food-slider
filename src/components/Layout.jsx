// components/Layout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* <nav className="p-4 bg-gray-200">
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav> */}
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
