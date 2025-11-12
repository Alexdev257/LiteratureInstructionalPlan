using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamAttempt;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Examattempt;

public class ExamattemptDeleteCommand : IRequest<ExamAttemptDeleteResponse>, IValidatable<ExamAttemptDeleteResponse>
{
    public int AttemptId { get; set; }

    public Task<ExamAttemptDeleteResponse> ValidateAsync()
    {
        var response = new ExamAttemptDeleteResponse();
        if (AttemptId.ToString() != null)
            if (AttemptId <= 0)
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamId",
                    Detail = "ExamId must be larger than 0"
                });

        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}