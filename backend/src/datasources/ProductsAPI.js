// backend/src/datasources/ProductsAPI.js
const { DataSource } = require('apollo-datasource');
const products = require('../seedData/products');

class ProductsAPI extends DataSource {
  constructor() {
    super();
    this.products = products;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getProducts() {
    // Add logging to help with debugging
    console.log(`Returning ${this.products.length} products`);
    return this.products;
  }

  async getProductById(id) {
    const product = this.products.find(p => p.id === id);
    console.log(`Fetching product with id ${id}: ${product ? 'found' : 'not found'}`);
    return product;
  }
}

module.exports = ProductsAPI;