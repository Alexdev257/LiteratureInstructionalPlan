using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.ExamMatrix;

public class ExamMatrixDeleteCommand : IRequest<ExamMatrixDeleteResponse>, IValidatable<ExamMatrixDeleteResponse>
{
    public int MatrixId { get; set; }

    public Task<ExamMatrixDeleteResponse> ValidateAsync()
    {
        var response = new ExamMatrixDeleteResponse();
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
                Detail = "MatrixId must be larger than 0!"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
    //public string? Title { get; set; }
    //public string? Description { get; set; }
    //public int? GradeLevelId { get; set; }
    //public int? CreatedByUserId { get; set; }
    //public DateTime? CreatedAt { get; set; }
    //public string? Status { get; set; }
    //public string? Notes { get; set; }
}