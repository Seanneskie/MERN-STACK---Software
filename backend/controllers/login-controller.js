const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

async function handleLogin(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Authentication is successful; generate and send a token here
    const token = jwt.sign(
      { username: user.username, role: user.role },
      'your-secret-key', // Replace with your own secret key
      { expiresIn: '1h' } // Set token expiration time as needed
    );

    // Include the user's role in the response
    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { handleLogin };
