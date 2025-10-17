using System;
using System.Collections.Generic;

namespace LIP.Domain.Entities;

public partial class Examattempt
{
    public int AttemptId { get; set; }

    public int? ExamId { get; set; }

    public int? UserId { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public string? Status { get; set; }

    public decimal? Score { get; set; }

    public string? Feedback { get; set; }

    public DateTime? LastSavedAt { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual Exam? Exam { get; set; }

    public virtual ICollection<Examanswer> Examanswers { get; set; } = new List<Examanswer>();

    public virtual User? User { get; set; }
}
