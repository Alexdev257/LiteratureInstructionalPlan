namespace LIP.Application.DTOs.Response.Template;

public class TemplateGetDTO
{
    public int TemplateId { get; set; }

    public string Title { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;

    public string ViewPath { get; set; } = string.Empty;

    public int? GradeLevelId { get; set; }

    public float Price { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int Saled { get; set; }
}