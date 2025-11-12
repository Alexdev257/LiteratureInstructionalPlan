using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.ExamType;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Examtype;

public class ExamtypeCreateCommand : IRequest<ExamTypeCreatResponse>, IValidatable<ExamTypeCreatResponse>
{
    public string? Name { get; set; }

    public Task<ExamTypeCreatResponse> ValidateAsync()
    {
        var response = new ExamTypeCreatResponse();
        if (string.IsNullOrEmpty(Name))
            response.ListErrors.Add(new Errors
            {
                Field = "Name",
                Detail = "Name is not null or empty!"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}