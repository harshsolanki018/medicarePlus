import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <h3 className="footer-logo">
              MediCare <span>Plus</span>
            </h3>
            <p className="footer-text">
              Simple appointment booking to help you reach the right doctor on time.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/" className="flink">Home</Link>
              </li>
              <li>
                <Link to="/doctors" className="flink">Doctors</Link>
              </li>
              <li>
                <Link to="/book-appointment" className="flink">Book Appointment</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MediCare Plus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
