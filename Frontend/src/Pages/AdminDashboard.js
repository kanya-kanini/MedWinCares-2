import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css';
import 'tailwindcss/tailwind.css';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('manageDoctors');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchDoctors = () => {
    axios
      .get('https://localhost:7089/api/doctors')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchPatients = () => {
    axios
      .get('https://localhost:7010/api/Patient')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const changeStatus = async (doctorID, newStatus) => {
    try {
      const response = await axios.post(`https://localhost:7089/api/doctors/${doctorID}/activation`, {
        status: newStatus,
      });
      console.log(response.data);
      fetchDoctors();
      // Handle successful activation
    } catch (error) {
      console.error('An error occurred during doctor activation', error);
      // Handle error
    }
  };

  function ManageDoctors({ doctors }) {
    const activeDoctors = doctors.filter(doctor => doctor.status !== 'pending');
    const doctorRequests = doctors.filter(doctor => doctor.status === 'pending');

    return (
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Manage Doctors</h1>
        <div className="border-b border-gray-300 mb-4 pb-4">
          <h2 className="text-lg font-bold mb-2">Active Doctors</h2>
          <div className="card-container">
            {activeDoctors.map(doctor => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Doctor Requests</h2>
          {doctorRequests.length === 0 ? (
            <p>No doctor requests at the moment.</p>
          ) : (
            <div className="card-container">
              {doctorRequests.map(doctor => (
                <DoctorCard key={doctor.id} {...doctor} changeStatus={changeStatus} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  function DoctorCard({
    doctorID,
    imageName,
    doctorName,
    gender,
    doctorMobile,
    specialization,
    doctor_Experience,
    constulting_Day,
    constulting_Time,
    review,
    status,
    changeStatus
  }) {
    return (
      <div className="card">
        <div className="card-image-container">
          <img src={`/Img/${imageName}`} alt={doctorName} className="card-image" />
        </div>
        <div className="card-content">
          <h2 className="card-title">{doctorName}</h2>
          <p className="card-description">Gender: {gender}</p>
          <p className="card-description">Specialization: {specialization}</p>
          <p className="card-description">Experience: {doctor_Experience}</p>
          <p className="card-description">Consulting Day: {constulting_Day}</p>
          <p className="card-description">Consulting Time: {constulting_Time}</p>
          <p className="card-description">Review: {review}</p>
          <p className="card-description">Mobile: {doctorMobile}</p>
          <p className="card-description">Status: {status}</p>
          {status === 'pending' && (
            <div className="d-flex justify-content-around">
              <button className="btn btn-sm btn-success" onClick={() => changeStatus(doctorID, 'active')}>
                Activate
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  function ManagePatients() {
    const handleDelete = (patientID) => {
      axios
        .delete(`https://localhost:7010/api/Patient/${patientID}`)
        .then(response => {
          setPatients(prevPatients => prevPatients.filter(patient => patient.patient_ID !== patientID));
        })
        .catch(error => {
          console.log(error);
        });
    };

    return (
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Manage Patients</h1>
        <div className="card-container">
          {patients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            patients.map(patient => (
              <PatientCard key={patient.patient_ID} {...patient} onDelete={() => handleDelete(patient.patient_ID)} />
            ))
          )}
        </div>
      </div>
    );
  }

  function PatientCard({
    patient_Name,
    age,
    gender,
    bloodGroup,
    patient_Address,
    patient_Phone,
    patient_Email,
    patient_UserName,
    onDelete
  }) {
    return (
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">{patient_Name}</h2>
          <p className="card-description">Age: {age}</p>
          <p className="card-description">Gender: {gender}</p>
          <p className="card-description">Blood Group: {bloodGroup}</p>
          <p className="card-description">Address: {patient_Address}</p>
          <p className="card-description">Phone: {patient_Phone}</p>
          <p className="card-description">Email: {patient_Email}</p>
          <p className="card-description">Username: {patient_UserName}</p>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }


    function AdminProfile() {
      const adminData = {
        name: 'Shana',
        email: 'shana123@gmail.com',
        role: 'Admin',
        joinedDate: 'March 15, 2022',
        location: 'Kerala',
        phoneNumber: '9500886622',
      };
    return (
      <div className="bg-white p-4 rounded shadow">
      <h1 className="text-xl font-bold">Admin Profile</h1>
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">{adminData.name}</h2>
          <p className="card-description">Email: {adminData.email}</p>
          <p className="card-description">Role: {adminData.role}</p>
          <p className="card-description">Joined Date: {adminData.joinedDate}</p>
          <p className="card-description">Location: {adminData.location}</p>
          <p className="card-description">Phone Number: {adminData.phoneNumber}</p>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="container-fluid mx-auto">
      <header className="py-4" id='headd'>
        <h1 className="text-2xl font-bold text-center" id='headingg'>Admin Dashboard</h1>
      </header>
      <div className="flex">
        <div className={`sidebar ${sidebarOpen ? 'open' : ''} bg-gray-100 py-4 px-2`}>
          <div className="toggle-button" onClick={handleSidebarToggle}>
            <div className="toggle-icon"></div>
          </div>
          <ul className="nav flex-column">
            <li
              className={`nav-item ${activeSection === 'manageDoctors' ? 'active' : ''}`}
              onClick={() => handleSectionClick('manageDoctors')}
            >
              <a className="nav-link cursor-pointer" href="#">
                Manage Doctors
              </a>
            </li>
            <li
              className={`nav-item ${activeSection === 'managePatients' ? 'active' : ''}`}
              onClick={() => handleSectionClick('managePatients')}
            >
              <a className="nav-link cursor-pointer" href="#">
                Manage Patients
              </a>
            </li>
            <li
              className={`nav-item ${activeSection === 'adminProfile' ? 'active' : ''}`}
              onClick={() => handleSectionClick('adminProfile')}
            >
              <a className="nav-link cursor-pointer" href="#">
                Admin Profile
              </a>
            </li>
          </ul>
        </div>
        <div className="w-3/4">
          <div className="content p-4">
            {activeSection === 'manageDoctors' && <ManageDoctors doctors={doctors} />}
            {activeSection === 'managePatients' && <ManagePatients />}
            {activeSection === 'adminProfile' && <AdminProfile />}
          </div>
        </div>
      </div>
    </div>
  );
}

