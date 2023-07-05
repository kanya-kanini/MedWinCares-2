import React, { useEffect, useState } from 'react';
import './HomeDoctor.css'
const HomeDoctor = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('https://localhost:7089/api/doctors/doctors-with-patients');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.log('Error fetching doctors:', error);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center">Doctors in Our Hospital</h1>
      <div className="row">
        {doctors.map((doctor, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <img src={`/Img/${doctor.imageName}`} className="card-img-top" alt="Doctor" />
              <div className="card-body">
                <h5 className="card-title">{doctor.doctorName}</h5>
                <p className="card-text">Mobile: {doctor.doctorMobile}</p>
                <p className="card-text">Specialization: {doctor.specialization}</p>
                <p className="card-text">Experience: {doctor.doctor_Experience}</p>
                <p className="card-text">Consulting Day: {doctor.constulting_Day}</p>
                <p className="card-text">Consulting Time: {doctor.constulting_Time}</p>
                <p className="card-text">Review: {doctor.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDoctor;