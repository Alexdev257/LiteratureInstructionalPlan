using System.Text.RegularExpressions;
using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Auth;

public class ChangeEmailCommand : IRequest<ChangeEmailResponse>, IValidatable<ChangeEmailResponse>
{
    public int UserId { get; set; }
    public string NewEmail { get; set; } = null!;

    public Task<ChangeEmailResponse> ValidateAsync()
    {
        var response = new ChangeEmailResponse();
        if (string.IsNullOrEmpty(UserId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "UserId is not null or empty"
            });

        if (string.IsNullOrEmpty(NewEmail))
            response.ListErrors.Add(new Errors
            {
                Field = "NewEmail",
                Detail = "New Email is not null or empty"
            });
        if (!Regex.IsMatch(NewEmail, @"([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"))
            response.ListErrors.Add(new Errors
            {
                Field = "Email",
                Detail = "Email is not valid!"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}