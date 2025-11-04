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
            var exam = _context.Exams
                .AsNoTracking()
                .Include(e => e.CreatedByNavigation)
                .Include(e => e.ExamType)
                .Include(e => e.GradeLevel)
                .Include(e => e.Examattempts)
                .Include(e => e.Questions)
                .AsQueryable();

            if (query.IsAdmin != true)
                exam = exam.Where(em => !em.IsDeleted);
            //.Where(e => !e.IsDeleted)
            return await exam.FirstOrDefaultAsync(e => e.ExamId == query.ExamId);
        }

        public async Task<IEnumerable<Exam>> GetAllAsync(ExamGetAllQuery query)
        {
            var exams = _context.Exams
                .AsNoTracking()
                .Include(e => e.CreatedByNavigation)
                .Include(e => e.ExamType)
                .Include(e => e.GradeLevel)
                .Include(e => e.Examattempts)
                .Include(e => e.Questions)
                //.Where(e => !e.IsDeleted)
                .AsQueryable();
            if (query.IsAdmin != true)
                exams = exams.Where(em => !em.IsDeleted);

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

        public async Task<bool> RestoreAsync(ExamRestoreCommand command)
        {
            var exam = await _context.Exams.FindAsync(command.ExamId);
            if (exam == null) return false;

            exam.IsDeleted = false;
            exam.DeletedAt = DateTime.MinValue;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> CreateWithQuestionsAsync(Exam exam, IEnumerable<PracticeQuestion> questions)
        {
            foreach (var q in questions)
            {
                q.CreatedByNavigation = null;
                q.GradeLevel = null;
                _context.Attach(q);
            }
            exam.CreatedByNavigation = null;
            exam.GradeLevel = null;
            exam.Questions = questions.ToList();
            _context.Exams.Add(exam);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateWithQuestionsAsync(Exam exam, IEnumerable<int> questionIds)
        {
            //exam.CreatedByNavigation = null;
            //exam.GradeLevel = null;
            //foreach (var q in newQuestions)
            //{
            //    q.CreatedByNavigation = null;
            //    q.GradeLevel = null;
            //}


            //var existingExam = await _context.Exams
            //    .Include(e => e.Questions)
            //    .FirstOrDefaultAsync(e => e.ExamId == exam.ExamId);

            //if (existingExam == null) return false;

            ////_context.Entry(existingExam).CurrentValues.SetValues(exam);
            //existingExam.Title = exam.Title;
            //existingExam.Description = exam.Description;
            //existingExam.DurationMinutes = exam.DurationMinutes;
            //existingExam.ExamTypeId = exam.ExamTypeId;
            //existingExam.GradeLevelId = exam.GradeLevelId;

            //// C?p nh?t l?i danh sách questions

            //foreach (var q in newQuestions)
            //{
            //    _context.Attach(q);
            //    existingExam.Questions.Add(q);
            //}

            //existingExam.Questions.Clear();
            ////existingExam.Questions.Clear();
            //return await _context.SaveChangesAsync() > 0;

            var existingExam = await _context.Exams
        .Include(e => e.Questions)
        .FirstOrDefaultAsync(e => e.ExamId == exam.ExamId);

            if (existingExam == null)
                return false;

            // C?p nh?t các field c? b?n
            existingExam.Title = exam.Title;
            existingExam.Description = exam.Description;
            existingExam.DurationMinutes = exam.DurationMinutes;
            existingExam.ExamTypeId = exam.ExamTypeId;
            existingExam.GradeLevelId = exam.GradeLevelId;

            // Load danh sách câu h?i m?i b?ng chính context này
            var newQuestions = await _context.PracticeQuestions
                .Where(q => questionIds.Contains(q.QuestionId))
                .ToListAsync();

            // Xóa h?t câu h?i c? r?i add l?i
            existingExam.Questions.Clear();
            foreach (var q in newQuestions)
            {
                existingExam.Questions.Add(q);
            }

            return await _context.SaveChangesAsync() > 0;
        }
    }
}