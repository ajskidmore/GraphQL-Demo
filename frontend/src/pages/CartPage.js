import React from 'react';
import { Link } from 'react-router-dom';
import CartSummary from '../components/cart/CartSummary';

const CartPage = () => {
  return (
    <div className="cart-page">
      <div className="breadcrumbs" style={{ marginBottom: '2rem' }}>
        <Link to="/">Home</Link> / Shopping Cart
      </div>
      
      <h1 style={{ marginBottom: '2rem' }}>Your Shopping Cart</h1>
      
      <CartSummary />
    </div>
  );
};

export default CartPage;