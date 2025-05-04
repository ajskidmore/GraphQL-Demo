// backend/src/schema/typeDefs.js
const { gql } = require('apollo-server');

module.exports = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    image: String
    category: String
    inStock: Boolean
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String
  }

  type OrderItem {
    id: ID!
    name: String!
    price: Float!
    quantity: Int!
  }

  type Order {
    id: ID!
    userId: ID!
    products: [OrderItem!]!
    total: Float!
    status: String!
    createdAt: String!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    users: [User]
    user(id: ID!): User
    orders: [Order]
    order(id: ID!): Order
    userOrders(userId: ID!): [Order]
  }

  input OrderItemInput {
    id: ID!
    name: String!
    price: Float!
    quantity: Int!
  }

  input OrderInput {
    userId: ID!
    products: [OrderItemInput!]!
    total: Float!
  }

  type Mutation {
    createOrder(order: OrderInput!): Order
    updateOrderStatus(id: ID!, status: String!): Order
  }
`;