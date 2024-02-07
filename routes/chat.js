const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/join', async (req, res) => {
  // Implement joining a room
});

router.post('/leave', async (req, res) => {
  // Implement leaving a room
});

router.post('/message', async (req, res) => {
  // Implement sending a message
});

module.exports = router;
