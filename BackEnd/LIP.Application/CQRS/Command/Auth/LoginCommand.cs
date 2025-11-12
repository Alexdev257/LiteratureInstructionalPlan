using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Auth;

public class LoginCommand : IRequest<LoginResponse>, IValidatable<LoginResponse>
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;

    public Task<LoginResponse> ValidateAsync()
    {
        var response = new LoginResponse();
        if (string.IsNullOrEmpty(Email))
            response.ListErrors.Add(new Errors
            {
                Field = "Email",
                Detail = "Email is null or empty"
            });
        if (string.IsNullOrEmpty(Password))
            response.ListErrors.Add(new Errors
            {
                Field = "Password",
                Detail = "Password is null or empty"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}