// backend/src/seedData/users.js
module.exports = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedpassword1', // In a real app, this would be properly hashed
    role: 'customer'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'hashedpassword2',
    role: 'customer'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'adminpassword',
    role: 'admin'
  }
];