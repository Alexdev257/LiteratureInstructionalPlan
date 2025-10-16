using System;
using System.Collections.Generic;

namespace LIP.Domain.Entities;

public partial class Answerguide
{
    public int AnswerGuideId { get; set; }

    public int? ExamId { get; set; }

    public string? KeyPoints { get; set; }

    public int? MaxScore { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual Exam? Exam { get; set; }
}
