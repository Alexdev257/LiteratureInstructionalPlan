using LIP.Application.CQRS.Command.Examattempt;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examattempt
{
    public class ExamattemptDeleteCommandHandler : IRequestHandler<ExamattemptDeleteCommand, bool>
    {
        private readonly IExamattemptRepository _examattemptRepository;

        public ExamattemptDeleteCommandHandler(IExamattemptRepository examattemptRepository)
        {
            _examattemptRepository = examattemptRepository;
        }

        public async Task<bool> Handle(ExamattemptDeleteCommand request, CancellationToken cancellationToken)
        {
            return await _examattemptRepository.DeleteAsync(request);
        }
    }
}