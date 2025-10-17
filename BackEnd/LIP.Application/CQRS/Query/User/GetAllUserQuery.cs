using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.User;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Query.User
{
    public class GetAllUserQuery : IRequest<GetAllUserResponse>, IValidatable<GetAllUserResponse>
    {
        public int? RoleId { get; set; } = null!;
        public string? Email { get; set; } = null!;

        public Task<GetAllUserResponse> ValidateAsync()
        {
            GetAllUserResponse response = new GetAllUserResponse();
            if (RoleId != null)
            {
                if (!Int32.TryParse(RoleId.ToString(), out var _))
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "RoleId",
                        Detail = "RoleId must be an Integer!"
                    });
                }
            }
            if (Email != null)
            {
                if (!Regex.IsMatch(this.Email, @"([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"))
                {
                    response.ListErrors.Add(new Errors
                    {
                        Field = "Email",
                        Detail = "Email is not valid!"
                    });
                }
            }

            if (response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
