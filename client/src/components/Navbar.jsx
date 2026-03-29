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
          <Link to="/">Home</Link>
          {/* Admin link hidden from users */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
