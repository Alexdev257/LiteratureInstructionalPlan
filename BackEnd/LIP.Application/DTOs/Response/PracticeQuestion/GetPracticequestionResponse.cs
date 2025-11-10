using LIP.Application.DTOs.Request.PracticeQuestion;
using LIP.Application.DTOs.Response.Template;

namespace LIP.Application.DTOs.Response.PracticeQuestion;

public class GetPracticequestionResponse : CommonResponse<GetPracticequestionResponseDTO>
{
}

public class GetPracticequestionResponseDTO
{
    public int QuestionId { get; set; }

    public string? Content { get; set; }

    public string? QuestionType { get; set; }

    public string? Difficulty { get; set; }

    //public string? Answer { get; set; }
    public List<AnswerOption>? Answer { get; set; }
    public List<AnswerOption>? CorrectAnswer { get; set; }

    //public int? GradeLevelId { get; set; }

    //public int? CreatedByNavigationUserId { get; set; }
    public GradeLevelDTO GradeLevel { get; set; }
    public CreatedByDTO CreatedBy { get; set; }

    public DateTime? CreatedAt { get; set; }
}