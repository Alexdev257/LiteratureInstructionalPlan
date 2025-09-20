using LIP.Application.CQRS.Command.Examattempt;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examattempt
{
    public class ExamattemptUpdateCommandHandler : IRequestHandler<ExamattemptUpdateCommand, bool>
    {
        private readonly IExamattemptRepository _examattemptRepository;

        public ExamattemptUpdateCommandHandler(IExamattemptRepository examattemptRepository)
        {
            _examattemptRepository = examattemptRepository;
        }

        public async Task<bool> Handle(ExamattemptUpdateCommand request, CancellationToken cancellationToken)
        {
            return await _examattemptRepository.UpdateAsync(request);
        }
    }
}