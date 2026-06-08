/* Main app routes for MediCare Plus */

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import DoctorList from './pages/DoctorList.jsx';
import BookAppointment from './pages/BookAppointment.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#e0f2fe_0,_#f5f7fb_45%,_#eef2ff_100%)] text-slate-900">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-28 sm:pt-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
