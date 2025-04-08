const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expected: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    // Attach user info to request
    req.body.user = user;
    next();
  });
};

module.exports = authenticateToken;
