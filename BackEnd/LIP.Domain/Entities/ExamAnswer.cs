using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LIP.Domain.Entities;

public partial class ExamAnswer
{
    [Key]
    public int AnswerId { get; set; }

    public int? AttemptId { get; set; }

    public int? QuestionId { get; set; }

    public string? AnswerContent { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual ExamAttempt? Attempt { get; set; }

    public virtual PracticeQuestion? Question { get; set; }
}