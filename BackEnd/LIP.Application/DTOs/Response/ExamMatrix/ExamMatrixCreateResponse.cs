namespace LIP.Application.DTOs.Response.ExamMatrix;

public class ExamMatrixCreateResponse : CommonResponse<ExamMatrixCreateResponseDTO>
{
}

public class ExamMatrixCreateResponseDTO
{
    public int MatrixId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int? GradeLevelId { get; set; }
    public int? CreatedByUserId { get; set; }
    public DateTime? CreatedAt { get; set; }
    public string? Status { get; set; }
    public string? Notes { get; set; }
    public int TotalQuestions { get; set; }
    public decimal TotalPoint { get; set; }
    public List<ExamMatrixDetailResponseDTO> Details { get; set; }
}