namespace LIP.Application.DTOs.Request.PracticeQuestion;

public class GetAllPracticequestionRequest : PaginationRequest
{
    public string? QuestionType { get; set; }
    public int? GradeLevelId { get; set; }
    public int? CreatedByUserId { get; set; }
    public string? Search { get; set; }
    public bool? IsAdmin { get; set; } = false!;
    public bool? IsShowAnswer { get; set; } = false!;
    public bool? IsShowCorrectAnswer { get; set; } = false!;
}