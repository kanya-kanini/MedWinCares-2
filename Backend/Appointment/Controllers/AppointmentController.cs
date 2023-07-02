using MedicAppointment.DTO;
using MedicAppointment.Interface;
using Microsoft.AspNetCore.Mvc;

namespace MedicAppointment.Controllers
{
    [ApiController]
    [Route("api/appointments")]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpPost("initial")]
        public async Task<IActionResult> CreateInitialAppointment(InitialAppointmentDTO initialAppointmentDTO)
        {
            var appointmentId = await _appointmentService.CreateInitialAppointment(initialAppointmentDTO);
            return CreatedAtAction(nameof(GetAppointment), new { id = appointmentId }, null);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateAppointment(UpdateAppointmentDTO updateAppointmentDTO)
        {
            await _appointmentService.UpdateAppointment(updateAppointmentDTO);
            return NoContent();
        }

        [HttpPut("confirm")]
        public async Task<IActionResult> ConfirmAppointment(ConfirmAppointmentDTO confirmAppointmentDTO)
        {
            await _appointmentService.ConfirmAppointment(confirmAppointmentDTO);
            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppointment(int id)
        {
            var appointment = await _appointmentService.GetAppointment(id);

            if (appointment == null)
            {
                return NotFound();
            }

            return Ok(appointment);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAppointments()
        {
            var appointments = await _appointmentService.GetAllAppointments();
            return Ok(appointments);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            await _appointmentService.DeleteAppointment(id);
            return NoContent();
        }
    }
}
