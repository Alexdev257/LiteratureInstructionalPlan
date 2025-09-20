using LIP.Application.CQRS.Command.Gradelevel;
using LIP.Application.CQRS.Query.Gradelevel;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories
{
    public class GradelevelRepository : IGradelevelRepository
    {
        private readonly ApplicationDbContext _context;

        public GradelevelRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Gradelevel?> GetAsync(GradelevelGetQuery query)
        {
            return await _context.Gradelevels
                .Include(g => g.Exams)
                .Include(g => g.Practicequestions)
                .Include(g => g.Templates)
                .FirstOrDefaultAsync(g => g.GradeLevelId == query.GradeLevelId);
        }

        public async Task<IEnumerable<Gradelevel>> GetAllAsync(GradelevelGetAllQuery query)
        {
            var gradelevels = _context.Gradelevels.AsQueryable();

            if (!string.IsNullOrEmpty(query.Name))
                gradelevels = gradelevels.Where(g => g.Name!.Contains(query.Name));

            return await gradelevels.ToListAsync();
        }

        public async Task<bool> CreateAsync(GradelevelCreateCommand command)
        {
            var gradelevel = new Gradelevel
            {
                Name = command.Name
            };

            _context.Gradelevels.Add(gradelevel);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(GradelevelUpdateCommand command)
        {
            var gradelevel = await _context.Gradelevels.FindAsync(command.GradeLevelId);
            if (gradelevel == null) return false;

            gradelevel.Name = command.Name;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(GradelevelDeleteCommand command)
        {
            var gradelevel = await _context.Gradelevels.FindAsync(command.GradeLevelId);
            if (gradelevel == null) return false;

            _context.Gradelevels.Remove(gradelevel);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}