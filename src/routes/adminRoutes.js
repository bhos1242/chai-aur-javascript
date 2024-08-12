const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');
const Room = require('../models/Room');
const Desk = require('../models/Desk');
const { checkRole } = require('../middlewares/authMiddleware');

// Create a new branch
router.post('/create-branch', checkRole('admin'), async (req, res) => {
  try {
    const { name, libraryId, address, contactNumber } = req.body;
    const branch = new Branch({ name, libraryId, address, contactNumber });
    await branch.save();
    res.status(201).json(branch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new room in a branch
router.post('/create-room', checkRole('admin'), async (req, res) => {
  try {
    const { name, branchId, capacity } = req.body;
    const room = new Room({ name, branchId, capacity });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new desk in a room
router.post('/create-desk', checkRole('admin'), async (req, res) => {
  try {
    const { roomId } = req.body;
    const desk = new Desk({ roomId });
    await desk.save();
    res.status(201).json(desk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all branches for a library
router.get('/branches/:libraryId', checkRole('admin'), async (req, res) => {
  try {
    const branches = await Branch.find({ libraryId: req.params.libraryId });
    res.status(200).json(branches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all rooms for a branch
router.get('/rooms/:branchId', checkRole('admin'), async (req, res) => {
  try {
    const rooms = await Room.find({ branchId: req.params.branchId });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
