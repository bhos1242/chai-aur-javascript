// src/controllers/libraryController.js
const Library = require('../models/Library');

// Create a new library
const createLibrary = async (name, ownerId) => {
  const library = new Library({ name, ownerId });
  await library.save();
  return library;
};

// Get all libraries
const getLibraries = async () => {
  return await Library.find();
};

// Get a single library by ID
const getLibraryById = async (id) => {
  return await Library.findById(id);
};

// Update a library
const updateLibrary = async (id, updates) => {
  return await Library.findByIdAndUpdate(id, updates, { new: true });
};

// Delete a library
const deleteLibrary = async (id) => {
  return await Library.findByIdAndDelete(id);
};

module.exports = {
  createLibrary,
  getLibraries,
  getLibraryById,
  updateLibrary,
  deleteLibrary,
};
