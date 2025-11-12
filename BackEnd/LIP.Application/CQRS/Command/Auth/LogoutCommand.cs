using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Auth;

public class LogoutCommand : IRequest<LogoutResponse>, IValidatable<LogoutResponse>
{
    public int UserId { get; set; }

    public Task<LogoutResponse> ValidateAsync()
    {
        var response = new LogoutResponse();
        if (string.IsNullOrEmpty(UserId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "User ID is not null or empty!"
            });

        if (!int.TryParse(UserId.ToString(), out _))
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "User ID must be an Integer!"
            });

        if (UserId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "User ID must larger than 0!"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}