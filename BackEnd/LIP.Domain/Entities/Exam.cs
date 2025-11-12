using System.ComponentModel.DataAnnotations;

namespace LIP.Domain.Entities;

public class Exam
{
    [Key] public int ExamId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public int? DurationMinutes { get; set; }

    public int? GradeLevelId { get; set; }

    public int? ExamTypeId { get; set; }

    public int? MatrixId { get; set; }

    public int? CreatedByNavigationUserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ExamType? ExamType { get; set; }

    public virtual ICollection<ExamAttempt> Examattempts { get; set; } = new List<ExamAttempt>();

    public virtual GradeLevel? GradeLevel { get; set; }

    public virtual ExamMatrix? Matrix { get; set; }

    public virtual ICollection<PracticeQuestion> Questions { get; set; } = new List<PracticeQuestion>();
}