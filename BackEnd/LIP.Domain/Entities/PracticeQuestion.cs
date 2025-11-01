using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LIP.Domain.Entities;

public partial class PracticeQuestion
{
    [Key]
    public int QuestionId { get; set; }

    public string? Content { get; set; }

    public string? QuestionType { get; set; }

    public string? Difficulty { get; set; }

    public string? Answer { get; set; }
    public string? CorrectAnswer { get; set; }

    public int? GradeLevelId { get; set; }

    public int? CreatedByNavigationUserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ICollection<ExamAnswer> Examanswers { get; set; } = new List<ExamAnswer>();

    public virtual GradeLevel? GradeLevel { get; set; }

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();
}