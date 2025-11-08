using LIP.Application.DTOs.Request.PracticeQuestion;

namespace LIP.Application.DTOs.Request.Exam;

public class ExamSubmitRequest
{
    public int AttemptId { get; set; }
    public List<SubmitAnswerDTO> Answers { get; set; } = new();
}

public class SubmitAnswerDTO
{
    public int QuestionId { get; set; }
    public List<AnswerOption>? AnswerContent { get; set; } = new();
}