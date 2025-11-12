using LIP.Application.CQRS.Command.Practicequestion;
using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories
{
    public class PracticequestionRepository : IPracticequestionRepository
    {
        private readonly ApplicationDbContext _context;

        public PracticequestionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Practicequestion?> GetAsync(PracticequestionGetQuery query)
        {
            return await _context.Practicequestions
                .AsNoTracking()
                .Include(p => p.CreatedByNavigation)
                .Include(p => p.GradeLevel)
                .Include(p => p.Series)
                .Include(p => p.Examanswers)
                .Include(p => p.Exams)
                .Where(p => !p.IsDeleted)
                .FirstOrDefaultAsync(p => p.QuestionId == query.QuestionId);
        }

        public async Task<IEnumerable<Practicequestion>> GetAllAsync(PracticequestionGetAllQuery query)
        {
            var questions = _context.Practicequestions
                .AsNoTracking()
                .Include(p => p.CreatedByNavigation)
                .Include(p => p.GradeLevel)
                .Include(p => p.Series)
                .Where(p => !p.IsDeleted)
                .AsQueryable();

            if (!string.IsNullOrEmpty(query.QuestionType))
                questions = questions.Where(p => p.QuestionType == query.QuestionType);

            if (query.GradeLevelId.HasValue)
                questions = questions.Where(p => p.GradeLevelId == query.GradeLevelId);

            if (query.SeriesId.HasValue)
                questions = questions.Where(p => p.SeriesId == query.SeriesId);

            if (query.CreatedBy.HasValue)
                questions = questions.Where(p => p.CreatedBy == query.CreatedBy);

            return await questions.ToListAsync();
        }

        public async Task<bool> CreateAsync(PracticequestionCreateCommand command)
        {
            var question = new Practicequestion
            {
                Content = command.Content,
                QuestionType = command.QuestionType,
                Answer = command.Answer,
                GradeLevelId = command.GradeLevelId,
                SeriesId = command.SeriesId,
                CreatedBy = command.CreatedBy,
                CreatedAt = command.CreatedAt
            };

            _context.Practicequestions.Add(question);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(PracticequestionUpdateCommand command)
        {
            var question = await _context.Practicequestions.FindAsync(command.QuestionId);
            if (question == null || question.IsDeleted) return false;

            question.Content = command.Content;
            question.QuestionType = command.QuestionType;
            question.Answer = command.Answer;
            question.GradeLevelId = command.GradeLevelId;
            question.SeriesId = command.SeriesId;
            question.CreatedBy = command.CreatedBy;
            question.CreatedAt = command.CreatedAt;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(PracticequestionDeleteCommand command)
        {
            var question = await _context.Practicequestions.FindAsync(command.QuestionId);
            if (question == null) return false;

            question.IsDeleted = true;
            question.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}