import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isHome && !scrolled ? 'navbar-transparent' : ''}`}>
      <div className="container">
        <Link to="/" className="nav-logo">
          <div className="logo-circle">
            <span style={{ color: 'var(--primary)', fontSize: '0.6rem' }}>●</span>
          </div>
          Logo
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Trang chủ</Link>
          <Link to="/contact" className="nav-link">Liên hệ</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
