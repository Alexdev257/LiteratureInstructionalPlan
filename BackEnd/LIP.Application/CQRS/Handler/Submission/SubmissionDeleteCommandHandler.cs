using LIP.Application.CQRS.Command.Submission;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Submission
{
    public class SubmissionDeleteCommandHandler : IRequestHandler<SubmissionDeleteCommand, bool>
    {
        private readonly ISubmissionRepository _submissionRepository;

        public SubmissionDeleteCommandHandler(ISubmissionRepository submissionRepository)
        {
            _submissionRepository = submissionRepository;
        }

        public async Task<bool> Handle(SubmissionDeleteCommand request, CancellationToken cancellationToken)
        {
            return await _submissionRepository.DeleteAsync(request);
        }
    }
}