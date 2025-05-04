// backend/src/datasources/OrdersAPI.js
const { DataSource } = require('apollo-datasource');

class OrdersAPI extends DataSource {
  constructor() {
    super();
    // In-memory orders store for this example
    this.orders = [];
    this.nextOrderId = 1;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getOrders() {
    return this.orders;
  }

  async getOrderById(id) {
    return this.orders.find(order => order.id === id);
  }

  async getUserOrders(userId) {
    return this.orders.filter(order => order.userId === userId);
  }

  async createOrder(orderData) {
    const newOrder = {
      id: String(this.nextOrderId++),
      ...orderData,
      createdAt: new Date().toISOString()
    };
    this.orders.push(newOrder);
    return newOrder;
  }
}

module.exports = OrdersAPI;