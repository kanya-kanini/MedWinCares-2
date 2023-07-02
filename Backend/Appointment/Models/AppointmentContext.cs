using MedWinCares.Data.Models;
using Microsoft.EntityFrameworkCore;


namespace MedicAppointment.Models
{
    public class AppointmentContext : DbContext
    {


        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<Appoinment> Appoinments { get; set; }

        public DbSet<Admin> Admins { get; set; }


        public AppointmentContext(DbContextOptions<AppointmentContext> options) : base(options) { }
    }
}

