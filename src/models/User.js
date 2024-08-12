const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['super-admin', 'admin', 'student'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  libraryId: {
    type: Schema.Types.ObjectId,
    ref: 'Library',
    default: null,
  },
  branchId: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
