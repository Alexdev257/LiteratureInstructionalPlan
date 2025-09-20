using MediatR;

namespace LIP.Application.CQRS.Command.Role
{
    public class RoleUpdateCommand : IRequest<bool>
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; } = null!;
    }
}