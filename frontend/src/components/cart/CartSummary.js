import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import formatCurrency from '../../utils/formatCurrency';

const CartSummary = () => {
  const { cartItems, getCartTotal, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  
  const handleQuantityChange = (productId, e) => {
    const quantity = parseInt(e.target.value);
    if (quantity >= 0) {
      updateQuantity(productId, quantity);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to see them here.</p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="cart-summary">
      <h2>Cart Summary</h2>
      
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img 
              src={item.imageUrl || 'https://via.placeholder.com/80x80?text=No+Image'} 
              alt={item.name} 
              className="cart-item-img"
            />
            
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>{formatCurrency(item.price)} each</p>
              <p>Total: {formatCurrency(item.price * item.quantity)}</p>
            </div>
            
            <div className="cart-item-actions">
              <div className="quantity-control" style={{ marginBottom: '0.5rem' }}>
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e)}
                  style={{ 
                    width: '60px', 
                    padding: '0.25rem',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginRight: '0.5rem'
                  }}
                />
              </div>
              
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="btn btn-accent"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-total">
        <span>Total:</span>
        <span>{formatCurrency(getCartTotal())}</span>
      </div>
      
      <div className="cart-actions" style={{ marginTop: '1.5rem' }}>
        <Link to="/" className="btn btn-outlined" style={{ marginRight: '1rem' }}>
          Continue Shopping
        </Link>
        
        {isAuthenticated ? (
          <Link to="/checkout" className="btn btn-primary">
            Proceed to Checkout
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login to Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartSummary;