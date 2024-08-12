// src/controllers/deskController.js
const Desk = require('../models/Desk');

// Create a new desk
const createDesk = async (roomId) => {
  const desk = new Desk({ roomId, reserved: false });
  await desk.save();
  return desk;
};

// Get all desks
const getDesks = async () => {
  return await Desk.find();
};

// Get a single desk by ID
const getDeskById = async (id) => {
  return await Desk.findById(id);
};

// Update a desk
const updateDesk = async (id, updates) => {
  return await Desk.findByIdAndUpdate(id, updates, { new: true });
};

// Delete a desk
const deleteDesk = async (id) => {
  return await Desk.findByIdAndDelete(id);
};

module.exports = {
  createDesk,
  getDesks,
  getDeskById,
  updateDesk,
  deleteDesk,
};
