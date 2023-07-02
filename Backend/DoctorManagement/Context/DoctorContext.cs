
using MedWinCares.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoctorManagement.Context
{
    public class DoctorContext : DbContext
    {


        public DbSet<Doctor> Doctors { get; set; }


        public DoctorContext(DbContextOptions<DoctorContext> options) : base(options) { }
    }
}

