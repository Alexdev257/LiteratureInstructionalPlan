using LIP.Application.CQRS.Command.Submission;
using LIP.Application.CQRS.Query.Submission;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories
{
    public class SubmissionRepository : ISubmissionRepository
    {
        private readonly ApplicationDbContext _context;

        public SubmissionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Submission?> GetAsync(SubmissionGetQuery query)
        {
            return await _context.Submissions
                .Include(s => s.Exam)
                .Include(s => s.Student)
                .FirstOrDefaultAsync(s => s.SubmissionId == query.SubmissionId);
        }

        public async Task<IEnumerable<Submission>> GetAllAsync(SubmissionGetAllQuery query)
        {
            var submissions = _context.Submissions
                .Include(s => s.Exam)
                .Include(s => s.Student)
                .AsQueryable();

            if (query.ExamId.HasValue)
                submissions = submissions.Where(s => s.ExamId == query.ExamId);

            if (query.StudentId.HasValue)
                submissions = submissions.Where(s => s.StudentId == query.StudentId);

            if (!string.IsNullOrEmpty(query.Status))
                submissions = submissions.Where(s => s.Status == query.Status);

            return await submissions.ToListAsync();
        }

        public async Task<bool> CreateAsync(SubmissionCreateCommand command)
        {
            var submission = new Submission
            {
                ExamId = command.ExamId,
                StudentId = command.StudentId,
                Content = command.Content,
                AutoScore = command.AutoScore,
                AiFeedback = command.AiFeedback,
                Status = command.Status,
                SubmitTime = command.SubmitTime
            };

            _context.Submissions.Add(submission);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(SubmissionUpdateCommand command)
        {
            var submission = await _context.Submissions.FindAsync(command.SubmissionId);
            if (submission == null) return false;

            submission.ExamId = command.ExamId;
            submission.StudentId = command.StudentId;
            submission.Content = command.Content;
            submission.AutoScore = command.AutoScore;
            submission.AiFeedback = command.AiFeedback;
            submission.Status = command.Status;
            submission.SubmitTime = command.SubmitTime;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(SubmissionDeleteCommand command)
        {
            var submission = await _context.Submissions.FindAsync(command.SubmissionId);
            if (submission == null) return false;

            _context.Submissions.Remove(submission);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}