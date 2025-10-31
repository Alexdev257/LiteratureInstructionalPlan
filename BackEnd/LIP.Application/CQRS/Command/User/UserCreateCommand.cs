using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Validation;
using MediatR;
using System.Text.RegularExpressions;

namespace LIP.Application.CQRS.Command.User
{
    public class UserCreateCommand : IRequest<UserCreateResponse>, IValidatable<UserCreateResponse>
    {
        public string UserName { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int? RoleId { get; set; }
        public DateTime? CreatedAt { get; set; }

        public Task<UserCreateResponse> ValidateAsync()
        {
            UserCreateResponse response = new UserCreateResponse();
            if (string.IsNullOrEmpty(this.UserName))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserName",
                    Detail = "Username is not null or empty!"
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


            if (string.IsNullOrEmpty(this.FullName))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "FullName",
                    Detail = "FullName is not null or empty!"
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


            if (string.IsNullOrEmpty(this.Email))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Email",
                    Detail = "Email is not null or empty!"
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

            if (string.IsNullOrEmpty(this.Password))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Password",
                    Detail = "Password is not null or empty!"
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

            if (string.IsNullOrEmpty(RoleId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "RoleID",
                    Detail = "RoleID is not null or empty!"
                });
            }

            if (!Int32.TryParse(this.RoleId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "RoleId",
                    Detail = "RoleId must be an integer!"
                });
            }

            //if (string.IsNullOrEmpty(CreatedAt.ToString()))
            //{
            //    response.ListErrors.Add(new Errors
            //    {
            //        Field = "CreatedAt",
            //        Detail = "CreatedAt is not null or empty!"
            //    });
            //}
            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}