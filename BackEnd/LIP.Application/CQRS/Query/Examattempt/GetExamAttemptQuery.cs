using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamAttempt;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.Examattempt;

public class GetExamAttemptQuery : IRequest<GetExamAttemptResponse>, IValidatable<GetExamAttemptResponse>
{
    public int AttemptId { get; set; }
    public bool? IsAdmin { get; set; } = false!;

    public Task<GetExamAttemptResponse> ValidateAsync()
    {
        var response = new GetExamAttemptResponse();
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