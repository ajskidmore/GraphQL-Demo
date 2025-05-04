import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CHECKOUT } from '../../graphql/mutations';
import { useCart } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';

const CheckoutForm = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    shippingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit'
  });
  const [error, setError] = useState('');
  
  // Set up checkout mutation
  const [checkout, { loading }] = useMutation(CHECKOUT, {
    onCompleted: (data) => {
      // Clear the cart
      clearCart();
      
      // Navigate to the order confirmation page
      navigate(`/order-confirmation/${data.checkout.id}`);
    },
    onError: (error) => {
      setError(error.message || 'An error occurred during checkout');
    }
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.shippingAddress || !formData.city || !formData.state || 
        !formData.zipCode || !formData.country) {
      setError('Please fill in all address fields');
      return;
    }
    
    try {
      // Process checkout
      await checkout();
    } catch (err) {
      setError('Failed to process your order. Please try again.');
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div>
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart before checkout.</p>
      </div>
    );
  }
  
  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      
      <div className="checkout-summary" style={{ marginBottom: '2rem' }}>
        <h3>Order Summary</h3>
        
        <div className="checkout-items">
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item" style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span>{item.name} x {item.quantity}</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        
        <div className="checkout-total" style={{ 
          borderTop: '1px solid #eee', 
          paddingTop: '1rem',
          marginTop: '1rem',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Total:</span>
          <span>{formatCurrency(getCartTotal())}</span>
        </div>
      </div>
      
      {error && (
        <div className="form-error" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <h3>Shipping Information</h3>
        
        <div className="form-group">
          <label htmlFor="shippingAddress" className="form-label">Address</label>
          <input
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            className="form-input"
            value={formData.shippingAddress}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-input"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="state" className="form-label">State/Province</label>
            <input
              type="text"
              id="state"
              name="state"
              className="form-input"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="zipCode" className="form-label">ZIP/Postal Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              className="form-input"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="country" className="form-label">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              className="form-input"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <h3 style={{ marginTop: '1.5rem' }}>Payment Method</h3>
        
        <div className="form-group">
          <div className="radio-group">
            <div className="radio-option" style={{ marginBottom: '0.5rem' }}>
              <input
                type="radio"
                id="credit"
                name="paymentMethod"
                value="credit"
                checked={formData.paymentMethod === 'credit'}
                onChange={handleChange}
              />
              <label htmlFor="credit" style={{ marginLeft: '0.5rem' }}>Credit Card</label>
            </div>
            
            <div className="radio-option" style={{ marginBottom: '0.5rem' }}>
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={handleChange}
              />
              <label htmlFor="paypal" style={{ marginLeft: '0.5rem' }}>PayPal</label>
            </div>
          </div>
        </div>
        
        {formData.paymentMethod === 'credit' && (
          <div className="credit-card-details">
            <div className="form-group">
              <label htmlFor="cardNumber" className="form-label">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                className="form-input"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="expiry" className="form-label">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  className="form-input"
                  placeholder="MM/YY"
                  required
                />
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  className="form-input"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>
        )}
        
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '2rem' }}
          disabled={loading}
        >
          {loading ? 'Processing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;