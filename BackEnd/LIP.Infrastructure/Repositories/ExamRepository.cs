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
                //.Include(e => e.Series)
                .Include(e => e.Answerguides)
                .Include(e => e.Examattempts)
                .Include(e => e.Submissions)
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
                //.Include(e => e.Series)
                .Where(e => !e.IsDeleted)
                .AsQueryable();

            if (query.GradeLevelId.HasValue)
                exams = exams.Where(e => e.GradeLevelId == query.GradeLevelId);

            //if (query.SeriesId.HasValue)
            //    exams = exams.Where(e => e.SeriesId == query.SeriesId);

            if (query.ExamTypeId.HasValue)
                exams = exams.Where(e => e.ExamTypeId == query.ExamTypeId);

            if (query.CreatedBy.HasValue)
                exams = exams.Where(e => e.CreatedBy == query.CreatedBy);

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
                //SeriesId = command.SeriesId,
                ExamTypeId = command.ExamTypeId,
                CreatedBy = command.CreatedBy,
                CreatedAt = command.CreatedAt
            };

            _context.Exams.Add(exam);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(ExamUpdateCommand command)
        {
            var exam = await _context.Exams.FindAsync(command.ExamId);
            if (exam == null || exam.IsDeleted) return false;

            exam.Title = command.Title;
            exam.Description = command.Description;
            exam.DurationMinutes = command.DurationMinutes;
            exam.GradeLevelId = command.GradeLevelId;
            //exam.SeriesId = command.SeriesId;
            exam.ExamTypeId = command.ExamTypeId;
            exam.CreatedBy = command.CreatedBy;
            exam.CreatedAt = command.CreatedAt;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(ExamDeleteCommand command)
        {
            var exam = await _context.Exams.FindAsync(command.ExamId);
            if (exam == null) return false;

            exam.IsDeleted = true;
            exam.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}