import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </div>
        
        <div className="copyright">
        <a href="https://ajskidmore.com" target="_blank" rel="noopener noreferrer">
  A.J. Skidmore
</a> | {currentYear}
        </div>
      </div>
    </footer>
  );
};

export default Footer;