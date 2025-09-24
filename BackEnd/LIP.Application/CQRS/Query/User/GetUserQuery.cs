using LIP.Application.DTOs.Response.User;
using LIP.Application.DTOs.Response;
using LIP.Application.Interface.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIP.Application.CQRS.Query.User
{
    public class GetUserQuery : IRequest<GetUserReponse>, IValidatable<GetUserReponse>
    {
        public int UserId { get; set; }

        public Task<GetUserReponse> ValidateAsync()
        {
            var response = new GetUserReponse();
            if (string.IsNullOrEmpty(UserId.ToString()))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "UserId is not null or empty!"
                });
            }
            if (!Int32.TryParse(UserId.ToString(), out var _))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "UserId must be an Integer!"
                });
            }
            if (UserId <= 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "UserId",
                    Detail = "UserId must be larger than 0!"
                });
            }
            if(response.ListErrors.Count > 0) response.IsSuccess = false;
            return Task.FromResult(response);
        }
    }
}
