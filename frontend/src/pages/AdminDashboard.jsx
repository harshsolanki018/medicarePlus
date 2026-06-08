import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingDoctor, setSavingDoctor] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const emptyDoctor = {
    name: '',
    email: '',
    specialization: '',
    experience: '',
    fees: '',
    timings: '',
    photo: '',
  };

  const [doctorForm, setDoctorForm] = useState(emptyDoctor);
  const [editingDoctorId, setEditingDoctorId] = useState(null);

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
        setSuccessMsg('');

        const docRes = await api.get('/api/doctors');
        const docs = Array.isArray(docRes.data) ? docRes.data : docRes.data.doctors || [];
        setDoctors(docs);

        try {
          const patRes = await api.get('/api/auth/patients');
          const pats = Array.isArray(patRes.data) ? patRes.data : patRes.data.patients || [];
          setPatients(pats);
        } catch {
          setPatients([]);
        }

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

  useEffect(() => {
    if (!successMsg) return undefined;

    const timer = setTimeout(() => {
      setSuccessMsg('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [successMsg]);

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

  const openSection = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const onDoctorSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSavingDoctor(true);
    setSuccessMsg('');

    try {
      const payload = {
        name: doctorForm.name,
        email: doctorForm.email,
        specialization: doctorForm.specialization,
        experience: Number(doctorForm.experience) || 0,
        fees: Number(doctorForm.fees) || 0,
        timings: doctorForm.timings,
        photo: doctorForm.photo,
      };

      if (editingDoctorId) {
        await api.put(`/api/doctors/${editingDoctorId}`, payload);
        setSuccessMsg('Doctor updated successfully!');
      } else {
        await api.post('/api/doctors', payload);
        setSuccessMsg('Doctor added successfully!');
      }

      const docRes = await api.get('/api/doctors');
      const docs = Array.isArray(docRes.data) ? docRes.data : docRes.data.doctors || [];
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
      photo: doc.photo || '',
    });
    setActiveTab('doctors');
    setSidebarOpen(false);
  };

  const onDeleteDoctor = async (id) => {
    const ok = window.confirm('Delete this doctor?');
    if (!ok) return;

    try {
      await api.delete(`/api/doctors/${id}`);
      setDoctors((prev) => prev.filter((d) => d._id !== id));
      setSuccessMsg('Doctor deleted successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete doctor');
    }
  };

  const onChangeStatus = async (apptId, newStatus) => {
    try {
      setError('');
      await api.put(`/api/appointments/${apptId}`, { status: newStatus });

      setAppointments((prev) =>
        prev.map((a) => (a._id === apptId ? { ...a, status: newStatus } : a))
      );
      setSuccessMsg('Appointment status updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setSidebarOpen(false);
    navigate('/login');
  };

  const inputClass =
    'w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100';
  const menuClass = (tab) =>
    `w-full rounded-xl px-3 py-2 text-left text-sm transition ${
      activeTab === tab
        ? 'bg-slate-800 text-white shadow-inner shadow-slate-950/30'
        : 'text-slate-200 hover:bg-slate-800/80'
    }`;
  const statusOptions = ['pending', 'approved', 'completed', 'cancelled'];

  return (
    <div className="relative flex flex-col gap-3 rounded-2xl bg-slate-200 p-2 shadow-2xl shadow-slate-900/15 lg:flex-row">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close admin sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-80 max-w-[85vw] -translate-x-full transform gap-4 overflow-y-auto rounded-r-2xl bg-slate-900 p-4 text-slate-100 shadow-2xl shadow-slate-950/40 transition-transform duration-300 lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 lg:rounded-xl ${
          sidebarOpen ? 'translate-x-0' : ''
        }`}
      >
        <div className="mb-4 flex items-center justify-between gap-3 lg:justify-start">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/30">
              +
            </div>
            <div className="leading-tight">
              <span className="block text-base font-semibold">MediCare</span>
              <span className="block text-sm text-blue-300">Plus</span>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 text-slate-100 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <button className={menuClass('dashboard')} onClick={() => openSection('dashboard')}>
            Dashboard
          </button>
          <button className={menuClass('doctors')} onClick={() => openSection('doctors')}>
            Doctors
          </button>
          <button className={menuClass('patients')} onClick={() => openSection('patients')}>
            Patients
          </button>
          <button
            className={menuClass('appointments')}
            onClick={() => openSection('appointments')}
          >
            Appointments
          </button>
        </nav>

        <button
          className="mt-4 inline-flex items-center justify-center rounded-xl border border-red-500 px-3 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/10"
          onClick={logout}
        >
          Logout
        </button>
      </aside>

      <section className="flex-1 rounded-xl bg-slate-50 p-5">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-sm lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open admin sidebar"
            >
              ☰
            </button>
            <h1 className="text-2xl font-semibold text-slate-900">Admin Panel</h1>
          </div>
          <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
            Admin
          </span>
        </header>

        {error && <p className="mb-3 text-sm font-medium text-red-700">{error}</p>}
        {successMsg && (
          <div className="mb-3 rounded-lg border border-sky-200 bg-sky-100 px-4 py-3 text-sm font-medium text-sky-900">
            {successMsg}
          </div>
        )}
        {loading && <p className="mb-3 text-sm font-medium text-blue-700">Loading data...</p>}

        <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl bg-blue-600 px-4 py-3 text-white shadow-lg shadow-blue-600/25">
            <p className="text-sm text-blue-100">Total Doctors</p>
            <h2 className="mt-1 text-2xl font-semibold">{totalDoctors}</h2>
          </div>
          <div className="rounded-2xl bg-blue-600 px-4 py-3 text-white shadow-lg shadow-blue-600/25">
            <p className="text-sm text-blue-100">Total Patients</p>
            <h2 className="mt-1 text-2xl font-semibold">{totalPatients}</h2>
          </div>
          <div className="rounded-2xl bg-blue-600 px-4 py-3 text-white shadow-lg shadow-blue-600/25">
            <p className="text-sm text-blue-100">Total Appointments</p>
            <h2 className="mt-1 text-2xl font-semibold">{totalAppointments}</h2>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
            <p className="text-sm text-slate-600">
              Manage doctors, patients, and appointments from the left menu.
            </p>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">Doctors</h2>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
                onClick={resetDoctorForm}
              >
                + New Doctor
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Specialization</th>
                    <th className="px-4 py-3 font-semibold">Experience</th>
                    <th className="px-4 py-3 font-semibold">Fees</th>
                    <th className="px-4 py-3 font-semibold">Timings</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((d) => (
                    <tr key={d._id} className="border-t border-slate-200">
                      <td className="px-4 py-3">{d.name}</td>
                      <td className="px-4 py-3">{d.specialization}</td>
                      <td className="px-4 py-3">{d.experience} yrs</td>
                      <td className="px-4 py-3">₹{d.fees}</td>
                      <td className="px-4 py-3">{d.timings}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            className="text-sm font-medium text-blue-600 transition hover:text-blue-800"
                            onClick={() => onEditDoctor(d)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-sm font-medium text-red-600 transition hover:text-red-800"
                            onClick={() => onDeleteDoctor(d._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {doctors.length === 0 && !loading && (
                    <tr className="border-t border-slate-200">
                      <td colSpan="6" className="px-4 py-4 text-center text-slate-500">
                        No doctors yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingDoctorId ? 'Edit Doctor' : 'Add Doctor'}
              </h3>

              <form onSubmit={onDoctorSubmit} className="mt-4 flex flex-col gap-4">
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={doctorForm.name}
                    onChange={onDoctorChange}
                    required
                    className={inputClass}
                  />
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={doctorForm.email}
                    onChange={onDoctorChange}
                    required
                    className={inputClass}
                  />
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Specialization
                  <input
                    type="text"
                    name="specialization"
                    value={doctorForm.specialization}
                    onChange={onDoctorChange}
                    required
                    className={inputClass}
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                    Experience (years)
                    <input
                      type="number"
                      name="experience"
                      min="0"
                      value={doctorForm.experience}
                      onChange={onDoctorChange}
                      required
                      className={inputClass}
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                    Fees (₹)
                    <input
                      type="number"
                      name="fees"
                      min="0"
                      value={doctorForm.fees}
                      onChange={onDoctorChange}
                      required
                      className={inputClass}
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Timings
                  <input
                    type="text"
                    name="timings"
                    placeholder="e.g. 10 AM - 4 PM"
                    value={doctorForm.timings}
                    onChange={onDoctorChange}
                    required
                    className={inputClass}
                  />
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Photo URL
                  <input
                    type="text"
                    name="photo"
                    placeholder="https://example.com/doctor.jpg"
                    value={doctorForm.photo}
                    onChange={onDoctorChange}
                    className={inputClass}
                  />
                </label>

                <button
                  type="submit"
                  disabled={savingDoctor}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
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
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Patients</h2>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p) => (
                    <tr key={p._id} className="border-t border-slate-200">
                      <td className="px-4 py-3">{p.name}</td>
                      <td className="px-4 py-3">{p.email}</td>
                      <td className="px-4 py-3">
                        {p.createdAt ? new Date(p.createdAt).toLocaleString() : '-'}
                      </td>
                    </tr>
                  ))}
                  {patients.length === 0 && !loading && (
                    <tr className="border-t border-slate-200">
                      <td colSpan="3" className="px-4 py-4 text-center text-slate-500">
                        No patients found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Appointments</h2>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Patient</th>
                    <th className="px-4 py-3 font-semibold">Doctor</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Details</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => {
                    const patientName = a.patient?.name || 'Patient';
                    const doctorName = a.doctor?.name || a.doctor?.user?.name || 'Doctor';

                    return (
                      <tr key={a._id} className="border-t border-slate-200">
                        <td className="px-4 py-3">{patientName}</td>
                        <td className="px-4 py-3">{doctorName}</td>
                        <td className="px-4 py-3">
                          {a.date ? new Date(a.date).toLocaleString() : '-'}
                        </td>
                        <td className="whitespace-pre-line px-4 py-3 text-xs text-slate-700">
                          {a.reason}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={a.status || 'pending'}
                            onChange={(e) => onChangeStatus(a._id, e.target.value)}
                            className={inputClass}
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                  {appointments.length === 0 && !loading && (
                    <tr className="border-t border-slate-200">
                      <td colSpan="5" className="px-4 py-4 text-center text-slate-500">
                        No appointments found.
                      </td>
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
