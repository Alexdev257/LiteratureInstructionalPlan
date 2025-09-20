using MediatR;

namespace LIP.Application.CQRS.Command.Role
{
    public class RoleCreateCommand : IRequest<bool>
    {
        public string RoleName { get; set; } = null!;
    }
}