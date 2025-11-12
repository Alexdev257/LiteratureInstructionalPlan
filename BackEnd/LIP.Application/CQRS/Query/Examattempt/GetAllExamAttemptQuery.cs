using LIP.Application.DTOs.Request;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamAttempt;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.Examattempt;

public class GetAllExamAttemptQuery : PaginationRequest, IRequest<GetAllExamAttemptResponse>,
    IValidatable<GetAllExamAttemptResponse>
{
    public int? ExamId { get; set; }
    public int? UserId { get; set; }
    public string? Status { get; set; }
    public bool? IsAdmin { get; set; } = false!;

    public Task<GetAllExamAttemptResponse> ValidateAsync()
    {
        var response = new GetAllExamAttemptResponse();
        if (ExamId.ToString() != null)
            if (ExamId <= 0)
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamId",
                    Detail = "ExamId must be larger than 0"
                });

        if (UserId.ToString() != null)
            if (UserId <= 0)
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "UserId must be larger than 0"
                });

        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}