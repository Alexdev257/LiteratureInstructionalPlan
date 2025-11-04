using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Examattempt
{
    public class ExamattemptGetQuery : IRequest<LIP.Domain.Entities.ExamAttempt?>
    {
        public int AttemptId { get; set; }
        public bool? IsAdmin { get; set; } = false!;
    }
}