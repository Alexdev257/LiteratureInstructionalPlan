using System;
using System.Collections.Generic;

namespace LIP.Domain.Entities;

public partial class Exam
{
    public int ExamId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public int? DurationMinutes { get; set; }

    public int? GradeLevelId { get; set; }

    public int? ExamTypeId { get; set; }

    public int? MatrixId { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual ICollection<Answerguide> Answerguides { get; set; } = new List<Answerguide>();

    public virtual User? CreatedByNavigation { get; set; }

    public virtual Examtype? ExamType { get; set; }

    public virtual ICollection<Examattempt> Examattempts { get; set; } = new List<Examattempt>();

    public virtual Gradelevel? GradeLevel { get; set; }

    public virtual Exammatrix? Matrix { get; set; }

    public virtual ICollection<Submission> Submissions { get; set; } = new List<Submission>();

    public virtual ICollection<Practicequestion> Questions { get; set; } = new List<Practicequestion>();
}
