namespace LIP.Application.DTOs.Request.Exam;

public class ExamUpdateFromMatrixRequest
{
    //public int ExamId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int DurationMinutes { get; set; }
    public int ExamTypeId { get; set; }
    public int GradeLevelId { get; set; }
    public int MatrixId { get; set; }
    public List<int> QuestionIds { get; set; } = new();
}