using LIP.Application.CQRS.Command.Exam;
using LIP.Application.CQRS.Query.Exam;
using LIP.Application.DTOs.Request.Exam;
using LIP.Application.DTOs.Request.PracticeQuestion;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace LIP.Infrastructure.Repositories;

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

        //// C?p nh?t l?i danh s�ch questions

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

        // C?p nh?t c�c field c? b?n
        existingExam.Title = exam.Title;
        existingExam.Description = exam.Description;
        existingExam.DurationMinutes = exam.DurationMinutes;
        existingExam.ExamTypeId = exam.ExamTypeId;
        existingExam.GradeLevelId = exam.GradeLevelId;

        // Load danh s�ch c�u h?i m?i b?ng ch�nh context n�y
        var newQuestions = await _context.PracticeQuestions
            .Where(q => questionIds.Contains(q.QuestionId))
            .ToListAsync();

        // X�a h?t c�u h?i c? r?i add l?i
        existingExam.Questions.Clear();
        foreach (var q in newQuestions) existingExam.Questions.Add(q);

        return await _context.SaveChangesAsync() > 0;
    }


    //public async Task<List<ExamResultDTO>> GetExamResultsAsync(int examId, int userId, int attemptId)
    //{
    //    var query =
    //        from ea in _context.ExamAnswers
    //        join att in _context.ExamAttempts on ea.AttemptId equals att.AttemptId
    //        join e in _context.Exams on att.ExamId equals e.ExamId
    //        join em in _context.ExamMatrices on e.MatrixId equals em.MatrixId
    //        join pq in _context.PracticeQuestions on ea.QuestionId equals pq.QuestionId
    //        from emd in _context.ExamMatrixDetails
    //            .Where(d => d.ExamMatrixMatrixId == em.MatrixId)
    //            .DefaultIfEmpty()
    //        where att.ExamId == examId
    //              && att.UserId == userId
    //              && att.AttemptId == attemptId
    //              && !ea.IsDeleted
    //              && !att.IsDeleted
    //        select new 
    //        {
    //            pq.QuestionId,
    //            pq.Content,
    //            ea.AnswerContent,
    //            pq.CorrectAnswer,
    //            emd.ScorePerQuestion,
    //            //QuestionId = pq.QuestionId,
    //            //QuestionContent = pq.Content,
    //            //StudentAnswer = string.IsNullOrWhiteSpace(ea.AnswerContent)
    //            //                    ? new List<AnswerOption>()
    //            //                    : JsonSerializer.Deserialize<List<AnswerOption>>(ea.AnswerContent!),
    //            //CorrectAnswer = string.IsNullOrEmpty(pq.CorrectAnswer)
    //            //                    ? new List<AnswerOption>()
    //            //                    : JsonSerializer.Deserialize<List<AnswerOption>>(pq.CorrectAnswer),
    //            //ScorePerQuestion = emd.ScorePerQuestion
    //        };
    //    var rawResults = await query.AsNoTracking().ToListAsync();

    //    var examResults = rawResults.Select(r => new ExamResultDTO
    //    {
    //        QuestionId = r.QuestionId,
    //        QuestionContent = r.Content,
    //        StudentAnswer = string.IsNullOrWhiteSpace(r.AnswerContent)
    //                            ? new List<AnswerOption>()
    //                            : JsonSerializer.Deserialize<List<AnswerOption>>(r.AnswerContent!),
    //        CorrectAnswer = string.IsNullOrEmpty(r.CorrectAnswer)
    //                            ? new List<AnswerOption>()
    //                            : JsonSerializer.Deserialize<List<AnswerOption>>(r.CorrectAnswer),
    //        ScorePerQuestion = r.ScorePerQuestion,
    //    }).ToList();
    //    return examResults;
    //    //return await query.AsNoTracking().ToListAsync();
    //}

    public async Task<List<ExamResultDTO>> GetExamResultsAsync(
    int examId,
    int userId,
    int attemptId,
    string questionType)
    {
        var query =
            from ea in _context.ExamAnswers
            join att in _context.ExamAttempts on ea.AttemptId equals att.AttemptId
            join e in _context.Exams on att.ExamId equals e.ExamId
            join em in _context.ExamMatrices on e.MatrixId equals em.MatrixId
            join pq in _context.PracticeQuestions on ea.QuestionId equals pq.QuestionId
            from emd in _context.ExamMatrixDetails
                .Where(d => d.ExamMatrixMatrixId == em.MatrixId)
                .DefaultIfEmpty()
            where att.ExamId == examId
                  && att.UserId == userId
                  && att.AttemptId == attemptId
                  && !ea.IsDeleted
                  && !att.IsDeleted
                  && (
                         string.IsNullOrEmpty(questionType)
                         || pq.QuestionType == questionType       // nếu QuestionType nằm ở PracticeQuestions
                         || emd.QuestionType == questionType      // nếu nằm ở ExamMatrixDetails
                     )
            select new
            {
                pq.QuestionId,
                pq.Content,
                ea.AnswerContent,
                pq.CorrectAnswer,
                emd.ScorePerQuestion
            };

        var rawResults = await query.AsNoTracking().ToListAsync();

        var examResults = rawResults.Select(r => new ExamResultDTO
        {
            QuestionId = r.QuestionId,
            QuestionContent = r.Content,
            StudentAnswer = string.IsNullOrWhiteSpace(r.AnswerContent)
                                ? new List<AnswerOption>()
                                : JsonSerializer.Deserialize<List<AnswerOption>>(r.AnswerContent!),
            CorrectAnswer = string.IsNullOrEmpty(r.CorrectAnswer)
                                ? new List<AnswerOption>()
                                : JsonSerializer.Deserialize<List<AnswerOption>>(r.CorrectAnswer),
            ScorePerQuestion = r.ScorePerQuestion
        }).ToList();

        return examResults;
    }

    public async Task<List<ExamResultDTO>> GetExamResultsByAttemptAsync(int attemptId)
    {
        //var query =
        //from ea in _context.ExamAnswers
        //join att in _context.ExamAttempts on ea.AttemptId equals att.AttemptId
        //join e in _context.Exams on att.ExamId equals e.ExamId
        //join em in _context.ExamMatrices on e.MatrixId equals em.MatrixId
        //join pq in _context.PracticeQuestions on ea.QuestionId equals pq.QuestionId
        //from emd in _context.ExamMatrixDetails
        //    .Where(d => d.ExamMatrixMatrixId == em.MatrixId &&
        //                d.QuestionType == pq.QuestionType) // nối bằng loại câu hỏi thay vì QuestionId
        //    .DefaultIfEmpty()
        //where ea.AttemptId == attemptId
        //      && !ea.IsDeleted
        //      && !att.IsDeleted
        //select new
        //{
        //    pq.QuestionId,
        //    pq.Content,
        //    pq.CorrectAnswer,
        //    ea.AnswerContent,
        //    ScorePerQuestion = emd.ScorePerQuestion
        //};

        //var rawResults = await query.AsNoTracking().ToListAsync();

        //var examResults = rawResults.Select(r => new ExamResultDTO
        //{
        //    QuestionId = r.QuestionId,
        //    QuestionContent = r.Content,
        //    StudentAnswer = string.IsNullOrWhiteSpace(r.AnswerContent)
        //        ? new List<AnswerOption>()
        //        : JsonSerializer.Deserialize<List<AnswerOption>>(r.AnswerContent!),
        //    CorrectAnswer = string.IsNullOrEmpty(r.CorrectAnswer)
        //        ? new List<AnswerOption>()
        //        : JsonSerializer.Deserialize<List<AnswerOption>>(r.CorrectAnswer),
        //    ScorePerQuestion = r.ScorePerQuestion
        //}).ToList();

        //return examResults;


        var attempt = await _context.ExamAttempts
        .AsNoTracking()
        .Include(a => a.Exam)
            .ThenInclude(e => e.Matrix)
                .ThenInclude(m => m.Exammatrixdetails)
        .Include(a => a.Exam)
            .ThenInclude(e => e.Questions)
        .Include(a => a.Examanswers)
        .FirstOrDefaultAsync(a => a.AttemptId == attemptId && !a.IsDeleted);

        if (attempt == null || attempt.Exam == null)
            return new List<ExamResultDTO>();

        var matrixDetails = attempt.Exam.Matrix?.Exammatrixdetails ?? Enumerable.Empty<ExamMatrixDetail>();
        var questions = attempt.Exam.Questions ?? Enumerable.Empty<PracticeQuestion>();
        var studentAnswers = attempt.Examanswers ?? Enumerable.Empty<ExamAnswer>();

        var results = new List<ExamResultDTO>(questions.Count());

        foreach (var q in questions)
        {
            var ans = studentAnswers.FirstOrDefault(a => a.QuestionId == q.QuestionId && !a.IsDeleted);

            decimal? scorePerQuestion = null;
            if (!string.IsNullOrEmpty(q.QuestionType))
            {
                var emd = matrixDetails.FirstOrDefault(d => d.QuestionType == q.QuestionType);
                if (emd != null)
                    scorePerQuestion = emd.ScorePerQuestion;
            }

            List<AnswerOption> correct = new List<AnswerOption>();
            List<AnswerOption> student = new List<AnswerOption>();

            try
            {
                if (!string.IsNullOrEmpty(q.CorrectAnswer))
                {
                    var temp = JsonSerializer.Deserialize<List<AnswerOption>>(q.CorrectAnswer);
                    if (temp != null) correct = temp;
                }
            }
            catch
            {
            }

            try
            {
                if (!string.IsNullOrWhiteSpace(ans?.AnswerContent))
                {
                    var temp = JsonSerializer.Deserialize<List<AnswerOption>>(ans!.AnswerContent!);
                    if (temp != null) student = temp;
                }
            }
            catch
            {
            }

            results.Add(new ExamResultDTO
            {
                QuestionId = q.QuestionId,
                QuestionContent = q.Content,
                CorrectAnswer = correct,
                StudentAnswer = student,
                ScorePerQuestion = scorePerQuestion,
                QuestionType = q.QuestionType,

            });
        }

        return results;
    }



}