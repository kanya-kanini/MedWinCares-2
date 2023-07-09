import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DoctorDashboard from './DoctorDashboard';
import Home from './Pages/Home';
import Login from './Components/Login';
import AdminDashboard from './Pages/AdminDashboard';
import PatientLogin from './Components/PatientLogin';
import PatientRegistration from'./Components/PatientRegistration';
import HomeDoctor from './Pages/HomeDoctor';
import DoctorRegistration from './Pages/DoctorRegistration';

function Routing() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
         <Route path="/ad/login/medcares" element={<Login/>}/>
          <Route path="/Doctordashboard" element={<DoctorDashboard/>}/>
          <Route path="/admindash" element={<AdminDashboard/>}/>
          <Route path="/Patientlogin" element={<PatientLogin/>}/>
          <Route path="/PatientRegistration" element={<PatientRegistration/>}/>
          <Route path='/HomeDoctor' element={<HomeDoctor/>}/>
          <Route path='/DoctorRegistration' element={<DoctorRegistration/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
  

export default Routing;