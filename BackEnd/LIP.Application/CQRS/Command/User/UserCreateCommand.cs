using MediatR;

namespace LIP.Application.CQRS.Command.User
{
    public class UserCreateCommand : IRequest<bool>
    {
        public string UserName { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int? RoleId { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}