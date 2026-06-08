const express = require('express');
const Appointment = require('../models/Appointment');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Patients only' });
    }

    const { doctorId, date, reason } = req.body;

    const appointment = await Appointment.create({
      patient: req.user.userId,
      doctor: doctorId,
      date,
      reason
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error('Error creating appointment:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/my', auth, async (req, res) => {
  try {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Patients only' });
    }

    const appointments = await Appointment.find({ patient: req.user.userId })
      .populate('doctor')
      .sort({ date: -1 });

    res.json(appointments);
  } catch (err) {
    console.error('Error fetching my appointments:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email')
      .populate('doctor')
      .sort({ date: -1 });

    res.json(appointments);
  } catch (err) {
    console.error('Error fetching all appointments:', err.message);
    res.status(500).json({ message: 'Server error fetching appointments' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true
    })
      .populate('patient', 'name email')
      .populate('doctor');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    console.error('Error updating appointment:', err.message);
    res.status(500).json({ message: 'Server error updating appointment' });
  }
});

module.exports = router;
