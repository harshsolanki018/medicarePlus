function About() {
  return (
    <div className="page">
      <h2>About MediCare Plus</h2>

      <p className="section-subtitle">
        Helping patients book appointments easily and connect with trusted doctors.
      </p>

      <div className="card about-card">
        <h3>Who We Are</h3>
        <p>
          MediCare Plus is a modern healthcare appointment system that helps 
          patients book appointments with verified doctors quickly and easily.
          Our goal is to reduce waiting times and make medical care more accessible.
        </p>

        <h3>Our Mission</h3>
        <p>
          To provide a reliable, simple, and fast online platform where patients 
          can manage their medical visits without stress.
        </p>

        <h3>What We Offer</h3>
        <ul className="about-list">
          <li>Find trusted doctors and specialists</li>
          <li>Instant online appointment booking</li>
          <li>Flexible timing based on doctor's availability</li>
          <li>Secure user accounts and data protection</li>
          <li>Easy dashboard for patients and admin</li>
        </ul>

        <h3>Why Choose Us?</h3>
        <p>
          MediCare Plus combines ease of use with modern features designed for 
          both patients and healthcare providers. Whether you need a quick checkup 
          or a specialist consultation, MediCare Plus connects you instantly.
        </p>
      </div>
    </div>
  );
}

export default About;
