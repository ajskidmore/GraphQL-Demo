import React from 'react';
import { Link } from 'react-router-dom';
import ProductDetail from '../components/products/ProductDetail';

const ProductPage = () => {
  return (
    <div className="product-page">
      <div className="breadcrumbs" style={{ marginBottom: '2rem' }}>
        <Link to="/">Home</Link> / Product Details
      </div>
      
      <ProductDetail />
    </div>
  );
};

export default ProductPage;