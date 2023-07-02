
using MedWinCares.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoctorManagement.DTO
{
    public class DoctorWithPassword
    {
        public Doctor Doctor { get; set; }
        public string Password { get; set; }
    }
}
