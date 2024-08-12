// src/routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middlewares/authMiddleware');
const roomController = require('../controllers/roomController');

// Create a new room (Accessible by admin only)
router.post('/create', auth, checkRole('admin'), async (req, res) => {
  try {
    const { name, branchId } = req.body;
    const room = await roomController.createRoom(name, branchId);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all rooms (Accessible by admin only)
router.get('/', auth, checkRole('admin'), async (req, res) => {
  try {
    const rooms = await roomController.getRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single room by ID (Accessible by admin only)
router.get('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const room = await roomController.getRoomById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a room (Accessible by admin only)
router.put('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const updates = req.body;
    const room = await roomController.updateRoom(req.params.id, updates);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a room (Accessible by admin only)
router.delete('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const room = await roomController.deleteRoom(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
