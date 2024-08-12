// src/routes/deskRoutes.js
const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middlewares/authMiddleware');
const deskController = require('../controllers/deskController');

// Create a new desk (Accessible by admin only)
router.post('/create', auth, checkRole('admin'), async (req, res) => {
  try {
    const { roomId } = req.body;
    const desk = await deskController.createDesk(roomId);
    res.status(201).json(desk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all desks (Accessible by admin only)
router.get('/', auth, checkRole('admin'), async (req, res) => {
  try {
    const desks = await deskController.getDesks();
    res.status(200).json(desks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single desk by ID (Accessible by admin only)
router.get('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const desk = await deskController.getDeskById(req.params.id);
    if (!desk) {
      return res.status(404).json({ error: 'Desk not found' });
    }
    res.status(200).json(desk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a desk (Accessible by admin only)
router.put('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const updates = req.body;
    const desk = await deskController.updateDesk(req.params.id, updates);
    if (!desk) {
      return res.status(404).json({ error: 'Desk not found' });
    }
    res.status(200).json(desk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a desk (Accessible by admin only)
router.delete('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const desk = await deskController.deleteDesk(req.params.id);
    if (!desk) {
      return res.status(404).json({ error: 'Desk not found' });
    }
    res.status(200).json({ message: 'Desk deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Reserve a desk (Accessible by student only)
router.post('/reserve/:id', auth, checkRole('student'), async (req, res) => {
  try {
    const { reservationDate } = req.body;
    const desk = await deskController.reserveDesk(req.params.id, req.user._id, reservationDate);
    if (!desk) {
      return res.status(404).json({ error: 'Desk not found' });
    }
    res.status(200).json(desk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancel desk reservation (Accessible by student only)
router.post('/cancel/:id', auth, checkRole('student'), async (req, res) => {
  try {
    const desk = await deskController.cancelDeskReservation(req.params.id, req.user._id);
    if (!desk) {
      return res.status(404).json({ error: 'Desk not found' });
    }
    res.status(200).json(desk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
