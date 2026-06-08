
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@medicareplus.com";
  const ADMIN_PASS = "Admin@123";

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASS) {
      const adminData = {
        email: ADMIN_EMAIL,
        role: "admin",
        name: "Admin User"
      };

      localStorage.setItem("user", JSON.stringify(adminData));
      localStorage.setItem("token", "admin-static-token");
      return navigate("/admin");
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
    <div className="auth-card">
      <h2>Login to MediCare Plus</h2>
      {error && <p className="error-text">{error}</p>}

      <form onSubmit={onSubmit} className="form">
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
          />
        </label>

        <button type="submit" className="btn primary full">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
