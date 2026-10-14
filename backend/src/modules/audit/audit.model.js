const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema(
  {
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    actorRole: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      required: true
    },
    resourceType: {
      type: String,
      default: 'General'
    },
    resourceIdentifier: {
      type: String,
      default: ''
    },
    outcome: {
      type: String,
      default: 'success'
    },
    details: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('AuditEvent', auditSchema);
