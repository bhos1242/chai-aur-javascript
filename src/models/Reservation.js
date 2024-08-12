const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
  deskId: {
    type: Schema.Types.ObjectId,
    ref: 'Desk',
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'canceled'],
    default: 'active',
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

reservationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
