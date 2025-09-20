using LIP.Application.CQRS.Command.Submission;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Submission
{
    public class SubmissionUpdateCommandHandler : IRequestHandler<SubmissionUpdateCommand, bool>
    {
        private readonly ISubmissionRepository _submissionRepository;

        public SubmissionUpdateCommandHandler(ISubmissionRepository submissionRepository)
        {
            _submissionRepository = submissionRepository;
        }

        public async Task<bool> Handle(SubmissionUpdateCommand request, CancellationToken cancellationToken)
        {
            return await _submissionRepository.UpdateAsync(request);
        }
    }
}