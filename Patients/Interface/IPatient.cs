

using MedWinCares.Data.Models;

namespace PatientManagement.Interface
{
    public interface IPatient
    {
        public Task<ICollection<Patient>> GetAll();
        public Task<Patient> GetById(int id);
        public Task<Patient> Post(Patient patient, string password);
        public Task<Patient> Put(Patient patient, int id);
        public Task<Patient> DeleteById(int id);
        public bool VerifyPassword(string password, string hashedPassword);
    }
}
