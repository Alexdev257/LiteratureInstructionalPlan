// filepath: /home/tiehung/Project/LiteratureInstructionalPlan/BackEnd/LIP.Application/DTOs/Response/Exam/ExamAIQuestionFeedback.cs
namespace LIP.Application.DTOs.Response.Exam;

public class ExamAIQuestionFeedback
{
    public int QuestionIndex { get; set; }
    public decimal Score { get; set; }
    public decimal MaxScore { get; set; }
    public string Feedback { get; set; } = string.Empty;
}

