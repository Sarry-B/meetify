const express = require('express');
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create a new appointment (requires authentication)
router.post('/appointments', authMiddleware, async (req, res) => {
  const { title, date } = req.body;
  try {
    const appointment = await Appointment.create({
      title,
      date,
      user: req.user.id
    });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all appointments for the authenticated user
router.get('/appointments', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;