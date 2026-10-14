const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { JWT_SECRET } = require('../config/env');
const User = require('../modules/users/user.model');
const { findUserById } = require('../utils/inMemoryStore');

async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const dbUser = mongoose.connection.readyState === 1 && User && User.findById
      ? await User.findById(payload.sub).select('-passwordHash').catch(() => null)
      : null;
    const memoryUser = findUserById(payload.sub);
    const user = dbUser || memoryUser;

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Account is inactive or missing.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired session.' });
  }
}

module.exports = { requireAuth };
