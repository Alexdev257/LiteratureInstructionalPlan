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
    public class ChangeEmailCommand : IRequest<ChangeEmailResponse>, IValidatable<ChangeEmailResponse>
    {
        public int UserId { get; set; }
        public string NewEmail { get; set; } = null!;

        public Task<ChangeEmailResponse> ValidateAsync()
        {
            ChangeEmailResponse response = new ChangeEmailResponse();
            if (string.IsNullOrEmpty(this.UserId.ToString()))
            {
                response.ListErrors.Add(new DTOs.Response.Errors
                {
                    Field = "UserId",
                    Detail = "UserId is not null or empty"
                });
            }

            if (string.IsNullOrEmpty(this.NewEmail.ToString()))
            {
                response.ListErrors.Add(new DTOs.Response.Errors
                {
                    Field = "NewEmail",
                    Detail = "New Email is not null or empty"
                });
            }
            if (!Regex.IsMatch(this.NewEmail, @"([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Email",
                    Detail = "Email is not valid!"
                });
            }
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
