# E-Commerce Application

A full-stack e-commerce application built with React, Apollo Client, GraphQL, and Node.js.

## Project Structure

The project is divided into two main directories:

- `backend/`: GraphQL API server
- `frontend/`: React client application

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=4000
   JWT_SECRET=your_secret_key_here
   ```

4. Start the server:
   ```
   npm run dev
   ```

The GraphQL server will be available at `http://localhost:4000/graphql`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The React application will be available at `http://localhost:3000`.

## Features

- Product browsing with category filtering
- Product details view
- Shopping cart functionality
- User authentication (register/login)
- Checkout process
- Order confirmation

## Test Accounts

You can use the following test accounts to login:

1. Admin User:
   - Email: admin@example.com
   - Password: password123

2. Regular User:
   - Email: john@example.com
   - Password: password123

## Technical Overview

### Backend

- Apollo Server for GraphQL API
- Custom data sources for products, users, and orders
- JWT authentication
- In-memory data stores (can be replaced with a real database)

### Frontend

- React for UI components
- Apollo Client for GraphQL queries and mutations
- React Router for navigation
- Context API for state management (authentication and cart)
- CSS for styling

