namespace LIP.Application.DTOs.Request.ExamType;

public class GetAllExamTypeRequest : PaginationRequest
{
    public string? Name { get; set; } = null!;
}