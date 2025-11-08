using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamType;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.Examtype;

public class GetExamTypeQuery : IRequest<GetExamTypeResponse>, IValidatable<GetExamTypeResponse>
{
    public int ExamTypeId { get; set; }

    public Task<GetExamTypeResponse> ValidateAsync()
    {
        var response = new GetExamTypeResponse();
        if (string.IsNullOrEmpty(ExamTypeId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "ExamTypeId",
                Detail = "ExamTypeId is not null or empty!"
            });
        if (!int.TryParse(ExamTypeId.ToString(), out _))
            response.ListErrors.Add(new Errors
            {
                Field = "ExamTypeId",
                Detail = "ExamTypeId must be an integer!"
            });
        if (ExamTypeId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "ExamTypeId",
                Detail = "ExamTypeId must be larger than 0!"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}