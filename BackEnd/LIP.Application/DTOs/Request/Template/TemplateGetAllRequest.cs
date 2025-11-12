namespace LIP.Application.DTOs.Request.Template;

public class TemplateGetAllRequest : PaginationRequest
{
    public string? Search { get; set; }
}