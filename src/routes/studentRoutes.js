const express = require('express');
const router = express.Router();
const Desk = require('../models/Desk');
const Reservation = require('../models/Reservation');
const { checkRole } = require('../middlewares/authMiddleware');

// Get available desks in a room
router.get('/available-desks/:roomId', checkRole('student'), async (req, res) => {
  try {
    const desks = await Desk.find({ roomId: req.params.roomId, reserved: false });
    res.status(200).json(desks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Reserve a desk
router.post('/reserve-desk', checkRole('student'), async (req, res) => {
  try {
    const { deskId, startTime, endTime } = req.body;
    const desk = await Desk.findById(deskId);
    if (desk && !desk.reserved) {
      desk.reserved = true;
      desk.reservedBy = req.user._id;
      desk.reservationDate = new Date();
      await desk.save();

      const reservation = new Reservation({
        deskId,
        studentId: req.user._id,
        reservationDate: new Date(),
        startTime,
        endTime,
        status: 'active',
      });
      await reservation.save();

      res.status(201).json(reservation);
    } else {
      res.status(400).json({ error: 'Desk is already reserved or not found.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a student's reservations
router.get('/my-reservations', checkRole('student'), async (req, res) => {
  try {
    const reservations = await Reservation.find({ studentId: req.user._id }).populate('deskId');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
