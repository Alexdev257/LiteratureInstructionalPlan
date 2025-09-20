using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Gradelevel
{
    public class GradelevelGetAllQuery : IRequest<IEnumerable<LIP.Domain.Entities.Gradelevel>>
    {
        public string? Name { get; set; }
    }
}