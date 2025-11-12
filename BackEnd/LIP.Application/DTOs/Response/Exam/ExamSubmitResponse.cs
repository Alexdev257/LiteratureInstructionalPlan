namespace LIP.Application.DTOs.Response.Exam;

public class ExamSubmitResponse : CommonResponse<ExamSubmitResponseDTO>
{
}

public class ExamSubmitResponseDTO
{
    public int AttemptId { get; set; }
}