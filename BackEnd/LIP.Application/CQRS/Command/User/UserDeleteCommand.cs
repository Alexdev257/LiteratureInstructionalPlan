using MediatR;

namespace LIP.Application.CQRS.Command.User
{
    public class UserDeleteCommand : IRequest<bool>
    {
        public int UserId { get; set; }
    }
}