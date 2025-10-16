using System;
using System.Collections.Generic;

namespace LIP.Domain.Entities;

public partial class Submission
{
    public int SubmissionId { get; set; }

    public int? ExamId { get; set; }

    public int? StudentId { get; set; }

    public string? Content { get; set; }

    public float? AutoScore { get; set; }

    public string? AiFeedback { get; set; }

    public string? Status { get; set; }

    public DateTime? SubmitTime { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual Exam? Exam { get; set; }

    public virtual User? Student { get; set; }
}
