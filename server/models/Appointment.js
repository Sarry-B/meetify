const mongoose = require('mongoose');

// Define the appointment schema
const appointmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Export the model
module.exports = mongoose.model('Appointment', appointmentSchema);