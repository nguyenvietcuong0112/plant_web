import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoHome from '../assets/logo_home.png';
import logoGreen from '../assets/logo_green.png';

const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${transparent ? 'navbar-transparent' : ''}`}>
      <div className="container">
        <Link to="/" className="nav-logo">
          <img src={transparent ? logoHome : logoGreen} alt="Tiệm Cây Bình An" className="logo-img" />
          <div className="logo-text">
            <span>Tiệm cây</span>
            <span>Bình An</span>
          </div>
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
