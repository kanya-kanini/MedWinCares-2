using System.ComponentModel.DataAnnotations;

namespace MedicAppointment.DTO
{
    public class UpdateAppointmentDTO
    {
        [Required]
        public int Appointment_ID { get; set; }

        [Required]
        public string Patient_Status { get; set; } = "consulting";

        public string Diagnosis { get; set; }

        public string Treatment { get; set; }
    }

}
