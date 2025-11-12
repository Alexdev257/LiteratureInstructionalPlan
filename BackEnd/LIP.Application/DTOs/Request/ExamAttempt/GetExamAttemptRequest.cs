namespace LIP.Application.DTOs.Request.ExamAttempt;

public class GetExamAttemptRequest
{
    //public int AttemptId { get; set; }
    public bool? IsAdmin { get; set; } = false!;
}