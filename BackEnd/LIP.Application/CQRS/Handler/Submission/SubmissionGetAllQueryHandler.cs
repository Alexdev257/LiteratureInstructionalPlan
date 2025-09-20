using LIP.Application.CQRS.Query.Submission;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Submission
{
    public class SubmissionGetAllQueryHandler : IRequestHandler<SubmissionGetAllQuery, IEnumerable<LIP.Domain.Entities.Submission>>
    {
        private readonly ISubmissionRepository _submissionRepository;

        public SubmissionGetAllQueryHandler(ISubmissionRepository submissionRepository)
        {
            _submissionRepository = submissionRepository;
        }

        public async Task<IEnumerable<LIP.Domain.Entities.Submission>> Handle(SubmissionGetAllQuery request, CancellationToken cancellationToken)
        {
            return await _submissionRepository.GetAllAsync(request);
        }
    }
}