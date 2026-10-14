const dotenv = require('dotenv');

dotenv.config({ path: require('path').resolve(__dirname, '../../../.env') });

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'development-secret-change-me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apin-juth-dev',
  USE_MEMORY_DB: process.env.USE_MEMORY_DB === 'true',
  COMPLAINT_FORM_URL: process.env.COMPLAINT_FORM_URL || 'https://example.com/complaint-form'
};
