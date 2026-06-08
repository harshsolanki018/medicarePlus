import { Link } from 'react-router-dom';

function Home() {
  
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content hero-animate">
          <p className="hero-badge">Trusted Online Healthcare</p>
          <h1>
            Your Health, Our Priority at <span>MediCare Plus</span>
          </h1>
          <p className="hero-subtitle">
            Book appointments with trusted doctors, manage your visits, and get care
            on time with our simple online system.
          </p>
          <div className="hero-actions">
            <Link to="/book-appointment" className="btn primary">
              Book Appointment
            </Link>
            <Link to="/doctors" className="btn ghost">
              View Doctors
            </Link>
          </div>
          <div className="hero-tags">
            <span>Instant Booking</span>
            <span>No Long Queues</span>
            <span>Verified Doctors</span>
          </div>
        </div>

        <div className="hero-visual hero-animate-delay">
          <div className="hero-image-wrapper">
            <img
              src="src\assets\slot_img.jpg"
              alt="Doctors discussing patient care"
            />
            <div className="hero-floating-card">
              <p className="hero-floating-title">Today’s Availability</p>
              <p className="hero-floating-text">25+ Open Slots</p>
              <p className="hero-floating-sub">Book now and avoid long waiting time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="info-grid section">
        <div className="info-card card-hover">
          <h3>24/7 Access</h3>
          <p>Book appointments anytime, from anywhere using our web portal.</p>
        </div>
        <div className="info-card card-hover">
          <h3>Specialist Care</h3>
          <p>Browse doctors by specialization and experience before you book.</p>
        </div>
        <div className="info-card card-hover">
          <h3>Simple Dashboard</h3>
          <p>Patients can quickly see all their upcoming and past visits.</p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Services we help you access</h2>
        <p className="section-subtitle">
          MediCare Plus connects you with the right doctor for your needs.
        </p>
        <div className="services-grid">
          <div className="service-card card-hover">
            <h3>General Checkups</h3>
            <p>
              Routine consultations for fever, cough, fatigue, and general health
              concerns.
            </p>
          </div>
          <div className="service-card card-hover">
            <h3>Specialist Visits</h3>
            <p>
              Quickly find cardiologists, dermatologists, pediatricians and more in one
              place.
            </p>
          </div>
          <div className="service-card card-hover">
            <h3>Follow-up Appointments</h3>
            <p>
              Easily schedule follow-ups with your doctor and keep your treatment on
              track.
            </p>
          </div>
          <div className="service-card card-hover">
            <h3>Clinic & OPD Slots</h3>
            <p>
              See available slots and pick a time that fits your schedule perfectly.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">How MediCare Plus works</h2>
        <div className="steps">
          <div className="step-card card-hover">
            <div className="step-number">1</div>
            <h3>Create your account</h3>
            <p>Sign up as a patient in a few seconds with your basic details.</p>
          </div>
          <div className="step-card card-hover">
            <div className="step-number">2</div>
            <h3>Choose a doctor</h3>
            <p>
              Browse specialists, compare experience and book the right one for you.
            </p>
          </div>
          <div className="step-card card-hover">
            <div className="step-number">3</div>
            <h3>Visit on your time</h3>
            <p>
              Arrive at the clinic at your booked slot and avoid long waiting time.
            </p>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="stat-item">
          <h3>50+</h3>
          <p>Registered doctors</p>
        </div>
        <div className="stat-item">
          <h3>500+</h3>
          <p>Appointments managed</p>
        </div>
        <div className="stat-item">
          <h3>24/7</h3>
          <p>Booking available</p>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to book your next visit?</h2>
          <p>
            Create your MediCare Plus account and schedule an appointment in just a few
            clicks.
          </p>
        </div>
        <div className="cta-actions">
          <Link to="/register" className="btn primary">
            Get Started
          </Link>
          <Link to="/login" className="btn ghost" style={{ color: 'white' }}>
            I already have an account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
