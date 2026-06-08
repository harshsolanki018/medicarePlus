const express = require('express');
const Doctor = require('../models/Doctor');
const upload = require('../middleware/upload');
const { auth, adminOnly } = require('../middleware/authMiddleware');
const {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} = require('../config/cloudinary');

const router = express.Router();

const getDoctorImagePayload = async (req, existingDoctor = null) => {
  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(req.file.buffer, {
      folder: 'medicare-plus/doctors',
    });

    if (existingDoctor?.photoPublicId) {
      await deleteFromCloudinary(existingDoctor.photoPublicId);
    }

    return {
      photo: uploaded.secure_url,
      photoPublicId: uploaded.public_id,
    };
  }

  if (typeof req.body.photo === 'string' && req.body.photo.trim()) {
    if (existingDoctor?.photoPublicId) {
      await deleteFromCloudinary(existingDoctor.photoPublicId);
    }

    return {
      photo: req.body.photo.trim(),
      photoPublicId: '',
    };
  }

  return {
    photo: existingDoctor?.photo,
    photoPublicId: existingDoctor?.photoPublicId || '',
  };
};

// Get doctor details
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching doctors' });
  }
});

// Add doctor
router.post('/', auth, adminOnly, upload.single('photo'), async (req, res) => {
  try {
    const { name, email, specialization, experience, fees, timings } = req.body;
    const imagePayload = await getDoctorImagePayload(req);

    const doctor = await Doctor.create({
      name,
      email,
      specialization,
      experience,
      fees,
      timings,
      ...imagePayload,
    });

    res.status(201).json(doctor);
  } catch (err) {
    console.error('Error creating doctor:', err.message);
    res.status(500).json({ message: err.message || 'Server error creating doctor' });
  }
});

// Update doctor
router.put('/:id', auth, adminOnly, upload.single('photo'), async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const imagePayload = await getDoctorImagePayload(req, doctor);

    doctor.name = req.body.name ?? doctor.name;
    doctor.email = req.body.email ?? doctor.email;
    doctor.specialization = req.body.specialization ?? doctor.specialization;
    doctor.experience = req.body.experience ?? doctor.experience;
    doctor.fees = req.body.fees ?? doctor.fees;
    doctor.timings = req.body.timings ?? doctor.timings;
    doctor.photo = imagePayload.photo;
    doctor.photoPublicId = imagePayload.photoPublicId;

    await doctor.save();
    res.json(doctor);
  } catch (err) {
    console.error('Error updating doctor:', err.message);
    res.status(500).json({ message: err.message || 'Server error updating doctor' });
  }
});

// Remove only the doctor's image
router.delete('/:id/photo', auth, adminOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (doctor.photoPublicId) {
      await deleteFromCloudinary(doctor.photoPublicId);
    }

    doctor.photo = 'https://via.placeholder.com/150';
    doctor.photoPublicId = '';
    await doctor.save();

    res.json(doctor);
  } catch (err) {
    console.error('Error deleting doctor image:', err.message);
    res.status(500).json({ message: 'Server error deleting doctor image' });
  }
});

// Delete doctor
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (doctor.photoPublicId) {
      await deleteFromCloudinary(doctor.photoPublicId);
    }

    await doctor.deleteOne();
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    console.error('Error deleting doctor:', err.message);
    res.status(500).json({ message: 'Server error deleting doctor' });
  }
});

module.exports = router;
