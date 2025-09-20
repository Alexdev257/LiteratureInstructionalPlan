using MediatR;

namespace LIP.Application.CQRS.Command.User
{
    public class UserUpdateCommand : IRequest<bool>
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int? RoleId { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}