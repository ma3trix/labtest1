// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const { username, firstname, lastname, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ error: 'User already exists' });

  // Create new user
  const user = new User({ username, firstname, lastname, password });
  await user.save();

  res.status(201).json({ message: 'User created successfully' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid username or password' });

  // Check password
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'Invalid username or password' });

  res.json({ message: 'Logged in successfully' });
});

module.exports = router;
