import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';

const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      <div className="breadcrumbs" style={{ marginBottom: '2rem' }}>
        <Link to="/">Home</Link> / <Link to="/cart">Cart</Link> / Checkout
      </div>
      
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
      
      <div className="checkout-container" style={{ 
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CheckoutPage;