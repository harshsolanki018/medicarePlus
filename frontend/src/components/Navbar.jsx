import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          MediCare <span>Plus</span>
        </Link>
      </div>

      {/* Links */}
      <div className="nav-right">

        {/* Always display */}
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/doctors" className="nav-link">Doctors</Link>
        <Link to="/about" className="nav-link">About Us</Link>

        {/* Patient */}
        {user && user.role === 'patient' && (
          <>
            <Link to="/book-appointment" className="nav-link">
              Book
            </Link>
            <Link to="/dashboard" className="nav-link">
              My Appointments
            </Link>
          </>
        )}

        {/* Admin */}
        {user && user.role === 'admin' && (
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        )}

        {/* without login */}
        {!user && (
          <>
            <Link to="/login" className="nav-button ghost">Login</Link>
            <Link to="/register" className="nav-button primary">Sign Up</Link>
          </>
        )}

       {/* Log In */}
        {user && (
          <button onClick={logout} className="nav-button ghost">
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
