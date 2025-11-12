using LIP.Application.DTOs.Request.PracticeQuestion;

namespace LIP.Application.DTOs.Request.Exam;

public class GetAllExamRequest : PaginationRequest
{
    public int? GradeLevelId { get; set; }
    public int? ExamTypeId { get; set; }
    public int? CreatedBy { get; set; }
    public bool? IsAdmin { get; set; } = false!;
    public bool? IsShowCorrectAnswer { get; set; } = false!;
}

public class ExamResultDTO
{
    public int QuestionId { get; set; }
    public string? QuestionContent { get; set; }
    public List<AnswerOption>? StudentAnswer { get; set; }
    public List<AnswerOption>? CorrectAnswer { get; set; }
    public decimal? ScorePerQuestion { get; set; }

    public string QuestionType { get; set; }
    //public bool IsCorrect = false;
    //=> string.Equals(StudentAnswer?.Trim(), CorrectAnswer?.Trim(), StringComparison.OrdinalIgnoreCase);
}