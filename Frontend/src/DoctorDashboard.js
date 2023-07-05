import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DoctorDashboard.css';
import 'tailwindcss/tailwind.css';
import { Layout, Menu, Card, Typography, Button } from 'antd';

import './DoctorDashboard.css';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default function DoctorDashboard() {
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('doctorProfile');
  

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get('https://localhost:7089/api/doctors');
        const doctors = response.data;
        const username = localStorage.getItem('username');
        const filteredDoctor = doctors.find(doctor => doctor.username === username);
        setDoctorData(filteredDoctor);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAppointmentRequests = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`https://localhost:7130/api/appointments/doctor/${username}`);
        const appointments = response.data;
        const pendingAppointments = appointments.filter(appointment => appointment.status === 'waiting');
        const confirmedAppointments = appointments.filter(appointment => appointment.status === 'Confirmed');
        setAppointmentRequests(pendingAppointments);
        setAcceptedAppointments(confirmedAppointments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctorData();
    fetchAppointmentRequests();
  }, []);

  const handleConfirmAppointment = async (Appoinment_ID) => {
    console.log('Appointment ID:', Appoinment_ID);    
    try {
      await axios.put('https://localhost:7130/api/appointments/confirm', {
        appointment_ID: Appoinment_ID,
        status: 'Confirmed'
      });

      const updatedAppointments = appointmentRequests.map(appointment => {
        if (appointment.appoinment_ID === Appoinment_ID) {
          return { ...appointment, status: 'Confirmed' };
        }
        return appointment;
      });

      setAppointmentRequests(updatedAppointments);
    } catch (error) {
      console.log(error);
    }
  };

  

 

  function ManageAppointments() {
 

    return (
        <div>
          <Title level={2}>Appointment Requests</Title>
          <div className="card-container">
            {appointmentRequests.map((appointment) => (
              <Card key={appointment.appoinment_ID} className="appointment-card" hoverable>
                <Title level={4}>Reason of Visit: {appointment.reason_of_visit}</Title>
                <p>{appointment.appoinment_ID}</p>
                <p>Status: {appointment.status}</p>
                <p>Patient Name: {appointment.patient.patient_Name}</p>
                <p>Age: {appointment.patient.age}</p>
                <p>Gender: {appointment.patient.gender}</p>
                <Button type="primary" onClick={() => handleConfirmAppointment(appointment.appoinment_ID)}>
                  Confirm
                </Button>
              </Card>
            ))}
          </div>
        </div>
      );
  }

  

  function AcceptedAppointments() {
    

    return (
        <div>
          <Title level={2}>Accepted Appointments</Title>
          <div className="card-container">
            {acceptedAppointments.map((appointment) => (
              <Card key={appointment.appointment_ID} className="appointment-card" hoverable>
                <Title level={4}>Reason of Visit: {appointment.reason_of_visit}</Title>
                <p>Patient Name: {appointment.patient.patient_Name}</p>
                <p>Age: {appointment.patient.age}</p>
                <p>Gender: {appointment.patient.gender}</p>
              </Card>
            ))}
          </div>
        </div>
      );
  }

  


  function DoctorProfile() {
    return (
      <div className="doctor-profile-card">
        <Title level={2}>Doctor Profile</Title>
        {doctorData && (
          <Card className="card">
            <div className="card-body">
              <div className="text-center">
                <img src={`/Img/${doctorData.imageName}`} alt="Doctor Profile" className="doctor-image" />
              </div>
              <div className="profile-info">
                <p>Doctor Name: {doctorData.doctorName}</p>
                <p>Age: {doctorData.age}</p>
                <p>Gender: {doctorData.gender}</p>
                <p>Date of Birth: {doctorData.dob}</p>
                <p>Specialization: {doctorData.specialization}</p>
                <p>Email: {doctorData.doctorEmail}</p>
                <p>Address: {doctorData.doctorAddress}</p>
                <p>Mobile: {doctorData.doctorMobile}</p>
                <p>Experience: {doctorData.doctor_Experience}</p>
                <p>Consulting Day: {doctorData.constulting_Day}</p>
                <p>Consulting Time: {doctorData.constulting_Time}</p>
                <p>Username: {doctorData.username}</p>
                <p>Status: {doctorData.status}</p>
              </div>
              <div className="profile-actions">
                <Button type="primary">Edit Profile</Button>
                <Button type="danger">Delete Account</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }
  

  return (
    <div className="container-fluid mx-auto">
      <header className="py-4" id='headd'>
        <h1 className="text-2xl font-bold text-center" id='headingg'>Doctor Dashboard</h1>
      </header>
      <div className="flex">
        <div className={`sidebar ${sidebarOpen ? 'open' : ''} bg-gray-100 py-4 px-2`}>
          <div className="toggle-button" onClick={handleSidebarToggle}>
            <div className="toggle-icon"></div>
          </div>
          <ul className="nav flex-column">
            <li
              className={`nav-item ${activeSection === 'doctorProfile' ? 'active' : ''}`}
              onClick={() => handleSectionClick('doctorProfile')}
            >
              <a className="nav-link cursor-pointer"  href="#">
                Doctor Profile 
              </a>
            </li>
            <li
              className={`nav-item ${activeSection === 'manageAppointments' ? 'active' : ''}`}
              onClick={() => handleSectionClick('manageAppointments')}
            >
              <a className="nav-link cursor-pointer" href="#">
                Manage Appointments 
              </a>
            </li>
            <li
              className={`nav-item ${activeSection === 'acceptedAppointments' ? 'active' : ''}`}
              onClick={() => handleSectionClick('acceptedAppointments')}
            >
              <a className="nav-link cursor-pointer" href="#">
                Accepted Appointments 
              </a>
            </li>
          </ul>
        </div>
        <div className="w-3/4">
          <div className="content p-4">
            {activeSection === 'manageAppointments' && <ManageAppointments/>}
            {activeSection === 'acceptedAppointments' && <AcceptedAppointments />}
            {activeSection === 'doctorProfile' && <DoctorProfile />}
          </div>
        </div>
      </div>
    </div>
  );
}