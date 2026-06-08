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

  const statusClass = (status) => `status-${status}`;

  return (
    <div className="page">
      <h2>My Appointments</h2>

      {appointments.length === 0 && <p>No appointments yet.</p>}

      <div className="card-grid">
        {appointments.map((a) => {
          const doctorName =
            a.doctor?.name ||
            a.doctor?.user?.name ||
            'Doctor';

          return (
            <div key={a._id} className="card">
              <h3>{doctorName}</h3>

              <p>
                <strong>When:</strong>{' '}
                {a.date ? new Date(a.date).toLocaleString() : 'N/A'}
              </p>

              <p style={{ whiteSpace: 'pre-line', marginTop: '6px' }}>
                <strong>Details:</strong>{'\n'}
                {a.reason || 'N/A'}
              </p>

              <p style={{ marginTop: '8px' }}>
                <span className={`badge ${statusClass(a.status)}`}>
                  {a.status?.toUpperCase?.() || 'PENDING'}
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
