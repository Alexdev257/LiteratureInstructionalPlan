namespace LIP.Application.DTOs.Request.Exam;

public class ExamLastSubmitRequest
{
    public int AttemptId { get; set; }
    public List<SubmitAnswerDTO> Answers { get; set; } = new();
}