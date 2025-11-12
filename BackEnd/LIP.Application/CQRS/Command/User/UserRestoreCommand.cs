using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.User;

public class UserRestoreCommand : IRequest<UserRestoreResponse>, IValidatable<UserRestoreResponse>
{
    public int UserId { get; set; }

    public Task<UserRestoreResponse> ValidateAsync()
    {
        var response = new UserRestoreResponse();
        if (string.IsNullOrEmpty(UserId.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "UserId is not null or empty!"
            });

        if (!int.TryParse(UserId.ToString(), out _))
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "UserId must be an integer!"
            });

        if (UserId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "UserId must be larger than 0!"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}