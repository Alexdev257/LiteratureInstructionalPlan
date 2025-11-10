using LIP.Application.DTOs.Request.PracticeQuestion;

namespace LIP.Application.DTOs.Response.PracticeQuestion;

public class PracticeQuestionCreateResponse : CommonResponse<PracticeQuestionCreateResponseDTO>
{
}

public class PracticeQuestionCreateResponseDTO
{
    public int QuestionId { get; set; }

    public string? Content { get; set; }

    public string? QuestionType { get; set; }

    public string? Difficulty { get; set; }

    public List<AnswerOption>? Answer { get; set; }
    public List<AnswerOption>? CorrectAnswer { get; set; }
    public int? GradeLevelId { get; set; }
    public int? CreatedByNavigationUserId { get; set; }
    public DateTime? CreatedAt { get; set; }
}