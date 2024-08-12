const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  branchId: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  desks: [{
    type: Schema.Types.ObjectId,
    ref: 'Desk',
  }],
  capacity: {
    type: Number,
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

roomSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
