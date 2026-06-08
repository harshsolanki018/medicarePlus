const express = require('express');
const Doctor = require('../models/Doctor');

const router = express.Router();

//  Get doc details 
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching doctors' });
  }
});

// add doc
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      specialization,
      experience,
      fees,
      timings,
      photo  
    } = req.body;

    const doctor = await Doctor.create({
      name,
      email,
      specialization,
      experience,
      fees,
      timings,
      photo  
    });

    res.status(201).json(doctor);
  } catch (err) {
    console.error("Error creating doctor:", err.message);
    res.status(500).json({ message: 'Server error creating doctor' });
  }
});

// Update doc 
router.put('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: 'Server error updating doctor' });
  }
});

//  Delete doctor 
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error deleting doctor' });
  }
});

module.exports = router;
