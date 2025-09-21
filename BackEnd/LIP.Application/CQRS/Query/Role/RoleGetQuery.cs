using MediatR;
using LIP.Domain.Entities;
using LIP.Application.DTOs.Response.Role;
using LIP.Application.Interface.Validation;
using LIP.Application.DTOs.Response;

namespace LIP.Application.CQRS.Query.Role
{
    public class RoleGetQuery : IRequest<RoleGetResponse>, IValidatable<RoleGetResponse>
    {
        public int RoleId { get; set; }

        public Task<RoleGetResponse> ValidateAsync()
        {
            var response = new RoleGetResponse();

            if (this.RoleId == 0)
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "RoleId",
                    Detail = "RoleId can not is 0"
                });
            }

            if (response.ListErrors.Count > 0) response.IsSuccess = false;

            return Task.FromResult(response);
        }
    }
}