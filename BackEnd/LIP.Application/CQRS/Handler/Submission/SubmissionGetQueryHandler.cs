using LIP.Application.CQRS.Query.Submission;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Submission
{
    public class SubmissionGetQueryHandler : IRequestHandler<SubmissionGetQuery, LIP.Domain.Entities.Submission?>
    {
        private readonly ISubmissionRepository _submissionRepository;

        public SubmissionGetQueryHandler(ISubmissionRepository submissionRepository)
        {
            _submissionRepository = submissionRepository;
        }

        public async Task<LIP.Domain.Entities.Submission?> Handle(SubmissionGetQuery request, CancellationToken cancellationToken)
        {
            return await _submissionRepository.GetAsync(request);
        }
    }
}