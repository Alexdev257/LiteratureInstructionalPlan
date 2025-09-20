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

        public async Task<Examanswer?> GetAsync(ExamanswerGetQuery query)
        {
            return await _context.Examanswers
                .Include(e => e.Attempt)
                .Include(e => e.Question)
                .FirstOrDefaultAsync(e => e.AnswerId == query.AnswerId);
        }

        public async Task<IEnumerable<Examanswer>> GetAllAsync(ExamanswerGetAllQuery query)
        {
            var examanswers = _context.Examanswers
                .Include(e => e.Attempt)
                .Include(e => e.Question)
                .AsQueryable();

            if (query.AttemptId.HasValue)
                examanswers = examanswers.Where(e => e.AttemptId == query.AttemptId);

            if (query.QuestionId.HasValue)
                examanswers = examanswers.Where(e => e.QuestionId == query.QuestionId);

            return await examanswers.ToListAsync();
        }

        public async Task<bool> CreateAsync(ExamanswerCreateCommand command)
        {
            var examanswer = new Examanswer
            {
                AttemptId = command.AttemptId,
                QuestionId = command.QuestionId,
                AnswerContent = command.AnswerContent
            };

            _context.Examanswers.Add(examanswer);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(ExamanswerUpdateCommand command)
        {
            var examanswer = await _context.Examanswers.FindAsync(command.AnswerId);
            if (examanswer == null) return false;

            examanswer.AttemptId = command.AttemptId;
            examanswer.QuestionId = command.QuestionId;
            examanswer.AnswerContent = command.AnswerContent;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(ExamanswerDeleteCommand command)
        {
            var examanswer = await _context.Examanswers.FindAsync(command.AnswerId);
            if (examanswer == null) return false;

            _context.Examanswers.Remove(examanswer);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}