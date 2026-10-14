const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
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
    department: {
      type: String,
      default: 'General'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLoginAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.comparePassword = async function (value) {
  return bcrypt.compare(value, this.passwordHash);
};

userSchema.methods.toPublicJSON = function () {
  const user = this.toObject();
  delete user.passwordHash;
  return user;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }

  if (this.passwordHash && this.passwordHash.startsWith('$2')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
