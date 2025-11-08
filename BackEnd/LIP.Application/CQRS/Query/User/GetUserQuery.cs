using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Query.User;

public class GetUserQuery : IRequest<GetUserReponse>, IValidatable<GetUserReponse>
{
    public int UserId { get; set; }
    public bool? IsAdmin { get; set; } = false!;

    public Task<GetUserReponse> ValidateAsync()
    {
        var response = new GetUserReponse();
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
                Detail = "UserId must be an Integer!"
            });
        if (UserId <= 0)
            response.ListErrors.Add(new Errors
            {
                Field = "UserId",
                Detail = "UserId must be larger than 0!"
            });
        if (IsAdmin != null)
            if (!bool.TryParse(IsAdmin.ToString(), out _))
                response.ListErrors.Add(new Errors
                {
                    Field = "IsAdmin",
                    Detail = "IsAdmin must be a boolean value!"
                });

        if (response.ListErrors.Count > 0) response.IsSuccess = false;
        return Task.FromResult(response);
    }
}