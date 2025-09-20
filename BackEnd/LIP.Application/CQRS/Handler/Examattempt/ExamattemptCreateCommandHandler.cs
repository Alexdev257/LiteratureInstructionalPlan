using LIP.Application.CQRS.Command.Examattempt;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examattempt
{
    public class ExamattemptCreateCommandHandler : IRequestHandler<ExamattemptCreateCommand, bool>
    {
        private readonly IExamattemptRepository _examattemptRepository;

        public ExamattemptCreateCommandHandler(IExamattemptRepository examattemptRepository)
        {
            _examattemptRepository = examattemptRepository;
        }

        public async Task<bool> Handle(ExamattemptCreateCommand request, CancellationToken cancellationToken)
        {
            return await _examattemptRepository.CreateAsync(request);
        }
    }
}