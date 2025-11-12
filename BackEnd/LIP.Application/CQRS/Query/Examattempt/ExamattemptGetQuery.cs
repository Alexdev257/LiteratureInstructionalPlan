using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Examattempt
{
    public class ExamattemptGetQuery : IRequest<LIP.Domain.Entities.Examattempt?>
    {
        public int AttemptId { get; set; }
    }
}