function About() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">About MediCare Plus</h2>

      <p className="max-w-3xl text-sm text-slate-600">
        Helping patients book appointments easily and connect with trusted doctors.
      </p>

      <div className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-900/5">
        <h3 className="mt-0 text-lg font-semibold text-slate-900">Who We Are</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          MediCare Plus is a modern healthcare appointment system that helps patients book
          appointments with verified doctors quickly and easily. Our goal is to reduce
          waiting times and make medical care more accessible.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Our Mission</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          To provide a reliable, simple, and fast online platform where patients can manage
          their medical visits without stress.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">What We Offer</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Find trusted doctors and specialists</li>
          <li>Instant online appointment booking</li>
          <li>Flexible timing based on doctor&apos;s availability</li>
          <li>Secure user accounts and data protection</li>
          <li>Easy dashboard for patients and admin</li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Why Choose Us?</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          MediCare Plus combines ease of use with modern features designed for both patients
          and healthcare providers. Whether you need a quick checkup or a specialist
          consultation, MediCare Plus connects you instantly.
        </p>
      </div>
    </div>
  );
}

export default About;
