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

  const inputClass =
    'w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100';

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Book an Appointment</h2>
        <p className="mt-2 text-sm text-slate-600">
          Fill in your details and contact information so the clinic can reach you.
        </p>
      </div>

      {error && <p className="text-sm font-medium text-red-700">{error}</p>}
      {success && <p className="text-sm font-medium text-blue-700">{success}</p>}

      <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Patient Name
          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={onChange}
            required
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Age
          <input
            type="number"
            name="patientAge"
            value={form.patientAge}
            onChange={onChange}
            min="0"
            required
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Contact Number
          <input
            type="tel"
            name="contactNumber"
            value={form.contactNumber}
            onChange={onChange}
            required
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Email (optional)
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Choose Doctor
          <select
            name="doctorId"
            value={form.doctorId}
            onChange={onChange}
            required
            className={inputClass}
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

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Appointment Date
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              required
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Preferred Time
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={onChange}
              required
              className={inputClass}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Reason / Symptoms
          <textarea
            name="reason"
            value={form.reason}
            onChange={onChange}
            rows="4"
            placeholder="Describe your problem in short"
            className={inputClass}
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>

      {loadingDoctors && (
        <p className="mt-2 text-sm font-medium text-blue-700">Loading doctors list...</p>
      )}
    </div>
  );
}

export default BookAppointment;
