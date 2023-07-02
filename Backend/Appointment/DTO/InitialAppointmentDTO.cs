using System.ComponentModel.DataAnnotations;

namespace MedicAppointment.DTO
{
    public class InitialAppointmentDTO
    {
        [Required]
        public int Patient_ID { get; set; }

        [Required]
        public int Doctor_ID { get; set; }

        [Required]
        public string? Reason_of_visit { get; set; }

        public string Status { get; set; } = "waiting";
    }

}
