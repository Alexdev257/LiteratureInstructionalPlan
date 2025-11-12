using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Exam;

public class ExamDeleteCommand : IRequest<ExamDeleteResponse>, IValidatable<ExamDeleteResponse>
{
    public int ExamId { get; set; }

    public Task<ExamDeleteResponse> ValidateAsync()
    {
        var response = new ExamDeleteResponse();
        if (string.IsNullOrEmpty(ExamId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "ExamId",
                Detail = "ExamId is not null or empty!"
            });
        if (ExamId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "ExamId",
                Detail = "ExamId must be larger than 0!"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}