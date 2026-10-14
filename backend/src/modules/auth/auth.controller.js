const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../users/user.model');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../config/env');
const { createUser, findUserByEmail, cloneUser } = require('../../utils/inMemoryStore');

function signToken(user) {
  return jwt.sign({ sub: String(user._id), role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

async function register(req, res, next) {
  try {
    const { fullName, email, password, role, department, permissions } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: 'fullName, email, password and role are required.' });
    }

    const existing = findUserByEmail(email) ||
      (mongoose.connection.readyState === 1 && User
        ? await User.findOne({ email: email.toLowerCase() }).catch(() => null)
        : null);
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = createUser({
      fullName,
      email: email.toLowerCase(),
      passwordHash,
      role,
      department: department || 'General',
      permissions: permissions || [],
      isActive: true,
      lastLoginAt: null
    });

    return res.status(201).json({
      token: signToken(user),
      user: cloneUser(user)
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = findUserByEmail(email) ||
      (mongoose.connection.readyState === 1 && User
        ? await User.findOne({ email: email.toLowerCase() }).catch(() => null)
        : null);
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    user.lastLoginAt = new Date();

    return res.json({
      token: signToken(user),
      user: cloneUser(user)
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res) {
  return res.json({ user: cloneUser(req.user) });
}

async function logout(req, res) {
  return res.json({ message: 'Logout successful. The client should discard the token.' });
}

module.exports = { register, login, me, logout };
