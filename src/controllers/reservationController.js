// src/controllers/reservationController.js
const Reservation = require('../models/Reservation');
const Desk = require('../models/Desk');

// Create a reservation
const reserveDesk = async (deskId, studentId, reservationDate) => {
  const desk = await Desk.findById(deskId);
  if (!desk) {
    throw new Error('Desk not found');
  }
  if (desk.reserved) {
    throw new Error('Desk is already reserved');
  }
  desk.reserved = true;
  desk.reservedBy = studentId;
  desk.reservationDate = reservationDate;
  await desk.save();

  const reservation = new Reservation({ deskId, studentId, reservationDate });
  await reservation.save();
  return reservation;
};

// Get all reservations
const getReservations = async () => {
  return await Reservation.find().populate('deskId').populate('studentId');
};

// Get a single reservation by ID
const getReservationById = async (id) => {
  return await Reservation.findById(id).populate('deskId').populate('studentId');
};

// Cancel a reservation
const cancelReservation = async (id) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) {
    throw new Error('Reservation not found');
  }

  const desk = await Desk.findById(reservation.deskId);
  if (!desk) {
    throw new Error('Desk not found');
  }

  desk.reserved = false;
  desk.reservedBy = null;
  desk.reservationDate = null;
  await desk.save();

  await reservation.remove();
  return reservation;
};

module.exports = {
  reserveDesk,
  getReservations,
  getReservationById,
  cancelReservation,
};
