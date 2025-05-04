// backend/src/schema/resolvers.js
const products = require('../seedData/products'); // Import products directly for fallback

module.exports = {
  Query: {
    // Product resolvers
    products: async (_, __, { dataSources }) => {
      try {
        // Try to get products from the datasource
        if (dataSources && dataSources.productsAPI && dataSources.productsAPI.getProducts) {
          return await dataSources.productsAPI.getProducts();
        } else {
          // Fallback to using products from seed data directly
          console.log('Using fallback products data');
          return products;
        }
      } catch (error) {
        console.error('Error in products resolver:', error);
        // Return empty array instead of throwing to prevent 500 error
        return [];
      }
    },
    product: async (_, { id }, { dataSources }) => {
      try {
        if (dataSources && dataSources.productsAPI && dataSources.productsAPI.getProductById) {
          return await dataSources.productsAPI.getProductById(id);
        } else {
          // Fallback to using products from seed data directly
          const product = products.find(p => p.id === id);
          return product || null;
        }
      } catch (error) {
        console.error(`Error in product resolver for id ${id}:`, error);
        return null;
      }
    },
    
    // User resolvers
    users: async (_, __, { dataSources }) => {
      try {
        return await dataSources.usersAPI.getUsers();
      } catch (error) {
        console.error('Error in users resolver:', error);
        return [];
      }
    },
    user: async (_, { id }, { dataSources }) => {
      try {
        return await dataSources.usersAPI.getUserById(id);
      } catch (error) {
        console.error(`Error in user resolver for id ${id}:`, error);
        return null;
      }
    },
    
    // Order resolvers
    orders: async (_, __, { dataSources }) => {
      try {
        return await dataSources.ordersAPI.getOrders();
      } catch (error) {
        console.error('Error in orders resolver:', error);
        return [];
      }
    },
    order: async (_, { id }, { dataSources }) => {
      try {
        return await dataSources.ordersAPI.getOrderById(id);
      } catch (error) {
        console.error(`Error in order resolver for id ${id}:`, error);
        return null;
      }
    },
    userOrders: async (_, { userId }, { dataSources }) => {
      try {
        return await dataSources.ordersAPI.getUserOrders(userId);
      } catch (error) {
        console.error(`Error in userOrders resolver for userId ${userId}:`, error);
        return [];
      }
    }
  },
  
  Mutation: {
    createOrder: async (_, { order }, { dataSources }) => {
      try {
        return await dataSources.ordersAPI.createOrder(order);
      } catch (error) {
        console.error('Error in createOrder mutation:', error);
        throw error;
      }
    },
    updateOrderStatus: async (_, { id, status }, { dataSources }) => {
      try {
        const order = await dataSources.ordersAPI.getOrderById(id);
        if (!order) {
          throw new Error(`Order with id ${id} not found`);
        }
        order.status = status;
        return order;
      } catch (error) {
        console.error(`Error in updateOrderStatus mutation for id ${id}:`, error);
        throw error;
      }
    }
  }
};