using System;
using System.Collections.Generic;

namespace LIP.Domain.Entities;

public partial class Gradelevel
{
    public int GradeLevelId { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Exammatrix> Exammatrices { get; set; } = new List<Exammatrix>();

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();

    public virtual ICollection<Practicequestion> Practicequestions { get; set; } = new List<Practicequestion>();

    public virtual ICollection<Template> Templates { get; set; } = new List<Template>();
}
