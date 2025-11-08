using LIP.Application.CQRS.Command.ExamMatrixDetail;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.ExamMatrix;

public class ExamMatrixUpdateCommand : IRequest<ExamMatrixUpdateResponse>, IValidatable<ExamMatrixUpdateResponse>
{
    public int MatrixId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int? GradeLevelId { get; set; }
    public int? CreatedByUserId { get; set; }
    public DateTime? CreatedAt { get; set; }
    public string? Status { get; set; }
    public string? Notes { get; set; }
    public List<ExamMatrixDetailUpdateCommand> Details { get; set; }

    public Task<ExamMatrixUpdateResponse> ValidateAsync()
    {
        var response = new ExamMatrixUpdateResponse();
        if (string.IsNullOrEmpty(MatrixId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "MatrixId",
                Detail = "MatrixId is not null or empty!"
            });
        if (!int.TryParse(MatrixId.ToString(), out _))
            response.ListErrors.Add(new Errors
            {
                Field = "MatrixId",
                Detail = "MatrixId must be an Integer!"
            });
        if (MatrixId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "MatrixId",
                Detail = "MatrixId must larger than 0!"
            });
        if (string.IsNullOrEmpty(Title))
            response.ListErrors.Add(new Errors
            {
                Field = "Title",
                Detail = "Title is not null or empty!"
            });
        if (string.IsNullOrEmpty(Description))
            response.ListErrors.Add(new Errors
            {
                Field = "Description",
                Detail = "Description is not null or empty!"
            });
        if (string.IsNullOrEmpty(GradeLevelId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "GradeLevelId",
                Detail = "GradeLevelId is not null or empty!"
            });
        if (!int.TryParse(GradeLevelId.ToString(), out _))
            response.ListErrors.Add(new Errors
            {
                Field = "GradeLevelId",
                Detail = "GradeLevelId must be an Integer!"
            });
        if (GradeLevelId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "GradeLevelId",
                Detail = "GradeLevelId must be larger than 0!"
            });
        if (string.IsNullOrEmpty(CreatedByUserId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "CreatedByUserId",
                Detail = "CreatedByUserId is not null or empty!"
            });
        if (!int.TryParse(CreatedByUserId.ToString(), out _))
            response.ListErrors.Add(new Errors
            {
                Field = "CreatedByUserId",
                Detail = "CreatedByUserId must be an Integer!"
            });
        if (CreatedByUserId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "CreatedByUserId",
                Detail = "CreatedByUserId must be larger than 0!"
            });
        if (string.IsNullOrEmpty(Status))
            response.ListErrors.Add(new Errors
            {
                Field = "Status",
                Detail = "Status is not null or empty!"
            });
        if (string.IsNullOrEmpty(Notes))
            response.ListErrors.Add(new Errors
            {
                Field = "Notes",
                Detail = "Notes is not null or empty!"
            });

        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}