namespace LIP.Application.DTOs.Response.ExamType;

public class GetAllExamTypeResponse : CommonResponse<PaginationResponse<GetAllExamTypeResponseDTO>>
{
}

public class GetAllExamTypeResponseDTO
{
    public int ExamTypeId { get; set; }
    public string? Name { get; set; }
}