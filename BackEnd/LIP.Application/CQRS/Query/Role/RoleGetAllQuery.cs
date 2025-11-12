using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Role
{
    public class RoleGetAllQuery : IRequest<IEnumerable<LIP.Domain.Entities.Role>>
    {
        public string? RoleName { get; set; }
    }
}