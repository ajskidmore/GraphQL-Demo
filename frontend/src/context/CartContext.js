import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useAuth } from './AuthContext';

// GraphQL Mutations
const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity)
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation RemoveFromCart($productId: ID!) {
    removeFromCart(productId: $productId)
  }
`;

// Create Context
const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Set up GraphQL mutations
  const [addToCartMutation] = useMutation(ADD_TO_CART_MUTATION);
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART_MUTATION);

  // Load cart from local storage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart from storage:', error);
      }
    };
    
    loadCart();
  }, []);

  // Save cart to local storage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      setLoading(true);
      setError('');
      
      // If authenticated, update server cart
      if (isAuthenticated) {
        await addToCartMutation({
          variables: { productId: product.id, quantity }
        });
      }
      
      // Update local cart state
      setCartItems(prevItems => {
        // Check if product is already in cart
        const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
          // Update quantity if already in cart
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          return updatedItems;
        } else {
          // Add new item to cart
          return [...prevItems, { ...product, quantity }];
        }
      });
      
      return { success: true };
    } catch (error) {
      setError(error.message || 'Failed to add item to cart');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      setError('');
      
      // If authenticated, update server cart
      if (isAuthenticated) {
        await removeFromCartMutation({
          variables: { productId }
        });
      }
      
      // Update local cart state
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      
      return { success: true };
    } catch (error) {
      setError(error.message || 'Failed to remove item from cart');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      setError('');
      
      // If quantity is 0 or less, remove item
      if (quantity <= 0) {
        return removeFromCart(productId);
      }
      
      // If authenticated, update server cart
      if (isAuthenticated) {
        // First remove the item
        await removeFromCartMutation({
          variables: { productId }
        });
        
        // Then add it with new quantity
        const product = cartItems.find(item => item.id === productId);
        await addToCartMutation({
          variables: { productId, quantity }
        });
      }
      
      // Update local cart state
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === productId 
            ? { ...item, quantity } 
            : item
        )
      );
      
      return { success: true };
    } catch (error) {
      setError(error.message || 'Failed to update item quantity');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    );
  };

  // Calculate total items in cart
  const getCartItemCount = () => {
    return cartItems.reduce(
      (count, item) => count + item.quantity, 
      0
    );
  };

  // Context value
  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;