using System;
using System.Collections.Generic;

namespace LIP.Domain.Entities;

public partial class Exammatrix
{
    public int MatrixId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public int? GradeLevelId { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string? Status { get; set; }

    public string? LessonName { get; set; }

    public string? QuestionType { get; set; }

    public string? Difficulty { get; set; }

    public int? Quantity { get; set; }

    public decimal? ScorePerQuestion { get; set; }

    public string? Notes { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();

    public virtual Gradelevel? GradeLevel { get; set; }
}
