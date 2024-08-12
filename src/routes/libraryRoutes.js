// src/routes/libraryRoutes.js
const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middlewares/authMiddleware');
const libraryController = require('../controllers/libraryController');

// Create a new library (Accessible by super-admin only)
router.post('/create', auth, checkRole('super-admin'), async (req, res) => {
  try {
    const { name, ownerId } = req.body;
    const library = await libraryController.createLibrary(name, ownerId);
    res.status(201).json(library);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all libraries (Accessible by super-admin)
router.get('/', auth, checkRole('super-admin'), async (req, res) => {
  try {
    const libraries = await libraryController.getLibraries();
    res.status(200).json(libraries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single library by ID (Accessible by super-admin)
router.get('/:id', auth, checkRole('super-admin'), async (req, res) => {
  try {
    const library = await libraryController.getLibraryById(req.params.id);
    if (!library) {
      return res.status(404).json({ error: 'Library not found' });
    }
    res.status(200).json(library);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a library (Accessible by super-admin only)
router.put('/:id', auth, checkRole('super-admin'), async (req, res) => {
  try {
    const updates = req.body;
    const library = await libraryController.updateLibrary(req.params.id, updates);
    if (!library) {
      return res.status(404).json({ error: 'Library not found' });
    }
    res.status(200).json(library);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a library (Accessible by super-admin only)
router.delete('/:id', auth, checkRole('super-admin'), async (req, res) => {
  try {
    const library = await libraryController.deleteLibrary(req.params.id);
    if (!library) {
      return res.status(404).json({ error: 'Library not found' });
    }
    res.status(200).json({ message: 'Library deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
