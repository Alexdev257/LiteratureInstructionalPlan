using MediatR;
using LIP.Domain.Entities;

namespace LIP.Application.CQRS.Query.Submission
{
    public class SubmissionGetQuery : IRequest<LIP.Domain.Entities.Submission?>
    {
        public int SubmissionId { get; set; }
    }
}