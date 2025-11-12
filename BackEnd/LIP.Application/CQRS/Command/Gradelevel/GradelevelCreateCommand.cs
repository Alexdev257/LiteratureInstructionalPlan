using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.GradeLevel;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Gradelevel;

public class GradelevelCreateCommand : IRequest<GradeLevelCreateResponse>, IValidatable<GradeLevelCreateResponse>
{
    public string? Name { get; set; }

    public Task<GradeLevelCreateResponse> ValidateAsync()
    {
        var response = new GradeLevelCreateResponse();
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