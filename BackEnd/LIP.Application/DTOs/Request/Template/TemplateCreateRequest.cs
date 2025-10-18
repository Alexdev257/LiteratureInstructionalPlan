using System;

namespace LIP.Application.DTOs.Request.Template;

public class TemplateCreateRequest
{
    public string? Title { get; set; }
    public int? GradeLevelId { get; set; }
    public decimal? Price { get; set; }
    public int? CreatedBy { get; set; }

    public string FileName { get; set; } = string.Empty;
    public Stream? FileStream { get; set; }
}