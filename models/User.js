const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'], // Custom error message
      trim: true, // Remove extra spaces
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Ensure emails are unique
      lowercase: true, // Convert email to lowercase for consistency
      match: [/\S+@\S+\.\S+/, 'Invalid email format'], // Basic email validation
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'], // Minimum password length
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model('User', userSchema);
 