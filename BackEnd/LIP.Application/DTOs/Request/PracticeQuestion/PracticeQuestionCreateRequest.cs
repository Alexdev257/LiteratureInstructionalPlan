namespace LIP.Application.DTOs.Request.PracticeQuestion;

public class PracticeQuestionCreateRequest
{
    //public int QuestionId { get; set; }

    public string? Content { get; set; }

    public string? QuestionType { get; set; }

    public string? Difficulty { get; set; }

    //public string? Answer { get; set; }
    public List<AnswerOption>? Answer { get; set; }
    public List<AnswerOption>? CorrectAnswer { get; set; }
    public int? GradeLevelId { get; set; }

    public int? CreatedByUserId { get; set; }

    //public DateTime? CreatedAt { get; set; }

    //public bool IsDeleted { get; set; }

    //public DateTime DeletedAt { get; set; }
}

public class AnswerOption
{
    public string? Label { get; set; } = string.Empty;
    public string? Text { get; set; } = string.Empty;
}