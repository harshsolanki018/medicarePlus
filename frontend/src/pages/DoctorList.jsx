import { useEffect, useState } from 'react';
import { api } from '../services/api';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

// load doc from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await api.get('/api/doctors');
        const list = Array.isArray(res.data) ? res.data : res.data.doctors || [];
        setDoctors(list);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <p className="info-text">Loading doctors...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!doctors.length) {
    return <p className="info-text">No doctors found.</p>;
  }

  return (
    <div className="page">
      <h2>Available Doctors</h2>
      <p className="section-subtitle">
        View details of doctors and choose the right specialist for your appointment.
      </p>

      <div className="card-grid">
        {doctors.map((doctor, index) => {
          const name = doctor.name || doctor.user?.name || 'Doctor';
          const email = doctor.email || doctor.user?.email || 'Not available';
          const specialization = doctor.specialization || 'General';
          const experience = doctor.experience || 0;
          const fees = doctor.fees || 0;
          const timings =
            doctor.timings ||
            (Array.isArray(doctor.availableSlots)
              ? doctor.availableSlots.join(', ')
              : 'Not specified');

          const imgSrc =
            doctor.photo ||
            'https://via.placeholder.com/200x200.png?text=Doctor';

          return (
            <div key={doctor._id || index} className="card doctor-card">
              <div className="doctor-card-top">
                <div className="doctor-photo-wrapper">
                  <img src={imgSrc} alt={name} className="doctor-photo" />
                </div>
                <div className="doctor-main-info">
                  <span className="badge">{specialization}</span>
                  <h3>{name}</h3>
                  <p className="doctor-sub">
                    {experience} years experience • Fees ₹{fees}
                  </p>
                  <p className="doctor-time">Timings: {timings}</p>
                </div>
              </div>

              <div className="doctor-extra">
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p className="doctor-note">
                  You can book an appointment with this doctor from the booking page.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DoctorList;
