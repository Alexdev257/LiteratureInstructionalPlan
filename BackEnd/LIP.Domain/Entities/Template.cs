using System.ComponentModel.DataAnnotations;

namespace LIP.Domain.Entities;

public class Template
{
    [Key] public int TemplateId { get; set; }

    public string? Title { get; set; }

    public string? FilePath { get; set; } // template1-userid

    public string? ViewPath { get; set; }

    public int? GradeLevelId { get; set; }

    public float Price { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime DeletedAt { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual GradeLevel? GradeLevel { get; set; }

    public virtual ICollection<TemplateOrder> Templatebookings { get; set; } = new List<TemplateOrder>();
}