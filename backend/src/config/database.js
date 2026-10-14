const mongoose = require('mongoose');
const { MONGODB_URI, USE_MEMORY_DB, NODE_ENV } = require('./env');

async function connectDatabase() {
  try {
    if (USE_MEMORY_DB || NODE_ENV === 'test' || !MONGODB_URI) {
      console.log('Using in-memory fallback data mode for development or tests.');
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB:', MONGODB_URI);
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error;
  }
}

async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

module.exports = { connectDatabase, disconnectDatabase };
