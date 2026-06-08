const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('MediCare Plus API running');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

app.use((err, req, res, next) => {
  if (err && (err.message === 'Only image files are allowed' || err.code === 'LIMIT_FILE_SIZE')) {
    return res.status(400).json({ message: err.message || 'Invalid image upload' });
  }

  if (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }

  return next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MediCare Plus backend running on port ${PORT}`);
});
