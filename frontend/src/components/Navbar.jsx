import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    closeMenu();
    navigate('/login');
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-30 border-b border-slate-700/40 bg-slate-900/90 text-slate-100 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link to="/" className="text-xl font-bold tracking-wide text-slate-100">
          MediCare <span className="text-sky-400">Plus</span>
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-600 text-slate-100 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400/40 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="text-xl leading-none">{menuOpen ? '✕' : '☰'}</span>
        </button>

        <div className="hidden items-center gap-4 text-sm md:flex md:flex-wrap md:justify-end">
          <NavLinks user={user} logout={logout} onNavigate={closeMenu} />
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-slate-700/40 transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-3 text-sm">
            <NavLinks user={user} logout={logout} mobile onNavigate={closeMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ user, logout, mobile = false, onNavigate }) {
  const linkClass =
    'relative pb-0.5 text-slate-200 transition hover:text-white after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-sky-400 after:to-indigo-500 after:transition-all hover:after:w-full';
  const buttonClass =
    'inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/40';

  return (
    <div className={`flex ${mobile ? 'flex-col' : 'flex-row'} ${mobile ? 'gap-3' : 'gap-4'} items-start md:items-center`}>
      <Link to="/" className={linkClass} onClick={onNavigate}>
        Home
      </Link>
      <Link to="/doctors" className={linkClass} onClick={onNavigate}>
        Doctors
      </Link>
      <Link to="/about" className={linkClass} onClick={onNavigate}>
        About Us
      </Link>

      {user && user.role === 'patient' && (
        <>
          <Link to="/book-appointment" className={linkClass} onClick={onNavigate}>
            Book
          </Link>
          <Link to="/dashboard" className={linkClass} onClick={onNavigate}>
            My Appointments
          </Link>
        </>
      )}

      {user && user.role === 'admin' && (
        <Link to="/admin" className={linkClass} onClick={onNavigate}>
          Admin
        </Link>
      )}

      {!user && (
        <>
          <Link
            to="/login"
            className={`${buttonClass} ${mobile ? 'w-full' : ''} border-slate-500/70 text-slate-100 hover:bg-slate-800/70`}
            onClick={onNavigate}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`${buttonClass} ${mobile ? 'w-full' : ''} border-sky-500/30 bg-sky-500 text-white shadow-lg shadow-sky-500/30 hover:bg-sky-600`}
            onClick={onNavigate}
          >
            Sign Up
          </Link>
        </>
      )}

      {user && (
        <button
          onClick={logout}
          className={`${buttonClass} ${mobile ? 'w-full' : ''} border-slate-500/70 text-slate-100 hover:bg-slate-800/70`}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
