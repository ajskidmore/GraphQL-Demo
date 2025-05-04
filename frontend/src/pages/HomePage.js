import React from 'react';
import ProductList from '../components/products/ProductList';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section" style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://via.placeholder.com/1200x400)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '4rem 2rem',
        marginBottom: '3rem',
        borderRadius: '8px'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>GraphQL Ecommerce Demo</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
          Take a look around!
        </p>
      </div>
      
      <h2 style={{ marginBottom: '2rem' }}>Our Products</h2>
      <ProductList />
    </div>
  );
};

export default HomePage;