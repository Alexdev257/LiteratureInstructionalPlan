using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Exam;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.Exam;

public class GetExamQuery : IRequest<GetExamResponse>, IValidatable<GetExamResponse>
{
    public int ExamId { get; set; }
    public bool? IsAdmin { get; set; } = false!;
    public bool? IsShowCorrectAnswer { get; set; } = false!;

    public Task<GetExamResponse> ValidateAsync()
    {
        var response = new GetExamResponse();
        if (ExamId.ToString() != null)
            if (ExamId <= 0)
                response.ListErrors.Add(new Errors
                {
                    Field = "ExamId",
                    Detail = "ExamId must be larger than 0"
                });

        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}