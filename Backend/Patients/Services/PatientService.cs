using Microsoft.EntityFrameworkCore;
using PatientManagement.Context;
using PatientManagement.DTO;
using PatientManagement.Interface;

namespace PatientManagement.Services
{
    public class PatientService : IPatientDTO<Patient_Profile_DTO>
    {
        private readonly IPatient repo;
        private readonly PatientContext context;
        public PatientService(IPatient _repo, PatientContext context)
        {
            repo = _repo;
            this.context = context;
        }
        public async Task<ICollection<Patient_Profile_DTO>> Get()
        {
            var patients = await repo.GetAll();

            var patientProfileDTOs = patients.Select(patient => new Patient_Profile_DTO
            {
                Patient_Name = patient.Patient_Name,
                Age = patient.Age,
                Gender = patient.Gender,
                BloodGroup = patient.BloodGroup,
                Patient_Address = patient.Patient_Address,
                Patient_Phone = patient.Patient_Phone
            }).ToList();

            return patientProfileDTOs;
        }
        public async Task<Patient_Profile_DTO> UpdateDto(Patient_Profile_DTO dto, int id)
        {

            var patient = await repo.GetById(id);

            if (dto.Patient_Name != null)
                patient.Patient_Name = dto.Patient_Name;
            patient.Age = dto.Age;
            if (dto.Gender != null)
                patient.Gender = dto.Gender;
            if (dto.BloodGroup != null)
                patient.BloodGroup = dto.BloodGroup;
            if (dto.Patient_Address != null)
                patient.Patient_Address = dto.Patient_Address;
            if (dto.Patient_Phone != null)
                patient.Patient_Phone = dto.Patient_Phone;


            await context.SaveChangesAsync();
            var updatedProfileDto = new Patient_Profile_DTO
            {
                Patient_Name = patient.Patient_Name,
                Age = patient.Age,
                Gender = patient.Gender,
                BloodGroup = patient.BloodGroup,
                Patient_Address = patient.Patient_Address,
                Patient_Phone = patient.Patient_Phone
            };

            return updatedProfileDto;
        }

    }
}
