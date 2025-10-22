using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Gradelevel
{
    public class GradelevelGetAllQuery : IRequest<IEnumerable<LIP.Domain.Entities.GradeLevel>>
    {
        public string? Name { get; set; }
    }
}