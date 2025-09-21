using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Command.Auth
{
    public class ForgotPasswordCommand : IRequest<ForgotPasswordResponse>, IValidatable<ForgotPasswordResponse>
    {
        public string Email { get; set; } = null!;
        public string NewPassword { get; set; } = null!;

        public Task<ForgotPasswordResponse> ValidateAsync()
        {
            ForgotPasswordResponse response = new();
            if (string.IsNullOrEmpty(this.Email))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Email",
                    Detail = "Email is not null or empty"
                });
            }
            if (string.IsNullOrEmpty(this.NewPassword))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Password",
                    Detail = "Password is not null or empty"
                });
            }
            if (!Regex.IsMatch(this.Email, @"([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Email",
                    Detail = "Email is not valid!"
                });
            }

            if (this.NewPassword.Length < 8)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Password",
                    Detail = "Password must be at least 8 characters!"
                });
            }

            if (!Regex.IsMatch(this.NewPassword, @"^(?=.*[A-Z]).+$"))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Password",
                    Detail = "Password must contain at least 1 Upper character!"
                });
            }
            if (!Regex.IsMatch(this.NewPassword, @"^(?=.*[a-z]).+$"))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Password",
                    Detail = "Password must contain at least 1 Lower character!"
                });
            }
            if (!Regex.IsMatch(this.NewPassword, @"^(?=.*[\d]).+$"))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Password",
                    Detail = "Password must contain at least 1 digit!"
                });
            }
            if (!Regex.IsMatch(this.NewPassword, @"^(?=.*[!@#$%^&*(),.?"":{}|<>]).+$"))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Password",
                    Detail = "Password must contain at least 1 special character(!@#$%^&*(),.?\":{}|<>)!"
                });
            }
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
