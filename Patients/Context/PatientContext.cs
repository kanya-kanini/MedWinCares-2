using MedWinCares.Data.Models;
using Microsoft.EntityFrameworkCore;


namespace PatientManagement.Context
{
    public class PatientContext : DbContext
    {
        public DbSet<Patient> Patients { get; set; }
        public PatientContext(DbContextOptions options) : base(options)
        {

        }

    }
}
