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

        public async Task<ExamType?> GetAsync(ExamtypeGetQuery query)
        {
            return await _context.ExamTypes
                .Include(e => e.Exams)
                .FirstOrDefaultAsync(e => e.ExamTypeId == query.ExamTypeId);
        }

        public async Task<IEnumerable<ExamType>> GetAllAsync(ExamtypeGetAllQuery query)
        {
            var ExamTypes = _context.ExamTypes.AsQueryable();

            if (!string.IsNullOrEmpty(query.Name))
                ExamTypes = ExamTypes.Where(e => e.Name!.Contains(query.Name));

            return await ExamTypes.ToListAsync();
        }

        public async Task<bool> CreateAsync(ExamtypeCreateCommand command)
        {
            var examtype = new ExamType
            {
                Name = command.Name
            };

            _context.ExamTypes.Add(examtype);
            return await _context.SaveChangesAsync() > 0;
            
        }

        public async Task<bool> UpdateAsync(ExamtypeUpdateCommand command)
        {
            var examtype = await _context.ExamTypes.FindAsync(command.ExamTypeId);
            if (examtype == null) return false;

            examtype.Name = command.Name;

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(ExamtypeDeleteCommand command)
        {
            var examtype = await _context.ExamTypes.FindAsync(command.ExamTypeId);
            if (examtype == null) return false;

            _context.ExamTypes.Remove(examtype);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}