using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Gradelevel
{
    public class GradelevelGetQuery : IRequest<LIP.Domain.Entities.GradeLevel?>
    {
        public int GradeLevelId { get; set; }
    }
}