using DoctorManagement.DTO;
using DoctorManagement.Interface;
using MedWinCares.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoctorManagement.Services
{
    public class DoctorService
    {
        private readonly IDoctorRepository _doctorRepository;

        public DoctorService(IDoctorRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }

        public async Task<IEnumerable<DoctorPatientDTO>> GetAllDoctorsWithPatientsAsync()
        {
            var doctors = await _doctorRepository.GetAllDoctorsAsync();
            var doctorPatientDTOs = doctors.Select(d => new DoctorPatientDTO
            {
                ImageName = d.ImageName,
                DoctorName = d.DoctorName,
                DoctorMobile = d.DoctorMobile,
                Specialization = d.Specialization,
                Doctor_Experience = d.Doctor_Experience,
                Constulting_Day = d.Constulting_Day,
                Constulting_Time = d.Constulting_Time,
                Review = d.Review
            });

            return doctorPatientDTOs;
        }
        public async Task<DoctorwithActiveDTO> Activation(int id, DoctorwithActiveDTO DoctorwithActiveDTO)
        {
            Doctor doctor = await _doctorRepository.GetDoctorByIdAsync(id);
            doctor.Status = DoctorwithActiveDTO.status;
            await _doctorRepository.UpdateDoctorAsync(doctor);
            return DoctorwithActiveDTO;
        }
        
    }
}
