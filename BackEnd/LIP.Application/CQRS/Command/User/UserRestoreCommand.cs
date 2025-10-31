using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.User
{
    public class UserRestoreCommand : IRequest<UserRestoreResponse>, IValidatable<UserRestoreResponse>
    {
        public int UserId { get; set; }
        public Task<UserRestoreResponse> ValidateAsync()
        {
            UserRestoreResponse response = new UserRestoreResponse();
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
