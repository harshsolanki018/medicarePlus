import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-start gap-3 rounded-[28px] bg-white/85 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] sm:p-5 lg:gap-8 lg:p-8">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-emerald-500 before:shadow-[0_0_0_4px_rgba(34,197,94,0.22)] before:content-['']">
            Trusted Online Healthcare
          </p>
          <div className="space-y-3">
            <h1 className="max-w-2xl text-[clamp(1.9rem,5.3vw,4rem)] font-bold leading-tight text-slate-900">
              Your Health, Our Priority at <span className="text-blue-600">MediCare Plus</span>
            </h1>
            <p className="max-w-2xl text-[clamp(0.92rem,2.2vw,1.05rem)] leading-relaxed text-slate-600">
              Book appointments with trusted doctors, manage your visits, and get care on
              time with our simple online system.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/book-appointment"
              className="inline-flex min-w-0 items-center justify-center whitespace-nowrap rounded-full border border-blue-600 bg-blue-600 px-3 py-2 text-[11px] font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Book Appointment
            </Link>
            <Link
              to="/doctors"
              className="inline-flex min-w-0 items-center justify-center whitespace-nowrap rounded-full border border-slate-300 bg-transparent px-3 py-2 text-[11px] font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-white/70 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              View Doctors
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-600 sm:text-xs">
            <span className="min-w-0 whitespace-nowrap rounded-full bg-slate-200/70 px-2 py-1 text-center">
              Instant Booking
            </span>
            <span className="min-w-0 whitespace-nowrap rounded-full bg-slate-200/70 px-2 py-1 text-center">
              No Long Queues
            </span>
            <span className="min-w-0 whitespace-nowrap rounded-full bg-slate-200/70 px-2 py-1 text-center">
              Verified Doctors
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full overflow-hidden rounded-[22px] bg-slate-900 shadow-2xl shadow-slate-900/40">
            <img
              src="/slot_img.jpg"
              alt="Doctors discussing patient care"
              className="h-[220px] w-full object-cover opacity-85 saturate-105 sm:h-[300px] lg:h-[360px]"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-slate-900/90 px-4 py-3 text-slate-100 shadow-xl shadow-slate-900/50">
              <p className="text-xs uppercase tracking-wide text-slate-400">Today&apos;s Availability</p>
              <p className="text-lg font-semibold">25+ Open Slots</p>
              <p className="text-xs text-slate-300">Book now and avoid long waiting time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-slate-900/10">
          <h3 className="mb-2 text-base font-semibold text-slate-900">24/7 Access</h3>
          <p className="text-sm text-slate-600">
            Book appointments anytime, from anywhere using our web portal.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-slate-900/10">
          <h3 className="mb-2 text-base font-semibold text-slate-900">Specialist Care</h3>
          <p className="text-sm text-slate-600">
            Browse doctors by specialization and experience before you book.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-slate-900/10">
          <h3 className="mb-2 text-base font-semibold text-slate-900">Simple Dashboard</h3>
          <p className="text-sm text-slate-600">
            Patients can quickly see all their upcoming and past visits.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Services we help you access</h2>
          <p className="mt-2 text-sm text-slate-600">
            MediCare Plus connects you with the right doctor for your needs.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-slate-900/10">
            <h3 className="mb-2 text-base font-semibold text-slate-900">General Checkups</h3>
            <p className="text-sm text-slate-600">
              Routine consultations for fever, cough, fatigue, and general health concerns.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-slate-900/10">
            <h3 className="mb-2 text-base font-semibold text-slate-900">Specialist Visits</h3>
            <p className="text-sm text-slate-600">
              Quickly find cardiologists, dermatologists, pediatricians and more in one place.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-slate-900/10">
            <h3 className="mb-2 text-base font-semibold text-slate-900">Follow-up Appointments</h3>
            <p className="text-sm text-slate-600">
              Easily schedule follow-ups with your doctor and keep your treatment on track.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-slate-900/10">
            <h3 className="mb-2 text-base font-semibold text-slate-900">Clinic & OPD Slots</h3>
            <p className="text-sm text-slate-600">
              See available slots and pick a time that fits your schedule perfectly.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">How MediCare Plus works</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="relative rounded-2xl border border-slate-200 bg-white/95 p-4 pt-9 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-slate-900/10">
            <div className="absolute left-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-xs font-semibold text-white shadow-lg shadow-blue-600/35">
              1
            </div>
            <h3 className="mb-2 text-base font-semibold text-slate-900">Create your account</h3>
            <p className="text-sm text-slate-600">
              Sign up as a patient in a few seconds with your basic details.
            </p>
          </div>
          <div className="relative rounded-2xl border border-slate-200 bg-white/95 p-4 pt-9 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-slate-900/10">
            <div className="absolute left-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-xs font-semibold text-white shadow-lg shadow-blue-600/35">
              2
            </div>
            <h3 className="mb-2 text-base font-semibold text-slate-900">Choose a doctor</h3>
            <p className="text-sm text-slate-600">
              Browse specialists, compare experience and book the right one for you.
            </p>
          </div>
          <div className="relative rounded-2xl border border-slate-200 bg-white/95 p-4 pt-9 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-slate-900/10">
            <div className="absolute left-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-xs font-semibold text-white shadow-lg shadow-blue-600/35">
              3
            </div>
            <h3 className="mb-2 text-base font-semibold text-slate-900">Visit on your time</h3>
            <p className="text-sm text-slate-600">
              Arrive at the clinic at your booked slot and avoid long waiting time.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap justify-around gap-4 rounded-[20px] bg-slate-900 px-6 py-5 text-white shadow-2xl shadow-slate-900/30">
        <div>
          <h3 className="text-2xl font-bold">50+</h3>
          <p className="text-sm text-slate-300">Registered doctors</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">500+</h3>
          <p className="text-sm text-slate-300">Appointments managed</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">24/7</h3>
          <p className="text-sm text-slate-300">Booking available</p>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-[22px] bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white shadow-2xl shadow-blue-600/35 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold">Ready to book your next visit?</h2>
          <p className="mt-2 text-sm text-white/90">
            Create your MediCare Plus account and schedule an appointment in just a few clicks.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            I already have an account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
