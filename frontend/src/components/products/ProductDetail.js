import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_PRODUCT } from '../../graphql/queries';
import { useCart } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Fetch product data
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id }
  });
  
  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product?.inventory) {
      setQuantity(value);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };
  
  // Loading state
  if (loading) {
    return <div>Loading product details...</div>;
  }
  
  // Error state
  if (error) {
    return <div>Error loading product: {error.message}</div>;
  }
  
  // Extract product data
  const product = data?.product;
  
  // Product not found
  if (!product) {
    return <div>Product not found</div>;
  }
  
  return (
    <div className="product-detail">
    
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h1 className="product-title">{product.name}</h1>
        <div className="product-price">{formatCurrency(product.price)}</div>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-inventory">
          {product.inventory > 0 ? (
            <span className="in-stock">In Stock ({product.inventory} available)</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>
        
        {product.inventory > 0 && (
          <div className="product-actions">
            <div className="quantity-selector" style={{ marginBottom: '1rem' }}>
              <label htmlFor="quantity" style={{ marginRight: '0.5rem' }}>Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.inventory}
                value={quantity}
                onChange={handleQuantityChange}
                style={{ 
                  width: '60px', 
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
            
            <button 
              onClick={handleAddToCart} 
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;