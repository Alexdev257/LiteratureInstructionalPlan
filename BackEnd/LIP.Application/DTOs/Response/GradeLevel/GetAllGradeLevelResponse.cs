namespace LIP.Application.DTOs.Response.GradeLevel;

public class GetAllGradeLevelResponse : CommonResponse<PaginationResponse<GetAllGradeLevelResponseDTO>>
{
}

public class GetAllGradeLevelResponseDTO
{
    public int GradeLevelId { get; set; }
    public string? Name { get; set; } = null!;
}