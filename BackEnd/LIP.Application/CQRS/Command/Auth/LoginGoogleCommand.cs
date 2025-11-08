using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Auth;

public class LoginGoogleCommand : IRequest<LoginGoogleResponse>, IValidatable<LoginGoogleResponse>
{
    public string GoogleToken { get; set; } = null!;

    public Task<LoginGoogleResponse> ValidateAsync()
    {
        var response = new LoginGoogleResponse();
        if (string.IsNullOrEmpty(GoogleToken))
            response.ListErrors.Add(new Errors
            {
                Field = "GoogleToken",
                Detail = "GoogleToken is null or empty"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}