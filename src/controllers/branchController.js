// src/controllers/branchController.js
const Branch = require('../models/Branch');

// Create a new branch
const createBranch = async (name, libraryId) => {
  const branch = new Branch({ name, libraryId });
  await branch.save();
  return branch;
};

// Get all branches
const getBranches = async () => {
  return await Branch.find();
};

// Get a single branch by ID
const getBranchById = async (id) => {
  return await Branch.findById(id);
};

// Update a branch
const updateBranch = async (id, updates) => {
  return await Branch.findByIdAndUpdate(id, updates, { new: true });
};

// Delete a branch
const deleteBranch = async (id) => {
  return await Branch.findByIdAndDelete(id);
};

module.exports = {
  createBranch,
  getBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};
