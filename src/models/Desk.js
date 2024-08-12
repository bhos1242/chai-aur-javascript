const mongoose = require('mongoose');
const { Schema } = mongoose;

const deskSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  reserved: {
    type: Boolean,
    default: false,
  },
  reservedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  reservationDate: {
    type: Date,
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

deskSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Desk = mongoose.model('Desk', deskSchema);

module.exports = Desk;
