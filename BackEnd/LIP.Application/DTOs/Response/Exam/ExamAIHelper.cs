namespace LIP.Application.DTOs.Response.Exam;

public class ExamAIHelper
{
    public string QuestionContent { get; set; } = null!;
    public string CorrectAnswer { get; set; } = null!;
    public string UserAnswer { get; set; } = null!;
    public decimal Score { get; set; }
}