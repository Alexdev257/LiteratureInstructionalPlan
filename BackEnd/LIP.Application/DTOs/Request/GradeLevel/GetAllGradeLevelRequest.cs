namespace LIP.Application.DTOs.Request.GradeLevel;

public class GetAllGradeLevelRequest : PaginationRequest
{
    public string? Name { get; set; } = null!;
}