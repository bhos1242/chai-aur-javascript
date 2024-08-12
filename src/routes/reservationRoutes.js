// src/routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middlewares/authMiddleware');
const reservationController = require('../controllers/reservationController');

// Create a reservation (Accessible by student only)
router.post('/create', auth, checkRole('student'), async (req, res) => {
  try {
    const { deskId, reservationDate } = req.body;
    const reservation = await reservationController.createReservation(req.user._id, deskId, reservationDate);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all reservations for a student (Accessible by student only)
router.get('/', auth, checkRole('student'), async (req, res) => {
  try {
    const reservations = await reservationController.getStudentReservations(req.user._id);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all reservations (Accessible by admin only)
router.get('/all', auth, checkRole('admin'), async (req, res) => {
  try {
    const reservations = await reservationController.getAllReservations();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancel a reservation (Accessible by student only)
router.post('/cancel/:id', auth, checkRole('student'), async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await reservationController.cancelReservation(req.user._id, reservationId);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation canceled successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get reservation details by ID (Accessible by admin only)
router.get('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const reservation = await reservationController.getReservationById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
