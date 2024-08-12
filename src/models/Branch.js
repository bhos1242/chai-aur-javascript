const mongoose = require('mongoose');
const { Schema } = mongoose;

const branchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  libraryId: {
    type: Schema.Types.ObjectId,
    ref: 'Library',
    required: true,
  },
  rooms: [{
    type: Schema.Types.ObjectId,
    ref: 'Room',
  }],
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
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

branchSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
