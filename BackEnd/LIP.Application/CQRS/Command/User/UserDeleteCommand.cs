using LIP.Application.DTOs.Response.User;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.User
{
    public class UserDeleteCommand : IRequest<UserDeleteResponse>, IValidatable<UserDeleteResponse>
    {
        public int UserId { get; set; }

        public Task<UserDeleteResponse> ValidateAsync()
        {
            UserDeleteResponse response = new UserDeleteResponse();
            if (string.IsNullOrEmpty(this.UserId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "UserId is not null or empty!"
                });
            }

            if (!Int32.TryParse(this.UserId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "UserId must be an integer!"
                });
            }

            if (this.UserId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "UserId must be larger than 0!"
                });
            }
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}