import React from "react";
import { Component } from "react";
import axios from "axios";
import './DoctorRegistration.css';
import Background from './5243321.jpg'
export default class DoctorRegistration extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Doctor:[],
        doctorName: 0,
        doctor_Name: "",
        age: 0,
        gender: "",
        dob: new Date(),
        specialization: "",
        doctorEmail: "user@example.com",
        doctorAddress: "",
        doctorMobile: 0,
        emergencyNo: 0,
        doctor_Experience: "",
        constulting_Day: "",
        constulting_Time: new Date(),
        username: "",
        password:"",
        status: "pending",
        imageName: "",
        review: "",
        lastLogin: new Date(),
        file: "",
        selectedDoctor: null,
    };
    }
  
    componentDidMount() {
      this.fetchDoctor();
    }
  
    fetchDoctor() {
      fetch("https://localhost:7089/api/doctors")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ Doctor: data });
          console.log("Fetched doctor data");
        })
        .catch((error) => {
          console.log("Error fetching doctor data:", error);
        });
      }

      CreateDoctor = () => {
        const { doctorName, age, dob, gender, specialization, doctorEmail, doctorAddress, doctorMobile, emergencyNo, doctor_Experience, constulting_Day, constulting_Time, username, password,imageName, status, file,review } = this.state;
      
        // Create a new doctor object with the form data
        const formData = new FormData();
        formData.append('doctor.doctorName', doctorName);
        formData.append('doctor.age', age);
        formData.append('doctor.dob', dob);
        formData.append('doctor.gender', gender);
        formData.append('doctor.specialization', specialization);
        formData.append('doctor.doctorEmail', doctorEmail);
        formData.append('doctor.doctorAddress', doctorAddress);
        formData.append('doctor.doctorMobile', doctorMobile);
        formData.append('doctor.emergencyNo', emergencyNo);
        formData.append('doctor.doctor_Experience', doctor_Experience);
        formData.append('doctor.constulting_Day', constulting_Day);
        formData.append('doctor.constulting_Time', constulting_Time);
        formData.append('doctor.username', username);
        formData.append('doctor.imageName', imageName);
        formData.append('password', password);
        formData.append('doctor.status', status);
        formData.append('doctor.file', file);
        formData.append('doctor.review', review);
      
        fetch("https://localhost:7089/api/doctors", {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Doctor is created', data);
            alert.success('Doctor is created');
            this.setState({
              doctorName: '',
              age: 0,
              gender: '',
              dob: new Date(),
              specialization: '',
              doctorEmail: '',
              doctorAddress: '',
              doctorMobile: 0,
              emergencyNo: 0,
              doctor_Experience: '',
              constulting_Day: '',
              constulting_Time: new Date(),
              username: '',
              password: '',
              status: '',
              file: null,
              review:""
            });
      
            this.fetchDoctor();
          })
          .catch((error) => {
            console.error('Error creating doctor:', error);
          });
      };
      
      
    deleteHotel = (doctorId) => {
      if (window.confirm("Are you sure you want to delete this room?")) {
        fetch("https://localhost:7089/api/doctors/" + `${doctorId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              console.log("Doctor deleted successfully");
              alert.success("Doctor deleted successfully");
              this.fetchDoctor();
            } else {
              throw new Error(alert.error("Error deleting Doctor:"));
             
            }
          })
          .catch((error) => {
            console.error("Error deleting Doctor:", error);
          });
      }
    };
    changeStatus = async (doctorID, newStatus) => {
      try {
        const response = await axios.post(`https://localhost:7089/api/doctors/${doctorID}/activation`, {
          status: newStatus,
        });
        console.log(response.data);
        this.fetchDoctor();
        // Handle successful activation
      } catch (error) {
        console.error('An error occurred during doctor activation', error);
        // Handle error
      }
    };
  
    updateDoctor = () => {
        const {
          selectedDoctor,
          doctorName,
          age,
          dob,
          gender,
          specialization,
          doctorEmail,
          doctorAddress,
          doctorMobile,
          emergencyNo,
          doctor_Experience,
          constulting_Day,
          constulting_Time,
          username,
          password,
          status,
          imageName,
          review,
          file,
        } = this.state;
      
        if (!selectedDoctor) {
          return;
        }
      
        const updatedDoctor = {
          ...selectedDoctor,
          doctorName: doctorName,
          age: age,
          dob: dob,
          gender: gender,
          specialization: specialization,
          doctorEmail: doctorEmail,
          doctorAddress: doctorAddress,
          doctorMobile: doctorMobile,
          emergencyNo: emergencyNo,
          doctor_Experience: doctor_Experience,
          constulting_Day: constulting_Day,
          constulting_Time: constulting_Time,
          username: username,
          password: password,
          status: status,
          imageName: imageName,
          review: review
        };
        const formData = new FormData();
        formData.append('file', file);
        formData.append('doctorData', JSON.stringify(updatedDoctor));
        fetch("https://localhost:7089/api/doctors/" + selectedDoctor.doctor_ID, {
          method: "PUT",
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Doctor is updated ", data);
            this.setState({
              selectedDoctor: null,
              doctorName: "",
              age: 0,
              dob: new Date(),
              gender: "",
              specialization: "",
              doctorEmail: "",
              doctorAddress: "",
              doctorMobile: 0,
              emergencyNo: 0,
              doctor_Experience: "",
              constulting_Day: "",
              constulting_Time: new Date(),
              username: "",
              password: "",
              status: "",
              imageName: "",
              review: "",
              file:null,
            });
      
            this.fetchDoctor();
          })
          .catch((error) => {
            console.error("Error updating doctor:", error);
            alert.error("Error updating doctor:", error);
          });
      };
  
      handleDoctorNameInputChange = (event) => {
        this.setState({ doctorName: event.target.value });
      };
      
      handleAgeInputChange = (event) => {
        this.setState({ age: event.target.value });
      };
      
      handleDobInputChange = (event) => {
        this.setState({ dob: event.target.value });
      };
      
      handleGenderInputChange = (event) => {
        this.setState({ gender: event.target.value });
      };
      
      handleSpecializationInputChange = (event) => {
        this.setState({ specialization: event.target.value });
      };
      
      handleDoctorEmailInputChange = (event) => {
        this.setState({ doctorEmail: event.target.value });
      };
      
      handleDoctorAddressInputChange = (event) => {
        this.setState({ doctorAddress: event.target.value });
      };
      
      handleDoctorMobileInputChange = (event) => {
        this.setState({ doctorMobile: event.target.value });
      };
      
      handleEmergencyNoInputChange = (event) => {
        this.setState({ emergencyNo: event.target.value });
      };
      
      handleDoctorExperienceInputChange = (event) => {
        this.setState({ doctor_Experience: event.target.value });
      };
      
      handleConsultingDayInputChange = (event) => {
        this.setState({ constulting_Day: event.target.value });
      };
      
      handleConsultingTimeInputChange = (event) => {
        this.setState({ constulting_Time: event.target.value });
      };
      
      handleUsernameInputChange = (event) => {
        this.setState({ username: event.target.value });
      };
      
      handlePasswordInputChange = (event) => {
        this.setState({ password: event.target.value });
      };
      
      handleStatusInputChange = (event) => {
        this.setState({ status: event.target.value });
      };
      
      handleImageNameInputChange = (event) => {
        this.setState({ imageName: event.target.value });
      };
      
      handleReviewInputChange = (event) => {
        this.setState({ review: event.target.value });
      };
      handleFileChange = (event) => {
        this.setState({ file:event.target.files[0]});
      };
      
  
  
      selectDoctorForUpdate = (doctor) => {
        this.setState({
          selectedDoctor: doctor,
          doctorName: doctor.doctorName,
          age: doctor.age,
          dob: doctor.dob,
          gender: doctor.gender,
          specialization: doctor.specialization,
          doctorEmail: doctor.doctorEmail,
          doctorAddress: doctor.doctorAddress,
          doctorMobile: doctor.doctorMobile,
          emergencyNo: doctor.emergencyNo,
          doctor_Experience: doctor.doctor_Experience,
          constulting_Day: doctor.constulting_Day,
          constulting_Time: doctor.constulting_Time,
          username: doctor.username,
          password: null,
          status: doctor.status,
          imageName: doctor.imageName,
          review: doctor.review,
        });
      };
      
      render() {
        const {
          Doctor,
          selectedDoctor,
          doctorName,
          age,
          dob,
          gender,
          specialization,
          doctorEmail,
          doctorAddress,
          doctorMobile,
          emergencyNo,
          doctor_Experience,
          constulting_Day,
          constulting_Time,
          username,
          password,
          status,
          imageName,
          review,
        } = this.state;
      
        return (
          <div className="container">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: `url(${Background}) no-repeat left center/cover` }}>
  <div style={{ width: "500px", padding: "20px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", backgroundColor: "white" }}></div>
  <div className="card">
    <div className="card-body">
      <h1 className="card-title mb-4">Doctor Register</h1>
      

      <div className="row">
        
        <div className="col">
          <label>Name:</label>
          <input
            type="text"
            className="form-control shadow-sm"
            value={doctorName}
            onChange={this.handleDoctorNameInputChange}
            placeholder="Name"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <label>Age:</label>
          <input
            type="number"
            className="form-control shadow-sm"
            value={age}
            onChange={this.handleAgeInputChange}
            placeholder="Age"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <label>Date of Birth:</label>
          <input
            type="date"
            className="form-control shadow-sm"
            value={dob}
            onChange={this.handleDobInputChange}
            placeholder="Date of Birth"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <label>Gender:</label>
          <input
            type="text"
            className="form-control shadow-sm"
            value={gender}
            onChange={this.handleGenderInputChange}
            placeholder="Gender"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <label>Specialization:</label>
          <input
            type="text"
            className="form-control shadow-sm"
            value={specialization}
            onChange={this.handleSpecializationInputChange}
            placeholder="Specialization"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <label>Email:</label>
          <input
            type="email"
            className="form-control shadow-sm"
            value={doctorEmail}
            onChange={this.handleDoctorEmailInputChange}
            placeholder="Email"
          />
        </div>
      </div>

    

      <div className="row mt-3">
        <div className="col">
          <label>Consulting Time:</label>
          <input
            type="date"
            className="form-control shadow-sm"
            value={constulting_Time}
            onChange={this.handleConsultingTimeInputChange}
            placeholder="Consulting Time"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <label>Username:</label>
          <input
            type="text"
            className="form-control shadow-sm"
            value={username}
            onChange={this.handleUsernameInputChange}
            placeholder="Username"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <label>Password:</label>
          <input
            type="password"
            className="form-control shadow-sm"
            value={password}
            onChange={this.handlePasswordInputChange}
            placeholder="Password"
          />
        </div>
      </div>

      

      <div className="row mt-3">
        <div className="col">
          <label>Image Name:</label>
          <input
            type="text"
            className="form-control shadow-sm"
            value={imageName}
            onChange={this.handleImageNameInputChange}
            placeholder="Image Name"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <label>Review:</label>
          <input
            type="text"
            className="form-control shadow-sm"
            value={review}
            onChange={this.handleReviewInputChange}
            placeholder="Review"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <label>Upload File:</label>
          <input
            type="file"
            className="form-control-file shadow-sm"
            onChange={this.handleFileChange}
          />
        </div>
      </div>

     
    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
      <div style={{ width: "60%" }}>
        {selectedDoctor ? (
          <button style={{ width: "100%" }} onClick={this.updateDoctor}>
            Save
          </button>
        ) : (
          <button style={{ width: "100%" }} onClick={this.CreateDoctor}>
            Create
          </button>
        )}
      </div>
    </div>

    <div style={{ marginTop: "10px" }}>
      {Doctor.map((item) => (
        <div key={item.id}></div>
      ))}
    </div>
  </div>
  </div>
</div>
</div>
  );
}
}