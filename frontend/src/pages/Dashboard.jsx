import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      navigate('/login');
      return;
    }

    const load = async () => {
      try {
        const res = await api.get('/api/appointments/my');
        setAppointments(res.data);
      } catch (err) {
        console.error('Failed to load appointments', err);
      }
    };

    load();
  }, [navigate]);

  const statusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-sky-100 text-sky-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">My Appointments</h2>

      {appointments.length === 0 && <p className="text-sm text-slate-600">No appointments yet.</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        {appointments.map((a) => {
          const doctorName =
            a.doctor?.name ||
            a.doctor?.user?.name ||
            'Doctor';

          return (
            <div
              key={a._id}
              className="rounded-2xl border border-slate-200 bg-white/95 p-4 text-sm shadow-lg shadow-slate-900/5"
            >
              <h3 className="text-lg font-semibold text-slate-900">{doctorName}</h3>

              <p className="mt-2 text-slate-700">
                <strong>When:</strong>{' '}
                {a.date ? new Date(a.date).toLocaleString() : 'N/A'}
              </p>

              <p className="mt-2 whitespace-pre-line text-slate-700">
                <strong>Details:</strong>
                {'\n'}
                {a.reason || 'N/A'}
              </p>

              <p className="mt-3">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(a.status)}`}>
                          {(a.status || 'pending').toUpperCase()}
                        </span>
                      </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
