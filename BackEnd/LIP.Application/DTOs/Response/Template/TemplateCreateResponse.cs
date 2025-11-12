namespace LIP.Application.DTOs.Response.Template;

public class TemplateCreateResponse : CommonResponse<TemplateCreateResponseDTO>
{
}

public class TemplateCreateResponseDTO
{
    public string? Title { get; set; }

    public string? FilePath { get; set; }

    public string? ViewPath { get; set; }

    public int? GradeLevelId { get; set; }

    public decimal? Price { get; set; }

    public int? CreatedBy { get; set; }
}