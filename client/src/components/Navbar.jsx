import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-logo">
          🌿 Plant Shop
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Trang chủ</Link>
          <Link to="/contact" className="nav-link">Liên hệ</Link>
          {/* Link quản trị được ẩn đi */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
