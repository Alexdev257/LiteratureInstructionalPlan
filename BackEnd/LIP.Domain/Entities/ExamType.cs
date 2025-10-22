using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LIP.Domain.Entities;

public partial class ExamType
{
    [Key]
    public int ExamTypeId { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();
}