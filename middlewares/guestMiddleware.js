const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

const authenticateToken = async (req, res, next) => {
  const token = req?.cookies?.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // attach user to request
    } catch (err) {
      console.error('JWT error:', err.message);
      req.user = null; // treat as unauthenticated
    }
  } else {
    req.user = null; // no token provided
  }

  next(); // the controller decideds what to do with the user
};

module.exports = authenticateToken;
