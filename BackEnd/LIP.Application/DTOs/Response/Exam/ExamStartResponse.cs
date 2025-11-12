namespace LIP.Application.DTOs.Response.Exam;

public class ExamStartResponse : CommonResponse<ExamStartResponseDTO>
{
}

public class ExamStartResponseDTO
{
    public int AttemptId { get; set; }
}