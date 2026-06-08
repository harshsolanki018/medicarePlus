import { useEffect, useState } from 'react';
import { api } from '../services/api';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    return <p className="text-sm font-medium text-blue-700">Loading doctors...</p>;
  }

  if (error) {
    return <p className="text-sm font-medium text-red-700">{error}</p>;
  }

  if (!doctors.length) {
    return <p className="text-sm font-medium text-blue-700">No doctors found.</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Available Doctors</h2>
        <p className="mt-2 text-sm text-slate-600">
          View details of doctors and choose the right specialist for your appointment.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
            <div
              key={doctor._id || index}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 text-sm shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-slate-900/10"
            >
              <div className="flex gap-3">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-200">
                  <img src={imgSrc} alt={name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {specialization}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{name}</h3>
                  <p className="text-sm text-slate-600">
                    {experience} years experience • Fees ₹{fees}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Timings: {timings}</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 text-slate-700">
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p className="mt-2 text-xs text-slate-500">
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
