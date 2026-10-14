const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: [
        'Super Admin',
        'Admin',
        'Data Staff',
        'Laboratory Staff',
        'Storekeeper',
        'APIN Supply Staff',
        'APIN Doctor',
        'General Doctor',
        'Receptionist',
        'Scientist',
        'Technical Supervisor',
        'Quality Manager'
      ]
    },
    permissions: {
      type: [String],
      default: []
    },
    description: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Role', roleSchema);
