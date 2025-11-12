namespace LIP.Application.DTOs.Response.Exam;

public class ExamLastSubmitResponse : CommonResponse<ExamLastSubmitResponseDTO>
{
}

public class ExamLastSubmitResponseDTO
{
    public decimal? Score { get; set; }
    public string? FeedBack { get; set; }
}