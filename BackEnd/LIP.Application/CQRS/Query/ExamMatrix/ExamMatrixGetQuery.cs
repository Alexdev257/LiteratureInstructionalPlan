using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.ExamMatrix;

public class ExamMatrixGetQuery : IRequest<ExamMatrixGetResponse>, IValidatable<ExamMatrixGetResponse>
{
    public int MatrixId { get; set; }
    public bool? IsAdmin { get; set; } = false;

    public Task<ExamMatrixGetResponse> ValidateAsync()
    {
        var response = new ExamMatrixGetResponse();
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
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}