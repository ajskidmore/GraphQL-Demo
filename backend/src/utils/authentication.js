const jwt = require('jsonwebtoken');

const authenticateUser = async (token) => {
  if (!token || token === '') {
    return null;
  }

  try {
    // Remove 'Bearer ' prefix if present
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    return decoded;
  } catch (error) {
    console.error('Authentication error:', error.message);
    return null;
  }
};

module.exports = { authenticateUser };