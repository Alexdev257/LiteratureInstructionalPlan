using System;
using System.Collections.Generic;

namespace LIP.Domain.Entities;

public partial class Practicequestion
{
    public int QuestionId { get; set; }

    public string? Content { get; set; }

    public string? QuestionType { get; set; }

    public string? Difficulty { get; set; }

    public string? Answer { get; set; }

    public int? GradeLevelId { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ICollection<Examanswer> Examanswers { get; set; } = new List<Examanswer>();

    public virtual Gradelevel? GradeLevel { get; set; }

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();
}
