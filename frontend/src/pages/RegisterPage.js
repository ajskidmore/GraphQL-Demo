import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="breadcrumbs" style={{ marginBottom: '2rem' }}>
        <Link to="/">Home</Link> / Register
      </div>
      
      <div className="auth-container" style={{ 
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;