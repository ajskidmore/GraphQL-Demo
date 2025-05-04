import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">Demo</Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          
          <Link to="/cart" className="nav-link cart-icon">
            Cart
            {getCartItemCount() > 0 && (
              <span className="cart-count">{getCartItemCount()}</span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <>
              <span className="nav-link">Welcome, {currentUser.name}</span>
              <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;