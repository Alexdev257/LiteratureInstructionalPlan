using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Validation;
using MediatR;
using System.Text.RegularExpressions;

namespace LIP.Application.CQRS.Command.User
{
    public class UserUpdateCommand : IRequest<UserUpdateResponse>, IValidatable<UserUpdateResponse>
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int? RoleId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public bool? IsDeleted { get; set; }

        public Task<UserUpdateResponse> ValidateAsync()
        {
            UserUpdateResponse response = new UserUpdateResponse();
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
            if (string.IsNullOrEmpty(this.RoleId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "RoleId",
                    Detail = "RoleId is not null or empty!"
                });
            }
            if (string.IsNullOrEmpty(this.CreatedAt.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "CreatedAt",
                    Detail = "CreatedAt is not null or empty!"
                });
            }
            if (string.IsNullOrEmpty(this.DeletedAt.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "DeletedAt",
                    Detail = "DeletedAt is not null or empty!"
                });
            }
            if (string.IsNullOrEmpty(this.IsDeleted.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "IsDeleted",
                    Detail = "IsDeleted is not null or empty!"
                });
            }
            if (Boolean.TryParse(this.IsDeleted.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "IsDeleted",
                    Detail = "IsDeleted must be boolean value!"
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

            if (response.ListErrors.Count > 0) response.IsSuccess = false;


            return Task.FromResult(response);
        }
    }
}