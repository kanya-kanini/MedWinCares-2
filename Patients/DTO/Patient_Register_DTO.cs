using System.ComponentModel.DataAnnotations;

namespace PatientManagement.DTO
{
    public class Patient_Register_DTO
    {
        public int Patient_ID { get; set; }
        public string? Patient_Name { get; set; }
        public string? Gender { get; set; }
        [EmailAddress]
        public string? Patient_Email { get; set; }
        public string? Patient_UserName { get; set; }
        public string? Password { get; set; }
        public bool Confirmation { get; set; } = false;
    }
}
