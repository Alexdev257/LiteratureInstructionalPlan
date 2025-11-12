using LIP.Application.CQRS.Command.Answerguide;
using LIP.Application.CQRS.Query.Answerguide;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories
{
    public class AnswerguideRepository : IAnswerguideRepository
    {
        private readonly ApplicationDbContext _context;

        public AnswerguideRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Answerguide?> GetAsync(AnswerguideGetQuery query)
        {
            return await _context.Answerguides
                .AsNoTracking()
                .Include(a => a.Exam)
                .Where(a => !a.IsDeleted)
                .FirstOrDefaultAsync(a => a.AnswerGuideId == query.AnswerGuideId);
        }

        public async Task<IEnumerable<Answerguide>> GetAllAsync(AnswerguideGetAllQuery query)
        {
            var answerguides = _context.Answerguides
                .AsNoTracking()
                .Include(a => a.Exam)
                .Where(a => !a.IsDeleted)
                .AsQueryable();

            if (query.ExamId.HasValue)
                answerguides = answerguides.Where(a => a.ExamId == query.ExamId);

            if (query.MaxScore.HasValue)
                answerguides = answerguides.Where(a => a.MaxScore == query.MaxScore);

            return await answerguides.ToListAsync();
        }

        public async Task<bool> CreateAsync(AnswerguideCreateCommand command)
        {
            var answerguide = new Answerguide
            {
                ExamId = command.ExamId,
                KeyPoints = command.KeyPoints,
                MaxScore = command.MaxScore
            };

            _context.Answerguides.Add(answerguide);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(AnswerguideUpdateCommand command)
        {
            var answerguide = await _context.Answerguides.FindAsync(command.AnswerGuideId);
            if (answerguide == null || answerguide.IsDeleted) return false;

            answerguide.ExamId = command.ExamId;
            answerguide.KeyPoints = command.KeyPoints;
            answerguide.MaxScore = command.MaxScore;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(AnswerguideDeleteCommand command)
        {
            var answerguide = await _context.Answerguides.FindAsync(command.AnswerGuideId);
            if (answerguide == null) return false;

            answerguide.IsDeleted = true;
            answerguide.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}