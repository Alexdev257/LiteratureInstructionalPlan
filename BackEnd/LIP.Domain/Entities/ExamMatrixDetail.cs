using System.ComponentModel.DataAnnotations;

namespace LIP.Domain.Entities;

public partial class ExamMatrixDetail
{
    [Key]
    public int ExamMatrixDetailId { get; set; }
    
    public string? LessonName { get; set; }

    public string? QuestionType { get; set; }

    public string? Difficulty { get; set; }

    public int? Quantity { get; set; }

    public decimal? ScorePerQuestion { get; set; }
    
    public int? ExamMatrixMatrixId { get; set; }
    
    public virtual ExamMatrix? ExamMatrix { get; set; }
}