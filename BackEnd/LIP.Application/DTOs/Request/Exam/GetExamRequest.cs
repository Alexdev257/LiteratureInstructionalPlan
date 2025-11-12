namespace LIP.Application.DTOs.Request.Exam;

public class GetExamRequest
{
    public int? AttemptId { get; set; }
    public bool? IsAdmin { get; set; } = false!;
    public bool? IsShowCorrectAnswer { get; set; } = false!;
}