namespace LIP.Application.DTOs.Request.ExamMatrix;

public class ExamMatrixUpdateRequest
{
    //public int MatrixId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int? GradeLevelId { get; set; }
    public int? CreatedByUserId { get; set; }
    public DateTime? CreatedAt { get; set; }
    public string? Status { get; set; }
    public string? Notes { get; set; }
    public List<ExamMatrixDetailUpdateDTO> Details { get; set; }
}

public class ExamMatrixDetailUpdateDTO
{
    public int ExamMatrixDetailId { get; set; }

    public string? LessonName { get; set; }

    public string? QuestionType { get; set; }

    public string? Difficulty { get; set; }

    public int? Quantity { get; set; }

    public decimal? ScorePerQuestion { get; set; }
}