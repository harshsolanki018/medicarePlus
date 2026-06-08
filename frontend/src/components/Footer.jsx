import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-10 bg-slate-950 text-slate-200">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold tracking-wide sm:text-2xl">
              MediCare <span className="text-sky-400">Plus</span>
            </h3>
            <p className="max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Simple appointment booking to help you reach the right doctor on time.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-100">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-sky-400 transition hover:text-sky-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-sky-400 transition hover:text-sky-300">
                  Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="/book-appointment"
                  className="text-sky-400 transition hover:text-sky-300"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-4 text-center text-xs text-slate-500 sm:text-sm">
          <p>&copy; {new Date().getFullYear()} MediCare Plus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
