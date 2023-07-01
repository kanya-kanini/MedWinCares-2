using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MedWinCares.Data.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DoctorManagement.Context;
using MedWinCares.Data.Models.Helpers;
using DoctorManagement.DTO;

namespace DoctorManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        private const string DoctorRole = "Doctor";

        private readonly IConfiguration _configuration;
        private readonly DoctorContext _context;

        public AuthorizeController(IConfiguration configuration, DoctorContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("Doctor")]
        public async Task<IActionResult> PostDoctor(DoctorLoginDTO loginDTO)
        {
            if (loginDTO != null && !string.IsNullOrEmpty(loginDTO.Username) && !string.IsNullOrEmpty(loginDTO.Password))
            {
                var doctor = await GetDoctor(loginDTO.Username);
                if (doctor != null && PasswordHasher.VerifyPassword(loginDTO.Password, doctor.HashedPassword))
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Doctor_ID", doctor.DoctorID.ToString()),
                        new Claim("Username", doctor.Username),
                        new Claim(ClaimTypes.Role, DoctorRole)
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

        private async Task<Doctor> GetDoctor(string username)
        {
            return await _context.Doctors.FirstOrDefaultAsync(d => d.Username == username);
        }
    }
}
