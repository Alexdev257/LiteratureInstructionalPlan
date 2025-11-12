namespace LIP.Application.DTOs.Response.ExamType;

public class GetExamTypeResponse : CommonResponse<GetExamTypeResponseDTO>
{
}

public class GetExamTypeResponseDTO
{
    public int ExamTypeId { get; set; }
    public string? Name { get; set; }
}