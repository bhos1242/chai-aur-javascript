const mongoose = require('mongoose');
require('dotenv').config();
// Ensure you correctly reference the environment variable
const MONGO_URL = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    // Await the connection process and use the correct MONGO_URL variable
    await mongoose.connect(MONGO_URL);
    console.log('Database connected successfully');
  } catch (error) {
    // Handle any errors that occur during the connection
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
