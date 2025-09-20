using LIP.Application.CQRS.Command.Examtype;
using LIP.Application.CQRS.Query.Examtype;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories
{
    public class ExamtypeRepository : IExamtypeRepository
    {
        private readonly ApplicationDbContext _context;

        public ExamtypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Examtype?> GetAsync(ExamtypeGetQuery query)
        {
            return await _context.Examtypes
                .Include(e => e.Exams)
                .FirstOrDefaultAsync(e => e.ExamTypeId == query.ExamTypeId);
        }

        public async Task<IEnumerable<Examtype>> GetAllAsync(ExamtypeGetAllQuery query)
        {
            var examtypes = _context.Examtypes.AsQueryable();

            if (!string.IsNullOrEmpty(query.Name))
                examtypes = examtypes.Where(e => e.Name!.Contains(query.Name));

            return await examtypes.ToListAsync();
        }

        public async Task<bool> CreateAsync(ExamtypeCreateCommand command)
        {
            var examtype = new Examtype
            {
                Name = command.Name
            };

            _context.Examtypes.Add(examtype);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(ExamtypeUpdateCommand command)
        {
            var examtype = await _context.Examtypes.FindAsync(command.ExamTypeId);
            if (examtype == null) return false;

            examtype.Name = command.Name;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(ExamtypeDeleteCommand command)
        {
            var examtype = await _context.Examtypes.FindAsync(command.ExamTypeId);
            if (examtype == null) return false;

            _context.Examtypes.Remove(examtype);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}