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

        public async Task<ExamAttempt?> GetAsync(ExamattemptGetQuery query)
        {
            var attempt = _context.ExamAttempts
                .AsNoTracking()
                .Include(e => e.Exam)
                .Include(e => e.User)
                .Include(e => e.Examanswers)
                .AsQueryable();
            if (query.IsAdmin != true)
                attempt = attempt.Where(u => !u.IsDeleted);

                return await attempt.FirstOrDefaultAsync(e => e.AttemptId == query.AttemptId);
        }

        public async Task<IEnumerable<ExamAttempt>> GetAllAsync(ExamattemptGetAllQuery query)
        {
            var ExamAttempts = _context.ExamAttempts
                .AsNoTracking()
                .Include(e => e.Exam)
                .Include(e => e.User)
                //.Where(e => !e.IsDeleted)
                .AsQueryable();

            if (query.IsAdmin != true)
                ExamAttempts = ExamAttempts.Where(u => !u.IsDeleted);

            if (query.ExamId.HasValue)
                ExamAttempts = ExamAttempts.Where(e => e.ExamId == query.ExamId);

            if (query.UserId.HasValue)
                ExamAttempts = ExamAttempts.Where(e => e.UserId == query.UserId);

            if (!string.IsNullOrEmpty(query.Status))
                ExamAttempts = ExamAttempts.Where(e => e.Status == query.Status);

            return await ExamAttempts.ToListAsync();
        }

        public async Task<bool> CreateAsync(ExamattemptCreateCommand command)
        {
            var examattempt = new ExamAttempt
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

            _context.ExamAttempts.Add(examattempt);
            return await _context.SaveChangesAsync() > 0;
            
        }

        public async Task<bool> UpdateAsync(ExamattemptUpdateCommand command)
        {
            var examattempt = await _context.ExamAttempts.FindAsync(command.AttemptId);
            if (examattempt == null || examattempt.IsDeleted) return false;

            examattempt.ExamId = command.ExamId;
            examattempt.UserId = command.UserId;
            examattempt.StartTime = command.StartTime;
            examattempt.EndTime = command.EndTime;
            examattempt.Status = command.Status;
            examattempt.Score = command.Score;
            examattempt.Feedback = command.Feedback;
            examattempt.LastSavedAt = command.LastSavedAt;

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(ExamattemptDeleteCommand command)
        {
            var examattempt = await _context.ExamAttempts.FindAsync(command.AttemptId);
            if (examattempt == null) return false;

            examattempt.IsDeleted = true;
            examattempt.DeletedAt = DateTime.UtcNow;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> RestoreAsync(ExamattemptRestoreCommand command)
        {
            var examattempt = await _context.ExamAttempts.FindAsync(command.AttemptId);
            if (examattempt == null) return false;

            examattempt.IsDeleted = false;
            examattempt.DeletedAt = DateTime.MinValue;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}