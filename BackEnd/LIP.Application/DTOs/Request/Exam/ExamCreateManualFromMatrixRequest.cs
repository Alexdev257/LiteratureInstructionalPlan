namespace LIP.Application.DTOs.Request.Exam;

public class ExamCreateManualFromMatrixRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int DurationMinutes { get; set; }
    //public int GradeLevelId { get; set; }
    public int ExamTypeId { get; set; }

    public int CreatedByUserId { get; set; }

    //public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int MatrixId { get; set; }
    public List<int> QuestionIds { get; set; } = new();
}