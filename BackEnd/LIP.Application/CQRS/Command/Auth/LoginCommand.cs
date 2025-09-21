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
    public class LoginCommand : IRequest<LoginResponse>, IValidatable<LoginResponse>
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;

        public Task<LoginResponse> ValidateAsync()
        {
            LoginResponse response = new LoginResponse();
            if (string.IsNullOrEmpty(this.Email))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Email",
                    Detail = "Email is null or empty"
                });
            }
            if (string.IsNullOrEmpty(this.Password))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Password",
                    Detail = "Password is null or empty"
                });
            }
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
