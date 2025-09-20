using LIP.Application.CQRS.Command.Submission;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Submission
{
    public class SubmissionCreateCommandHandler : IRequestHandler<SubmissionCreateCommand, bool>
    {
        private readonly ISubmissionRepository _submissionRepository;

        public SubmissionCreateCommandHandler(ISubmissionRepository submissionRepository)
        {
            _submissionRepository = submissionRepository;
        }

        public async Task<bool> Handle(SubmissionCreateCommand request, CancellationToken cancellationToken)
        {
            return await _submissionRepository.CreateAsync(request);
        }
    }
}