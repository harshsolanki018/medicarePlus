import { useEffect, useState } from 'react';
import { api } from '../services/api';

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  const [form, setForm] = useState({
    patientName: '',
    patientAge: '',
    contactNumber: '',
    email: '',
    doctorId: '',
    date: '',
    time: '',
    reason: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // load doc from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        setError('');

        const res = await api.get('/api/doctors');
        const list = Array.isArray(res.data) ? res.data : res.data.doctors || [];
        setDoctors(list);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load doctors');
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.doctorId) {
      setError('Please select a doctor.');
      return;
    }

    if (!form.date || !form.time) {
      setError('Please choose both date and time.');
      return;
    }

    try {
      setSubmitting(true);

      const reasonText =
        'Patient Name: ' + form.patientName + '\n' +
        'Age: ' + form.patientAge + '\n' +
        'Contact: ' + form.contactNumber + '\n' +
        'Email: ' + (form.email || 'Not provided') + '\n' +
        'Preferred Time: ' + form.time + '\n' +
        'Reason / Symptoms: ' + form.reason;

      const payload = {
        doctorId: form.doctorId,   
        date: form.date,           
        reason: reasonText,        
      };

      await api.post('/api/appointments', payload);

      setSuccess('Appointment request submitted successfully.');
      setForm({
        patientName: '',
        patientAge: '',
        contactNumber: '',
        email: '',
        doctorId: '',
        date: '',
        time: '',
        reason: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <h2>Book an Appointment</h2>
      <p className="section-subtitle">
        Fill in your details and contact information so the clinic can reach you.
      </p>

      {error && <p className="error-text">{error}</p>}
      {success && <p className="info-text">{success}</p>}
      {success && <p className="success-box">{success}</p>}


      <form onSubmit={onSubmit} className="form wide">
        <label>
          Patient Name
          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Age
          <input
            type="number"
            name="patientAge"
            value={form.patientAge}
            onChange={onChange}
            min="0"
            required
          />
        </label>

        <label>
          Contact Number
          <input
            type="tel"
            name="contactNumber"
            value={form.contactNumber}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Email (optional)
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
          />
        </label>

        <label>
          Choose Doctor
          <select
            name="doctorId"
            value={form.doctorId}
            onChange={onChange}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((d) => {
              const name = d.name || d.user?.name || 'Doctor';
              const specialization = d.specialization || 'General';
              return (
                <option key={d._id} value={d._id}>
                  {name} — {specialization}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Appointment Date
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Preferred Time
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Reason / Symptoms
          <textarea
            name="reason"
            value={form.reason}
            onChange={onChange}
            rows="3"
            placeholder="Describe your problem in short"
          />
        </label>

        <button type="submit" className="btn primary full" disabled={submitting}>
          {submitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>

      {loadingDoctors && (
        <p className="info-text" style={{ marginTop: '10px' }}>
          Loading doctors list...
        </p>
      )}
    </div>
  );
}

export default BookAppointment;
