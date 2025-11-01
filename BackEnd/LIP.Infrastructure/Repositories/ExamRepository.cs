using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Query.Exam;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories
{
    public class ExamRepository : IExamRepository
    {
        private readonly ApplicationDbContext _context;

        public ExamRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Exam?> GetAsync(ExamGetQuery query)
        {
            return await _context.Exams
                .AsNoTracking()
                .Include(e => e.CreatedByNavigation)
                .Include(e => e.ExamType)
                .Include(e => e.GradeLevel)
                .Include(e => e.Examattempts)
                .Include(e => e.Questions)
                .Where(e => !e.IsDeleted)
                .FirstOrDefaultAsync(e => e.ExamId == query.ExamId);
        }

        public async Task<IEnumerable<Exam>> GetAllAsync(ExamGetAllQuery query)
        {
            var exams = _context.Exams
                .AsNoTracking()
                .Include(e => e.CreatedByNavigation)
                .Include(e => e.ExamType)
                .Include(e => e.GradeLevel)
                .Where(e => !e.IsDeleted)
                .AsQueryable();

            if (query.GradeLevelId.HasValue)
                exams = exams.Where(e => e.GradeLevelId == query.GradeLevelId);

            if (query.ExamTypeId.HasValue)
                exams = exams.Where(e => e.ExamTypeId == query.ExamTypeId);

            if (query.CreatedBy.HasValue)
                exams = exams.Where(e => e.CreatedByNavigationUserId == query.CreatedBy);

            return await exams.ToListAsync();
        }

        public async Task<bool> CreateAsync(ExamCreateCommand command)
        {
            var exam = new Exam
            {
                Title = command.Title,
                Description = command.Description,
                DurationMinutes = command.DurationMinutes,
                GradeLevelId = command.GradeLevelId,
                ExamTypeId = command.ExamTypeId,
                CreatedByNavigationUserId = command.CreatedBy,
                CreatedAt = command.CreatedAt
            };

            _context.Exams.Add(exam);
            return await _context.SaveChangesAsync() > 0;
            
        }

        public async Task<bool> UpdateAsync(ExamUpdateCommand command)
        {
            var exam = await _context.Exams.FindAsync(command.ExamId);
            if (exam == null || exam.IsDeleted) return false;

            exam.Title = command.Title;
            exam.Description = command.Description;
            exam.DurationMinutes = command.DurationMinutes;
            exam.GradeLevelId = command.GradeLevelId;
            exam.ExamTypeId = command.ExamTypeId;
            exam.CreatedByNavigationUserId = command.CreatedBy;
            exam.CreatedAt = command.CreatedAt;

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(ExamDeleteCommand command)
        {
            var exam = await _context.Exams.FindAsync(command.ExamId);
            if (exam == null) return false;

            exam.IsDeleted = true;
            exam.DeletedAt = DateTime.UtcNow;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}