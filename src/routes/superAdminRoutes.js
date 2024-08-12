const express = require('express');
const router = express.Router();
const Library = require('../models/Library');
const User = require('../models/User');
const { checkRole } = require('../middlewares/authMiddleware');

// Create a new library
router.post('/create-library', checkRole('super-admin'), async (req, res) => {
  try {
    const { name, ownerId } = req.body;
    const library = new Library({ name, ownerId });
    await library.save();
    res.status(201).json(library);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Assign an admin to a library
router.post('/assign-admin', checkRole('super-admin'), async (req, res) => {
  try {
    const { adminId, libraryId } = req.body;
    const admin = await User.findById(adminId);
    if (admin && admin.role === 'admin') {
      admin.libraryId = libraryId;
      await admin.save();
      res.status(200).json(admin);
    } else {
      res.status(404).json({ error: 'Admin not found or invalid role.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all libraries
router.get('/libraries', checkRole('super-admin'), async (req, res) => {
  try {
    const libraries = await Library.find().populate('ownerId');
    res.status(200).json(libraries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
