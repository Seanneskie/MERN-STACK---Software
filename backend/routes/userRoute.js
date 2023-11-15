// routes/userroute.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// Define user routes

// Get all users
router.get('/', userController.getAllUsers);

// Get a single user by ID
router.get('/:id', userController.getSingleUser);

// Create a new user
router.post('/', userController.createUser);

// Update a user by ID
router.patch('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
