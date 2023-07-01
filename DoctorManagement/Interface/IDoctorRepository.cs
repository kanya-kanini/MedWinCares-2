using MedWinCares.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DoctorManagement.Interface
{
    public interface IDoctorRepository
    {
        Task<IEnumerable<Doctor>> GetAllDoctorsAsync();
        Task<Doctor> GetDoctorByIdAsync(int doctorId);
        Task<Doctor> GetDoctorByUsernameAsync(string username);
        Task<int> AddDoctorAsync([FromForm] Doctor doctor, string password);
        Task UpdateDoctorAsync(Doctor doctor);
        Task DeleteDoctorAsync(int doctorId);
        bool VerifyPassword(string password, string hashedPassword);
    }
}
