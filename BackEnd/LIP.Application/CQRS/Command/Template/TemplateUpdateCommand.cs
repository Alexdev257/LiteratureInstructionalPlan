using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Template;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Template;

public class TemplateUpdateCommand : IRequest<TemplateUpdateResponse>, IValidatable<TemplateUpdateResponse>
{
    public int TemplateId { get; set; }
    public string? Title { get; set; }
    public int? GradeLevelId { get; set; }
    public decimal? Price { get; set; }
    public int? CreatedBy { get; set; }
    public DateTime? CreatedAt { get; set; }

    /// <summary>
    ///     Result of Upload Cloundinary ( do not need check )
    /// </summary>
    public string FilePath { get; set; } = string.Empty;

    public string ViewPath { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public Stream? FileStream { get; set; }

    public Task<TemplateUpdateResponse> ValidateAsync()
    {
        var response = new TemplateUpdateResponse();

        if (TemplateId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "Id",
                Detail = "Id is required and must be greater than 0."
            });

        if (string.IsNullOrWhiteSpace(Title))
            response.ListErrors.Add(new Errors
            {
                Field = "Title",
                Detail = "Title is null or empty"
            });

        if (!GradeLevelId.HasValue || GradeLevelId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "GradeLevelId",
                Detail = "GradeLevelId is required and must be greater than 0."
            });

        if (!Price.HasValue || Price <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "SeriesId",
                Detail = "SeriesId is required and must be greater than 0."
            });

        if (!CreatedBy.HasValue || CreatedBy <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "CreatedBy",
                Detail = "CreatedBy is required and must be greater than 0."
            });

        if (string.IsNullOrWhiteSpace(FileName))
            response.ListErrors.Add(new Errors
            {
                Field = "FileName",
                Detail = "FileName is required and must be greater than 0."
            });

        if (FileStream == null || FileStream.Length == 0)
            response.ListErrors.Add(new Errors
            {
                Field = "FileStream",
                Detail = "FileStream is required and must be greater than 0."
            });

        if (response.ListErrors.Count > 0) response.IsSuccess = false;

        return Task.FromResult(response);
    }
}