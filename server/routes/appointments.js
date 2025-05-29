const express = require('express');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

const router = express.Router();

// יצירת פגישה
router.post('/appointments', auth, async (req, res) => {
  try {
    const appointment = await Appointment.create({
      userId: req.user.id,
      title: req.body.title,
      date: req.body.date,
    });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// קבלת כל הפגישות של המשתמש
router.get('/appointments', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// מחיקת פגישה
router.delete('/appointments/:id', auth, async (req, res) => {
  try {
    const deleted = await Appointment.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// עדכון פגישה
router.put('/appointments/:id', auth, async (req, res) => {
  try {
    const updated = await Appointment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title: req.body.title, date: req.body.date },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Appointment not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;