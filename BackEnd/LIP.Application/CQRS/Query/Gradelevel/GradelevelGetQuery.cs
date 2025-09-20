using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Gradelevel
{
    public class GradelevelGetQuery : IRequest<LIP.Domain.Entities.Gradelevel?>
    {
        public int GradeLevelId { get; set; }
    }
}