// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const branchRoutes = require('./routes/branchRoutes');
const roomRoutes = require('./routes/roomRoutes');
const deskRoutes = require('./routes/deskRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const { auth } = require('./middlewares/authMiddleware');
const connectDB = require("./config/dbConnection")
const app = express();
connectDB()
// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/user', userRoutes);
app.use('/api/library', auth, libraryRoutes);
app.use('/api/branch', auth, branchRoutes);
app.use('/api/room', auth, roomRoutes);
app.use('/api/desk', auth, deskRoutes);
app.use('/api/reservation', auth, reservationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
