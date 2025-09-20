using MediatR;

namespace LIP.Application.CQRS.Command.Role
{
    public class RoleDeleteCommand : IRequest<bool>
    {
        public int RoleId { get; set; }
    }
}