using System;
using System.Collections.Generic;

namespace LIP.Domain.Entities;

public partial class Template
{
    public int TemplateId { get; set; }

    public string? Title { get; set; }

    public string? FilePath { get; set; }

    public int? GradeLevelId { get; set; }

    public int? SeriesId { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual Gradelevel? GradeLevel { get; set; }

    public virtual Bookseries? Series { get; set; }
}
