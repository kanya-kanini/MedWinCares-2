import React, { useState } from 'react';
import axios from 'axios';

const PatientRegistration = () => {
  const [patientData, setPatientData] = useState({
    patient: {
      patient_Name: '',
      age: 0,
      gender: '',
      bloodGroup: '',
      patient_Address: '',
      patient_Phone: 0,
      patient_Email: '',
      patient_UserName: '',
      Patient_HashedPassword: 'pass',
    },
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevState) => ({
      ...prevState,
      patient: {
        ...prevState.patient,
        [name]: value,
      },
    }));
  };

  const handlePasswordChange = (e) => {
    setPatientData((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://localhost:7010/api/Patient',
        patientData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="patient_Name">Name</label>
            <input
              type="text"
              name="patient_Name"
              value={patientData.patient.patient_Name}
              onChange={handleInputChange}
              className="form-control"
              id="patient_Name"
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              value={patientData.patient.age}
              onChange={handleInputChange}
              className="form-control"
              id="age"
              placeholder="Age"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              name="gender"
              value={patientData.patient.gender}
              onChange={handleInputChange}
              className="form-control"
              id="gender"
              placeholder="Gender"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={patientData.patient.bloodGroup}
              onChange={handleInputChange}
              className="form-control"
              id="bloodGroup"
              placeholder="Blood Group"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="patient_Address">Address</label>
            <input
              type="text"
              name="patient_Address"
              value={patientData.patient.patient_Address}
              onChange={handleInputChange}
              className="form-control"
              id="patient_Address"
              placeholder="Address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="patient_Phone">Phone</label>
            <input
              type="number"
              name="patient_Phone"
              value={patientData.patient.patient_Phone}
              onChange={handleInputChange}
              className="form-control"
              id="patient_Phone"
              placeholder="Phone"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="patient_Email">Email</label>
            <input
              type="email"
              name="patient_Email"
              value={patientData.patient.patient_Email}
              onChange={handleInputChange}
              className="form-control"
              id="patient_Email"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="patient_UserName">Username</label>
            <input
              type="text"
              name="patient_UserName"
              value={patientData.patient.patient_UserName}
              onChange={handleInputChange}
              className="form-control"
              id="patient_UserName"
              placeholder="Username"
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={patientData.password}
              onChange={handlePasswordChange}
              className="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary mt-3">
            Add Patient
          </button>
        </div>
      </div>
    </form>
  );
};

export default PatientRegistration;