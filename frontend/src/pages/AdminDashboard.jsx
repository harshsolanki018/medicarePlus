import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); /* dashboard | doctors | patients | appointments */

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [savingDoctor, setSavingDoctor] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');  // <-- already here

  //  doc form 
  const emptyDoctor = {
    name: '',
    email: '',
    specialization: '',
    experience: '',
    fees: '',
    timings: '',
    photo: '' 
  };

  const [doctorForm, setDoctorForm] = useState(emptyDoctor);
  const [editingDoctorId, setEditingDoctorId] = useState(null); /* null = add */

  //  chek and load from admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
  
    const loadAll = async () => {
      try {
        setLoading(true);
        setError('');
        setSuccessMsg(''); // clear any old success on reload

        // load docs
        const docRes = await api.get('/api/doctors');
        const docs = Array.isArray(docRes.data)
          ? docRes.data
          : docRes.data.doctors || [];
        setDoctors(docs);

        //  load patients 
        try {
          const patRes = await api.get('/api/auth/patients');
          const pats = Array.isArray(patRes.data)
            ? patRes.data
            : patRes.data.patients || [];
          setPatients(pats);
        } catch {
          setPatients([]);
        }

        // load appointments
        try {
          const apptRes = await api.get('/api/appointments');
          const appts = Array.isArray(apptRes.data)
            ? apptRes.data
            : apptRes.data.appointments || [];
          setAppointments(appts);
        } catch {
          setAppointments([]);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [navigate]);

  // for success message timeout
  useEffect(() => {
  if (!successMsg) return;

  const timer = setTimeout(() => {
    setSuccessMsg('');
  }, 2000); // hides after 2 seconds

  return () => clearTimeout(timer);
}, [successMsg]);
//
  const totalDoctors = doctors.length;
  const totalPatients = patients.length;
  const totalAppointments = appointments.length;

  const onDoctorChange = (e) => {
    setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
  };

  const resetDoctorForm = () => {
    setDoctorForm(emptyDoctor);
    setEditingDoctorId(null);
  };

  const onDoctorSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSavingDoctor(true);
    setSuccessMsg(''); // clear previous message

    try {
      const payload = {
        name: doctorForm.name,
        email: doctorForm.email,
        specialization: doctorForm.specialization,
        experience: Number(doctorForm.experience) || 0,
        fees: Number(doctorForm.fees) || 0,
        timings: doctorForm.timings,
        photo: doctorForm.photo   // NEW
      };

      if (editingDoctorId) {
        // update create and reaload
        await api.put(`/api/doctors/${editingDoctorId}`, payload);
        setSuccessMsg('Doctor updated successfully!');   // <-- update message
      } else {
        await api.post('/api/doctors', payload);
        setSuccessMsg('Doctor added successfully!');     // <-- add message
      }

      const docRes = await api.get('/api/doctors');
      const docs = Array.isArray(docRes.data)
        ? docRes.data
        : docRes.data.doctors || [];
      setDoctors(docs);
      resetDoctorForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save doctor');
    } finally {
      setSavingDoctor(false);
    }
  };

  const onEditDoctor = (doc) => {
    setEditingDoctorId(doc._id);
    setDoctorForm({
      name: doc.name || '',
      email: doc.email || '',
      specialization: doc.specialization || '',
      experience: doc.experience || '',
      fees: doc.fees || '',
      timings: doc.timings || '',
      photo: doc.photo || ''
    });
    setActiveTab('doctors');
  };

  const onDeleteDoctor = async (id) => {
    const ok = window.confirm('Delete this doctor?');
    if (!ok) return;
    try {
      await api.delete(`/api/doctors/${id}`);
      setDoctors((prev) => prev.filter((d) => d._id !== id));
      setSuccessMsg('Doctor deleted successfully!');   // <-- delete message
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete doctor');
    }
  };

  // change status
  const onChangeStatus = async (apptId, newStatus) => {
    try {
      setError('');
      await api.put(`/api/appointments/${apptId}`, { status: newStatus });

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === apptId
            ? { ...a, status: newStatus }
            : a
        )
      );
      setSuccessMsg('Appointment status updated successfully!'); // optional
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      {/* slidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="logo-text">
            <span className="logo-main">MediCare</span>
            <span className="logo-sub">Plus</span>
          </div>
        </div>

        <nav className="admin-menu">
          <button
            className={`admin-menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`admin-menu-item ${activeTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            Doctors
          </button>
          <button
            className={`admin-menu-item ${activeTab === 'patients' ? 'active' : ''}`}
            onClick={() => setActiveTab('patients')}
          >
            Patients
          </button>
          <button
            className={`admin-menu-item ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
        </nav>

        <button className="admin-logout" onClick={logout}>
          Logout
        </button>
      </aside>

      <section className="admin-content">
        <header className="admin-header">
          <h1>Admin Panel</h1>
          <span className="admin-tag">Admin</span>
        </header>

        {error && <p className="error-text">{error}</p>}
        {successMsg && <div className="success-box">{successMsg}</div>} {/* <-- success text */}
        {loading && <p className="info-text">Loading data...</p>}

        <div className="admin-stats">
          <div className="admin-stat-card">
            <p>Total Doctors</p>
            <h2>{totalDoctors}</h2>
          </div>
          <div className="admin-stat-card">
            <p>Total Patients</p>
            <h2>{totalPatients}</h2>
          </div>
          <div className="admin-stat-card">
            <p>Total Appointments</p>
            <h2>{totalAppointments}</h2>
          </div>
        </div>

        {/* Tabs */}

        {activeTab === 'dashboard' && (
          <div className="admin-section">
            <h2>Overview</h2>
            <p className="section-subtitle">
              Manage doctors, patients, and appointments from the left menu.
            </p>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h2>Doctors</h2>
              <button type="button" className="btn primary" onClick={resetDoctorForm}>
                + New Doctor
              </button>
            </div>

            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Fees</th>
                    <th>Timings</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((d) => (
                    <tr key={d._id}>
                      <td>{d.name}</td>
                      <td>{d.specialization}</td>
                      <td>{d.experience} yrs</td>
                      <td>₹{d.fees}</td>
                      <td>{d.timings}</td>
                      <td>
                        <button
                          type="button"
                          className="link-btn"
                          onClick={() => onEditDoctor(d)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="link-btn danger"
                          onClick={() => onDeleteDoctor(d._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {doctors.length === 0 && !loading && (
                    <tr>
                      <td colSpan="6">No doctors yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="admin-form-card">
              <h3>{editingDoctorId ? 'Edit Doctor' : 'Add Doctor'}</h3>

              <form onSubmit={onDoctorSubmit} className="form">
                <label>
                  Name
                  <input
                    type="text"
                    name="name"
                    value={doctorForm.name}
                    onChange={onDoctorChange}
                    required
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={doctorForm.email}
                    onChange={onDoctorChange}
                    required
                  />
                </label>

                <label>
                  Specialization
                  <input
                    type="text"
                    name="specialization"
                    value={doctorForm.specialization}
                    onChange={onDoctorChange}
                    required
                  />
                </label>

                <label>
                  Experience (years)
                  <input
                    type="number"
                    name="experience"
                    min="0"
                    value={doctorForm.experience}
                    onChange={onDoctorChange}
                    required
                  />
                </label>

                <label>
                  Fees (₹)
                  <input
                    type="number"
                    name="fees"
                    min="0"
                    value={doctorForm.fees}
                    onChange={onDoctorChange}
                    required
                  />
                </label>

                <label>
                  Timings
                  <input
                    type="text"
                    name="timings"
                    placeholder="e.g. 10 AM - 4 PM"
                    value={doctorForm.timings}
                    onChange={onDoctorChange}
                    required
                  />
                </label>
                <label>
                  Photo URL
                  <input
                   type="text"
                   name="photo"
                   placeholder="https://example.com/doctor.jpg"
                   value={doctorForm.photo}
                   onChange={onDoctorChange}
                   />
                  </label>

                <button type="submit" className="btn primary" disabled={savingDoctor}>
                  {savingDoctor
                    ? 'Saving...'
                    : editingDoctorId
                    ? 'Update Doctor'
                    : 'Add Doctor'}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h2>Patients</h2>
            </div>

            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p) => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.email}</td>
                      <td>
                        {p.createdAt
                          ? new Date(p.createdAt).toLocaleString()
                          : '-'}
                      </td>
                    </tr>
                  ))}
                  {patients.length === 0 && !loading && (
                    <tr>
                      <td colSpan="3">No patients found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h2>Appointments</h2>
            </div>

            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Details</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => {
                    const patientName = a.patient?.name || 'Patient';
                    const doctorName =
                      a.doctor?.name || a.doctor?.user?.name || 'Doctor';

                    return (
                      <tr key={a._id}>
                        <td>{patientName}</td>
                        <td>{doctorName}</td>
                        <td>
                          {a.date ? new Date(a.date).toLocaleString() : '-'}
                        </td>
                        <td style={{ whiteSpace: 'pre-line', fontSize: '12px' }}>
                          {a.reason}
                        </td>
                        <td>
                          <select
                            value={a.status}
                            onChange={(e) =>
                              onChangeStatus(a._id, e.target.value)
                            }
                          >
                            <option value="pending">pending</option>
                            <option value="approved">approved</option>
                            <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                  {appointments.length === 0 && !loading && (
                    <tr>
                      <td colSpan="5">No appointments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
