// Home.js

import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <nav className="nav">
          <div className="left-section">
            <a href="/" className="site-title">MedWin Care</a>
            <a href="/HomeDoctor" className="nav-link">Our Doctors</a>
            <a href="/BookAppointments" className="nav-link">Appointment</a>
            <a href="/PatientRegistration" className="nav-link">Register</a>
            <a href="/Patientlogin" className="nav-link">Login</a>
          
        </div>
      </nav>
      <header className="hero-section">
        <h1>Welcome to MedWin Care</h1>
        <p>Transforming Healthcare with Innovation</p>
        <a href="/about" className="cta-button">Learn More</a>
      </header>
      <section className="features-section">
        <div className="container">
          <h2>Key Features</h2>
          <div className="feature">
            <i className="icon fas fa-calendar"></i>
            <h3>Appointment Scheduling</h3>
            <p>Schedule appointments with ease and manage your calendar efficiently.</p>
          </div>
          <div className="feature">
            <i className="icon fas fa-user-md"></i>
            <h3>Find the Right Doctor</h3>
            <p>Discover and connect with the best healthcare professionals in your area.</p>
          </div>
          <div className="feature">
            <i className="icon fas fa-user"></i>
            <h3>Patient Registration</h3>
            <p>Register as a patient to access personalized healthcare services.</p>
          </div>
        </div>
      </section>
      <section className="testimonial-section">
        <div className="container">
          <h2>What Our Patients Say</h2>
          <div className="testimonial">
            <div className="quote">
              <i className="fas fa-quote-left"></i>
              <p>MedWin Care has made managing my appointments so convenient. I can easily find and book appointments with doctors in my area.</p>
            </div>
            <div className="author">
            </div>
          </div>
          <div className="testimonial">
            <div className="quote">
              <i className="fas fa-quote-left"></i>
              <p>The doctors on MedWin Care are highly skilled and provide excellent healthcare services. I highly recommend this platform.</p>
            </div>
            <div className="author">
            </div>
          </div>
        </div>
      </section>
      </div>
  );
}
