// src/routes/branchRoutes.js
const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middlewares/authMiddleware');
const branchController = require('../controllers/branchController');

// Create a new branch (Accessible by admin only)
router.post('/create', auth, checkRole('admin'), async (req, res) => {
  try {
    const { name, libraryId } = req.body;
    const branch = await branchController.createBranch(name, libraryId);
    res.status(201).json(branch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all branches (Accessible by admin only)
router.get('/', auth, checkRole('admin'), async (req, res) => {
  try {
    const branches = await branchController.getBranches();
    res.status(200).json(branches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single branch by ID (Accessible by admin only)
router.get('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const branch = await branchController.getBranchById(req.params.id);
    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.status(200).json(branch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a branch (Accessible by admin only)
router.put('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const updates = req.body;
    const branch = await branchController.updateBranch(req.params.id, updates);
    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.status(200).json(branch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a branch (Accessible by admin only)
router.delete('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const branch = await branchController.deleteBranch(req.params.id);
    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.status(200).json({ message: 'Branch deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
