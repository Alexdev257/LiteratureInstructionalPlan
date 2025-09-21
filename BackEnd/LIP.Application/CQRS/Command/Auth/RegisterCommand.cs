using LIP.Application.DTOs.Response.Auth;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Repository;

namespace LIP.Application.CQRS.Command.Auth
{
    public class RegisterCommand : IRequest<RegisterResponse>, IValidatable<RegisterResponse>
    {
        public string UserName { get; set; } = null!;

        public string FullName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public Task<RegisterResponse> ValidateAsync()
        {
            RegisterResponse response = new();
            if (string.IsNullOrEmpty(this.UserName))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Username",
                    Detail = "Username is null or empty"
                });
            }
            if (string.IsNullOrEmpty(this.FullName))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Fullname",
                    Detail = "Fullname is null or empty"
                });
            }
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

            if (!Regex.IsMatch(this.UserName, @"([a-zA-Z\d]+)"))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Username",
                    Detail = "Username is not allowed special characters!"
                });
            }

            if (!Regex.IsMatch(this.FullName, @"([a-zA-Z\s]+)"))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Fullname",
                    Detail = "Fullname is not allowed special characters and digits!"
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

            if (this.Password.Length < 8)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Password",
                    Detail = "Password must be at least 8 characters!"
                });
            }

            if(!Regex.IsMatch(this.Password, @"^(?=.*[A-Z]).+$"))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Password",
                    Detail = "Password must contain at least 1 Upper character!"
                });
            }
            if(!Regex.IsMatch(this.Password, @"^(?=.*[a-z]).+$"))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Password",
                    Detail = "Password must contain at least 1 Lower character!"
                });
            }
            if (!Regex.IsMatch(this.Password, @"^(?=.*[\d]).+$"))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Password",
                    Detail = "Password must contain at least 1 digit!"
                });
            }
            if (!Regex.IsMatch(this.Password, @"^(?=.*[!@#$%^&*(),.?"":{}|<>]).+$"))
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
