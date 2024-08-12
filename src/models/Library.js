const mongoose = require('mongoose');
const { Schema } = mongoose;

const librarySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  branches: [{
    type: Schema.Types.ObjectId,
    ref: 'Branch',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

librarySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
