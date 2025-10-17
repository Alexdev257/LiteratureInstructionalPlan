using System;
using System.Collections.Generic;

namespace LIP.Domain.Entities;

public partial class Examanswer
{
    public int AnswerId { get; set; }

    public int? AttemptId { get; set; }

    public int? QuestionId { get; set; }

    public string? AnswerContent { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual Examattempt? Attempt { get; set; }

    public virtual Practicequestion? Question { get; set; }
}
