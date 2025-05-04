// backend/src/datasources/UsersAPI.js
const { DataSource } = require('apollo-datasource');
const users = require('../seedData/users');

class UsersAPI extends DataSource {
  constructor() {
    super();
    this.users = users || []; // Fallback to empty array if users don't exist
  }

  initialize(config) {
    this.context = config.context;
  }

  async getUsers() {
    return this.users;
  }

  async getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  async getUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }
}

module.exports = UsersAPI;