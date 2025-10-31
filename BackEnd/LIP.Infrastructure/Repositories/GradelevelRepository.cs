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

        public async Task<GradeLevel?> GetAsync(GradelevelGetQuery query)
        {
            return await _context.GradeLevels
                .Include(g => g.Exams)
                .Include(g => g.Practicequestions)
                .Include(g => g.Templates)
                .FirstOrDefaultAsync(g => g.GradeLevelId == query.GradeLevelId);
        }

        public async Task<IEnumerable<GradeLevel>> GetAllAsync(GradelevelGetAllQuery query)
        {
            var GradeLevels = _context.GradeLevels.AsQueryable();

            if (!string.IsNullOrEmpty(query.Name))
                GradeLevels = GradeLevels.Where(g => g.Name!.Contains(query.Name));

            return await GradeLevels.ToListAsync();
        }

        public async Task<bool> CreateAsync(GradelevelCreateCommand command)
        {
            var gradelevel = new GradeLevel
            {
                Name = command.Name
            };

            _context.GradeLevels.Add(gradelevel);
            return await _context.SaveChangesAsync() > 0;
            
        }

        public async Task<bool> UpdateAsync(GradelevelUpdateCommand command)
        {
            var gradelevel = await _context.GradeLevels.FindAsync(command.GradeLevelId);
            if (gradelevel == null) return false;

            gradelevel.Name = command.Name;

            return await _context.SaveChangesAsync() > 0;
            
        }

        public async Task<bool> DeleteAsync(GradelevelDeleteCommand command)
        {
            var gradelevel = await _context.GradeLevels.FindAsync(command.GradeLevelId);
            if (gradelevel == null) return false;

            _context.GradeLevels.Remove(gradelevel);
            return await _context.SaveChangesAsync() > 0;
            
        }
    }
}