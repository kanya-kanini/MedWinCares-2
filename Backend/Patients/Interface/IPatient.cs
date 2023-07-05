

using MedWinCares.Data.Models;
using PatientApplication.DTO;

namespace PatientManagement.Interface
{
    public interface IPatient
    {
        public Task<ICollection<Patient>> GetAll();
        public Task<Patient> GetById(int id);
        public Task<Patient> Post(Patiet_Password_DTO Patiet_Password_DTO);
        public Task<Patient> Put(Patient patient, int id);
        public Task<Patient> DeleteById(int id);
        public bool VerifyPassword(string password, string hashedPassword);
    }
}
