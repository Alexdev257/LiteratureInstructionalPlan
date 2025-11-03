using LIP.Application.CQRS.Command.Examanswer;
using LIP.Application.CQRS.Query.Examanswer;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories
{
    public class ExamanswerRepository : IExamanswerRepository
    {
        private readonly ApplicationDbContext _context;

        public ExamanswerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ExamAnswer?> GetAsync(ExamanswerGetQuery query)
        {
            return await _context.ExamAnswers
                .AsNoTracking()
                .Include(e => e.Attempt)
                .Include(e => e.Question)
                .Where(e => !e.IsDeleted)
                .FirstOrDefaultAsync(e => e.AnswerId == query.AnswerId);
        }

        public async Task<IEnumerable<ExamAnswer>> GetAllAsync(ExamanswerGetAllQuery query)
        {
            var ExamAnswers = _context.ExamAnswers
                .AsNoTracking()
                .Include(e => e.Attempt)
                .Include(e => e.Question)
                .Where(e => !e.IsDeleted)
                .AsQueryable();

            if (query.AttemptId.HasValue)
                ExamAnswers = ExamAnswers.Where(e => e.AttemptId == query.AttemptId);

            if (query.QuestionId.HasValue)
                ExamAnswers = ExamAnswers.Where(e => e.QuestionId == query.QuestionId);

            return await ExamAnswers.ToListAsync();
        }

        public async Task<bool> CreateAsync(ExamanswerCreateCommand command)
        {
            var examanswer = new ExamAnswer
            {
                AttemptId = command.AttemptId,
                QuestionId = command.QuestionId,
                AnswerContent = command.AnswerContent
            };

            _context.ExamAnswers.Add(examanswer);
            return await _context.SaveChangesAsync() > 0;
            
        }

        public async Task<bool> UpdateAsync(ExamanswerUpdateCommand command)
        {
            var examanswer = await _context.ExamAnswers.FindAsync(command.AnswerId);
            if (examanswer == null || examanswer.IsDeleted) return false;

            examanswer.AttemptId = command.AttemptId;
            examanswer.QuestionId = command.QuestionId;
            examanswer.AnswerContent = command.AnswerContent;

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(ExamanswerDeleteCommand command)
        {
            var examanswer = await _context.ExamAnswers.FindAsync(command.AnswerId);
            if (examanswer == null) return false;

            examanswer.IsDeleted = true;
            examanswer.DeletedAt = DateTime.UtcNow;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> RestoreAsync(ExamanswerRestoreCommand command)
        {
            var examanswer = await _context.ExamAnswers.FindAsync(command.AnswerId);
            if (examanswer == null) return false;

            examanswer.IsDeleted = false;
            examanswer.DeletedAt = DateTime.MinValue;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}