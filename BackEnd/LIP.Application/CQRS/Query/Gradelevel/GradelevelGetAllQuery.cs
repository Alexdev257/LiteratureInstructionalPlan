using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Query.Gradelevel;

public class GradelevelGetAllQuery : IRequest<IEnumerable<GradeLevel>>
{
    public string? Name { get; set; }
}