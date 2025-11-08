using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Query.Gradelevel;

public class GradelevelGetQuery : IRequest<GradeLevel?>
{
    public int GradeLevelId { get; set; }
}