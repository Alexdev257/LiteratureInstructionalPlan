using LIP.Application.CQRS.Command.Examattempt;
using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories
{
    public class ExamattemptRepository : IExamattemptRepository
    {
        private readonly ApplicationDbContext _context;

        public ExamattemptRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Examattempt?> GetAsync(ExamattemptGetQuery query)
        {
            return await _context.Examattempts
                .AsNoTracking()
                .Include(e => e.Exam)
                .Include(e => e.User)
                .Include(e => e.Examanswers)
                .Where(e => !e.IsDeleted)
                .FirstOrDefaultAsync(e => e.AttemptId == query.AttemptId);
        }

        public async Task<IEnumerable<Examattempt>> GetAllAsync(ExamattemptGetAllQuery query)
        {
            var examattempts = _context.Examattempts
                .AsNoTracking()
                .Include(e => e.Exam)
                .Include(e => e.User)
                .Where(e => !e.IsDeleted)
                .AsQueryable();

            if (query.ExamId.HasValue)
                examattempts = examattempts.Where(e => e.ExamId == query.ExamId);

            if (query.UserId.HasValue)
                examattempts = examattempts.Where(e => e.UserId == query.UserId);

            if (!string.IsNullOrEmpty(query.Status))
                examattempts = examattempts.Where(e => e.Status == query.Status);

            return await examattempts.ToListAsync();
        }

        public async Task<bool> CreateAsync(ExamattemptCreateCommand command)
        {
            var examattempt = new Examattempt
            {
                ExamId = command.ExamId,
                UserId = command.UserId,
                StartTime = command.StartTime,
                EndTime = command.EndTime,
                Status = command.Status,
                Score = command.Score,
                Feedback = command.Feedback,
                LastSavedAt = command.LastSavedAt
            };

            _context.Examattempts.Add(examattempt);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(ExamattemptUpdateCommand command)
        {
            var examattempt = await _context.Examattempts.FindAsync(command.AttemptId);
            if (examattempt == null || examattempt.IsDeleted) return false;

            examattempt.ExamId = command.ExamId;
            examattempt.UserId = command.UserId;
            examattempt.StartTime = command.StartTime;
            examattempt.EndTime = command.EndTime;
            examattempt.Status = command.Status;
            examattempt.Score = command.Score;
            examattempt.Feedback = command.Feedback;
            examattempt.LastSavedAt = command.LastSavedAt;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(ExamattemptDeleteCommand command)
        {
            var examattempt = await _context.Examattempts.FindAsync(command.AttemptId);
            if (examattempt == null) return false;

            examattempt.IsDeleted = true;
            examattempt.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}