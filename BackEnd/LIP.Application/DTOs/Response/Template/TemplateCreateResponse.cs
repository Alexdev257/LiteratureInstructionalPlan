using System;

namespace LIP.Application.DTOs.Response.Template;

public class TemplateCreateResponse : CommonReponse<TemplateCreateResponseDTO>
{

}

public class TemplateCreateResponseDTO
{
    public string? Title { get; set; }

    public string? FilePath { get; set; }

    public int? GradeLevelId { get; set; }

    public int? SeriesId { get; set; }

    public int? CreatedBy { get; set; }
}
