// backend/src/index.js
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const ProductsAPI = require('./datasources/ProductsAPI');
const UsersAPI = require('./datasources/UsersAPI');
const OrdersAPI = require('./datasources/OrdersAPI');

// Create the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    productsAPI: new ProductsAPI(),
    usersAPI: new UsersAPI(),
    ordersAPI: new OrdersAPI(),
  }),
  formatError: (err) => {
    // Log errors to the console
    console.error('GraphQL Error:', err);
    return err;
  },
  context: ({ req }) => {
    // Add context logic here (e.g., authentication)
    return { token: req.headers.authorization || '' };
  },
});

// Start the server
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});