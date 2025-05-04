// Save this as debug.js in your backend/src directory
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const ProductsAPI = require('./datasources/ProductsAPI');
const products = require('./seedData/products');

// Log the product seed data to verify it exists and is formatted correctly
console.log('Product Seed Data:');
console.log(JSON.stringify(products, null, 2));

// Create a simple mock of the ProductsAPI for testing
const productsAPI = new ProductsAPI();

// Check if the ProductsAPI has the required methods
console.log('ProductsAPI Methods:');
console.log(Object.getOwnPropertyNames(ProductsAPI.prototype));

// Check the GraphQL schema for product-related types and queries
console.log('GraphQL Schema:');
console.log(typeDefs);

// Check the resolvers for product-related resolvers
console.log('GraphQL Resolvers:');
console.log(JSON.stringify(resolvers, null, 2));

// Create a test server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    productsAPI: productsAPI,
  }),
});

// Test a simple product query
async function testProductQuery() {
  try {
    // This simulates a product query resolver
    console.log('Testing Product Query:');
    
    // If your ProductsAPI has a getProducts method, test it
    if (productsAPI.getProducts) {
      const result = await productsAPI.getProducts();
      console.log('ProductsAPI.getProducts result:');
      console.log(result);
    } else {
      console.error('ERROR: ProductsAPI.getProducts method does not exist!');
    }
    
    // Test the resolver directly if possible
    if (resolvers.Query && resolvers.Query.products) {
      const result = await resolvers.Query.products(null, {}, { dataSources: { productsAPI } });
      console.log('Resolver Query.products result:');
      console.log(result);
    } else {
      console.error('ERROR: resolvers.Query.products does not exist!');
    }
  } catch (error) {
    console.error('ERROR during query test:');
    console.error(error);
  }
}

testProductQuery();