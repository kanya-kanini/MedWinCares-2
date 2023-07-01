using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLibrary.Models
{
    public class Patient
    {
        [Key]
        public int Patient_ID { get; set; }

        [Required]
        public string? Patient_Name { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        [RegularExpression("^(male|female|others)$")]
        public string? Gender { get; set; }
        [Required]
        public string? BloodGroup { get; set; }
        [Required]
        public string? Patient_Address { get; set; }
        [Required]
        public string? Patient_Phone { get; set; }
        [Required]
        [EmailAddress]
        public string? Patient_Email { get; set; }
        [Required]
        public string? Patient_UserName { get; set; }
        public string? Patient_HashedPassword { get; set; }


    }



}
