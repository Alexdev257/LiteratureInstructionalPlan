using LIP.Application.DTOs.Response;
using LIP.Application.DTOs.Response.Role;
using LIP.Application.Interface.Validation;
using MediatR;

namespace LIP.Application.CQRS.Command.Role
{
    public class RoleCreateCommand : IRequest<RoleCreateResponse>, IValidatable<RoleCreateResponse>
    {
        public string RoleName { get; set; } = string.Empty;

        public Task<RoleCreateResponse> ValidateAsync()
        {
            RoleCreateResponse response = new();

            if (string.IsNullOrEmpty(this.RoleName))
            {

                response.ListErrors.Add(new Errors
                {
                    Field = "Rolename",
                    Detail = "Role is null or empty"
                });
            }

            if (response.ListErrors.Count > 0) response.IsSuccess = false;

            return Task.FromResult(response);
        }
    }
}