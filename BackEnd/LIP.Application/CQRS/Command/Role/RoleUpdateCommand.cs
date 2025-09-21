using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Role;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Role
{
    public class RoleUpdateCommand : IRequest<RoleUpdateResponse>, IValidatable<RoleUpdateResponse>
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; } = null!;

        public Task<RoleUpdateResponse> ValidateAsync()
        {
            var response = new RoleUpdateResponse();

            if (string.IsNullOrEmpty(this.RoleName))
            {
                response.ListErrors.Add(new Errors
                {
                    Field = "Rolename",
                    Detail = "Rolename is null or empty"
                });
            }

            if (response.ListErrors.Count > 0) response.IsSuccess = false;

            return Task.FromResult(response);
        }
    }
}