import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const ADMIN_EMAIL = 'admin@medicareplus.com';
  const ADMIN_PASS = 'Admin@123';

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASS) {
      const adminData = {
        email: ADMIN_EMAIL,
        role: 'admin',
        name: 'Admin User',
      };

      localStorage.setItem('user', JSON.stringify(adminData));
      localStorage.setItem('token', 'admin-static-token');
      return navigate('/admin');
    }

    try {
      const res = await api.post('/api/auth/login', form);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="mx-auto mt-32 w-full max-w-md rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-900/10">
      <h2 className="text-2xl font-semibold text-slate-900">Login to MediCare Plus</h2>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
