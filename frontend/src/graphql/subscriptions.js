import { gql } from '@apollo/client';

// Note: The backend doesn't have subscriptions implemented yet
// These are placeholders for future implementation

// Order status updates subscription
export const ORDER_STATUS_UPDATED = gql`
  subscription OrderStatusUpdated($orderId: ID!) {
    orderStatusUpdated(orderId: $orderId) {
      id
      status
      updatedAt
    }
  }
`;

// Product inventory updates subscription
export const PRODUCT_INVENTORY_UPDATED = gql`
  subscription ProductInventoryUpdated($productId: ID!) {
    productInventoryUpdated(productId: $productId) {
      id
      inventory
    }
  }
`;