using MedWinCares.Data.Models;
using MedWinCares.Data.Models.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PatientManagement.Context;
using PatientManagement.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PatientManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private const string PatientRole = "Patient";

        private readonly IConfiguration _configuration;
        private readonly PatientContext _context;

        public LoginController(IConfiguration configuration, PatientContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("Patient")]
        public async Task<IActionResult> PostDoctor(Patient_login_DTO loginDTO)
        {
            if (loginDTO != null && !string.IsNullOrEmpty(loginDTO.Username) && !string.IsNullOrEmpty(loginDTO.Password))
            {
                var doctor = await GetPatient(loginDTO.Username);
                if (doctor != null && PasswordHasher.VerifyPassword(loginDTO.Password, doctor.Patient_HashedPassword))
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Patient_ID", doctor.Patient_ID.ToString()),
                        new Claim("Username", doctor.Patient_UserName),
                        new Claim(ClaimTypes.Role, PatientRole)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        private async Task<Patient> GetPatient(string username)
        {
            return await _context.Patients.FirstOrDefaultAsync(d => d.Patient_UserName == username);
        }
    }
}
