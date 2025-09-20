using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.User
{
    public class UserGetAllQuery : IRequest<IEnumerable<LIP.Domain.Entities.User>>
    {
        public int? RoleId { get; set; }
        public string? Email { get; set; }
    }
}