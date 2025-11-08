using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Auth;

public class RefreshCommand : IRequest<RefreshResponse>, IValidatable<RefreshResponse>
{
    public int Id { get; set; }
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;

    public Task<RefreshResponse> ValidateAsync()
    {
        RefreshResponse response = new();
        if (Id <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "Id",
                Detail = "Id must be greater than zero"
            });
        if (string.IsNullOrEmpty(Id.ToString()))
            response.ListErrors.Add(new Errors
            {
                Field = "Id",
                Detail = "Id is null or empty"
            });
        if (!int.TryParse(Id.ToString(), out var _))
            response.ListErrors.Add(new Errors
            {
                Field = "Id",
                Detail = "Id is not a number"
            });
        if (string.IsNullOrEmpty(AccessToken))
            response.ListErrors.Add(new Errors
            {
                Field = "AccessToken",
                Detail = "AccessToken is null or empty"
            });
        if (string.IsNullOrEmpty(RefreshToken))
            response.ListErrors.Add(new Errors
            {
                Field = "RefreshToken",
                Detail = "RefreshToken is null or empty"
            });
        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}