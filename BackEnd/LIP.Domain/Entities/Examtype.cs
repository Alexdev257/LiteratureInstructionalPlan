using System;
using System.Collections.Generic;

namespace LIP.Domain.Entities;

public partial class Examtype
{
    public int ExamTypeId { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();
}
