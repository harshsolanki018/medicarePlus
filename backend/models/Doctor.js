const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    specialization: { type: String, required: true },
    experience: Number,
    fees: Number,
    timings: String,
    photo: {
      type: String,
      default: "https://via.placeholder.com/150"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
