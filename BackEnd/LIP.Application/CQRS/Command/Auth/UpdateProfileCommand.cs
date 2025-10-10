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
    public class UpdateProfileCommand : IRequest<UpdateProfileResponse>, IValidatable<UpdateProfileResponse>
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public string FullName { get; set; } = null!;

        public Task<UpdateProfileResponse> ValidateAsync()
        {
            UpdateProfileResponse response = new UpdateProfileResponse();
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
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
