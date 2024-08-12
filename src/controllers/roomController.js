// src/controllers/roomController.js
const Room = require('../models/Room');

// Create a new room
const createRoom = async (name, branchId) => {
  const room = new Room({ name, branchId });
  await room.save();
  return room;
};

// Get all rooms
const getRooms = async () => {
  return await Room.find();
};

// Get a single room by ID
const getRoomById = async (id) => {
  return await Room.findById(id);
};

// Update a room
const updateRoom = async (id, updates) => {
  return await Room.findByIdAndUpdate(id, updates, { new: true });
};

// Delete a room
const deleteRoom = async (id) => {
  return await Room.findByIdAndDelete(id);
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
