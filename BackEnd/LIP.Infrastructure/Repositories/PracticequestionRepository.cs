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

        public async Task<PracticeQuestion?> GetAsync(PracticequestionGetQuery query)
        {
            var questions = _context.PracticeQuestions
                .AsNoTracking()
                .Include(p => p.CreatedByNavigation)
                .Include(p => p.GradeLevel)
                //.Include(p => p.Series)
                .Include(p => p.Examanswers)
                .Include(p => p.Exams)
                //.Where(p => !p.IsDeleted)
                .AsQueryable();

            if (query.IsAdmin != true)
                questions = questions.Where(u => !u.IsDeleted);

                return await questions.FirstOrDefaultAsync(p => p.QuestionId == query.QuestionId);
        }

        public async Task<IEnumerable<PracticeQuestion>> GetAllAsync(PracticequestionGetAllQuery query)
        {
            var questions = _context.PracticeQuestions
                .AsNoTracking()
                .Include(p => p.CreatedByNavigation)
                .Include(p => p.GradeLevel)
                //.Include(p => p.Series)
                //.Where(p => !p.IsDeleted)
                .AsQueryable();

            if (query.IsAdmin != true)
                questions = questions.Where(u => !u.IsDeleted);

            if (!string.IsNullOrEmpty(query.QuestionType))
                questions = questions.Where(p => p.QuestionType == query.QuestionType);

            if (query.GradeLevelId.HasValue)
                questions = questions.Where(p => p.GradeLevelId == query.GradeLevelId);

            if (query.CreatedBy.HasValue)
                questions = questions.Where(p => p.CreatedByNavigationUserId == query.CreatedBy);

            return await questions.ToListAsync();
        }

        public async Task<bool> CreateAsync(PracticequestionCreateCommand command)
        {
            var question = new PracticeQuestion
            {
                Content = command.Content,
                QuestionType = command.QuestionType,
                Difficulty = command.Difficulty,
                Answer = command.Answer,
                CorrectAnswer = command.CorrectAnswer,
                GradeLevelId = command.GradeLevelId,
                //SeriesId = command.SeriesId,
                CreatedByNavigationUserId = command.CreatedByUserId,
                CreatedAt = command.CreatedAt
            };

            _context.PracticeQuestions.Add(question);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateAsync(PracticequestionUpdateCommand command)
        {
            var question = await _context.PracticeQuestions.FindAsync(command.QuestionId);
            if (question == null || question.IsDeleted) return false;

            question.Content = command.Content;
            question.QuestionType = command.QuestionType;
            question.Difficulty = command.Difficulty;
            question.Answer = command.Answer;
            question.CorrectAnswer = command.CorrectAnswer;
            question.GradeLevelId = command.GradeLevelId;
            //question.SeriesId = command.SeriesId;
            question.CreatedByNavigationUserId = command.CreatedByUserId;
            question.CreatedAt = command.CreatedAt;

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(PracticequestionDeleteCommand command)
        {
            var question = await _context.PracticeQuestions.FindAsync(command.QuestionId);
            if (question == null) return false;

            question.IsDeleted = true;
            question.DeletedAt = DateTime.UtcNow;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> RestoreAsync(PracticequestionRestoreCommand command)
        {
            var question = await _context.PracticeQuestions.FindAsync(command.QuestionId);
            if (question == null) return false;

            question.IsDeleted = false;
            question.DeletedAt = DateTime.MinValue;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}