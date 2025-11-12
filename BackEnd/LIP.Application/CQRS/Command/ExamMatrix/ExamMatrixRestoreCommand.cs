using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamMatrix;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.ExamMatrix;

public class ExamMatrixRestoreCommand : IRequest<ExamMatrixRestoreResponse>, IValidatable<ExamMatrixRestoreResponse>
{
    public int MatrixId { get; set; }

    public Task<ExamMatrixRestoreResponse> ValidateAsync()
    {
        var response = new ExamMatrixRestoreResponse();
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
}