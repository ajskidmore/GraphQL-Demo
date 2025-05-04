// frontend/src/components/products/ProductList.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading products...</p>;
  
  // Add detailed error logging to help debug
  if (error) {
    console.error('Error fetching products:', error);
    return (
      <div>
        <p>Error loading products. Please try again later.</p>
        <p>Details: {error.message}</p>
      </div>
    );
  }

  // Add a safety check for the data
  if (!data || !data.products) {
    console.warn('No products data returned from query');
    return <p>No products available.</p>;
  }

  console.log('Products data:', data.products);

  return (
    <div className="product-grid">
      {data.products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        data.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;