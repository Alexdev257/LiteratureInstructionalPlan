using LIP.Application.DTOs.Response.Auth;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.Auth
{
    public class LogoutCommand : IRequest<LogoutResponse>, IValidatable<LogoutResponse>
    {
        public int UserId { get; set; }

        public Task<LogoutResponse> ValidateAsync()
        {
            LogoutResponse response = new LogoutResponse();
            if (string.IsNullOrEmpty(this.UserId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "User ID is not null or empty!"
                });
            }

            if(!Int32.TryParse(this.UserId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "User ID must be an Integer!"
                });
            }

            if (UserId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "User ID must larger than 0!"
                });
            }
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
