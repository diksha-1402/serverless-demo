const mongoose = require('mongoose');

// MongoDB connection URL
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/express-serverless-app';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {});
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if DB connection fails
  }
};

module.exports = connectDB;
