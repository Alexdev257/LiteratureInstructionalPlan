using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Role
{
    public class RoleGetQuery : IRequest<LIP.Domain.Entities.Role?>
    {
        public int RoleId { get; set; }
    }
}