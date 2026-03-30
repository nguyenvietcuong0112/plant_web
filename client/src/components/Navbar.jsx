import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-logo">
          <span>🌿</span>
          <span>Plant Shop</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Trang chủ</Link>
          <Link to="/login" className="nav-link">Quản trị</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
