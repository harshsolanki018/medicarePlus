import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage('');
      await api.post('/api/auth/register', form);
      setMessage('Registered successfully! You can login now.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="mx-auto mt-32 w-full max-w-md rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-900/10">
      <h2 className="text-2xl font-semibold text-slate-900">Create Patient Account</h2>
      {message && <p className="mt-3 text-sm text-blue-700">{message}</p>}

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Full Name
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;
