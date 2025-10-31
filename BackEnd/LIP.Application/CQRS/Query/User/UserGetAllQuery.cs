using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.User
{
    public class UserGetAllQuery : IRequest<IEnumerable<LIP.Domain.Entities.User>>
    {
        public int? RoleId { get; set; } = null!;
        public string? Email { get; set; } = null!;
        public bool? IsAdmin { get; set; } = false!;
    }
}