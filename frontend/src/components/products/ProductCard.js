import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };
  
  if (!product) return null;
  
  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        
      </Link>
      
      <div className="card-content">
        <h3 className="card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="card-price">{formatCurrency(product.price)}</div>
        
        <p className="card-description">
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description
          }
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={`/product/${product.id}`} className="btn btn-outlined">
            View Details
          </Link>
          
          <button 
            onClick={handleAddToCart} 
            className="btn btn-primary"
            disabled={product.inventory <= 0}
          >
            {product.inventory > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;