using LIP.Application.CQRS.Command.Practicequestion;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Practicequestion
{
    public class PracticequestionDeleteCommandHandler : IRequestHandler<PracticequestionDeleteCommand, bool>
    {
        private readonly IPracticequestionRepository _practicequestionRepository;

        public PracticequestionDeleteCommandHandler(IPracticequestionRepository practicequestionRepository)
        {
            _practicequestionRepository = practicequestionRepository;
        }

        public async Task<bool> Handle(PracticequestionDeleteCommand request, CancellationToken cancellationToken)
        {
            return await _practicequestionRepository.DeleteAsync(request);
        }
    }
}