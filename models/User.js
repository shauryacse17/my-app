const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'], 
      trim: true, 
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, 
      lowercase: true, 
      match: [/\S+@\S+\.\S+/, 'Invalid email format'], 
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'], 
    },
    createdAt: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('User', userSchema);
 
