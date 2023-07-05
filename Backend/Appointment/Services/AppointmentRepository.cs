
using Microsoft.EntityFrameworkCore;
using MedicAppointment.Interface;
using MedicAppointment.Models;
using MedWinCares.Data.Models;

namespace MedicAppointment.Services
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly AppointmentContext _context;

        public AppointmentRepository(AppointmentContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAppointment(Appoinment appointment)
        {
            _context.Appoinments.Add(appointment);
            await _context.SaveChangesAsync();

            return appointment.Appoinment_ID;
        }

        public async Task UpdateAppointment(Appoinment appointment)
        {
            _context.Appoinments.Update(appointment);
            await _context.SaveChangesAsync();
        }

        public async Task<Appoinment> GetAppointment(int appointmentId)
        {
            return await _context.Appoinments.FindAsync(appointmentId);
        }

        public async Task<List<Appoinment>> GetAllAppointments()
        {
            return await _context.Appoinments.ToListAsync();
        }

        public async Task DeleteAppointment(int appointmentId)
        {
            var appointment = await _context.Appoinments.FindAsync(appointmentId);

            if (appointment != null)
            {
                _context.Appoinments.Remove(appointment);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<Appoinment>> GetAppointmentsByUsername(string username)
        {
            return await _context.Appoinments
                .Include(x => x.Patient)
                .Include(x => x.Doctor)
                .Where(x => x.Doctor.Username == username)
                .ToListAsync();
        }
    }
}
