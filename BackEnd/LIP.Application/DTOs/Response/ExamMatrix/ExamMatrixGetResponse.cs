namespace LIP.Application.DTOs.Response.ExamMatrix;

public class ExamMatrixGetResponse : CommonResponse<ExamMatrixGetResponseDTO>
{
}

public class ExamMatrixGetResponseDTO
{
    public int MatrixId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int? GradeLevelId { get; set; }
    public int? CreatedByUserId { get; set; }
    public DateTime? CreatedAt { get; set; }
    public string? Status { get; set; }
    public string? Notes { get; set; }
    public List<ExamMatrixDetailResponseDTO> Details { get; set; }
}