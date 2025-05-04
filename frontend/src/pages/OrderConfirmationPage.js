// frontend/src/pages/OrderConfirmationPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ORDER } from '../graphql/queries';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: { id: orderId },
    // Skip the query if there's no orderId
    skip: !orderId
  });

  if (!orderId) {
    return (
      <div className="order-confirmation">
        <h1>Order Confirmation</h1>
        <p>No order information available. Please check your order details.</p>
      </div>
    );
  }

  if (loading) return <p>Loading order details...</p>;
  
  if (error) {
    console.error('Error fetching order:', error);
    return (
      <div className="order-confirmation">
        <h1>Order Confirmation</h1>
        <p>Error loading order details. Please try again later.</p>
        <p>Details: {error.message}</p>
      </div>
    );
  }

  // If no data or order not found
  if (!data || !data.order) {
    return (
      <div className="order-confirmation">
        <h1>Order Confirmation</h1>
        <p>Order not found. Please check your order ID.</p>
      </div>
    );
  }

  const { order } = data;

  return (
    <div className="order-confirmation">
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed.</p>
      
      <div className="order-details">
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      </div>
      
      <div className="order-items">
        <h2>Items</h2>
        <ul>
          {order.products.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      
      <p>A confirmation email has been sent to your email address.</p>
    </div>
  );
};

export default OrderConfirmationPage;