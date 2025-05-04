import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="breadcrumbs" style={{ marginBottom: '2rem' }}>
        <Link to="/">Home</Link> / Login
      </div>
      
      <div className="auth-container" style={{ 
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;