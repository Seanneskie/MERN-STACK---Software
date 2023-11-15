// controllers/userController.js
const User = require('../models/userModel');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by ID
exports.getSingleUser = async (req, res) => {
  res.json(res.user);
};

// Create a new user
exports.createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  if (req.body.username) {
    res.user.username = req.body.username;
  }
  if (req.body.email) {
    res.user.email = req.body.email;
  }
  if (req.body.password) {
    res.user.password = req.body.password;
  }
  if (req.body.role) {
    res.user.role = req.body.role;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
