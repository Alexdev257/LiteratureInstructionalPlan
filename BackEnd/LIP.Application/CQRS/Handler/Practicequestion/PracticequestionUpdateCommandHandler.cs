using LIP.Application.CQRS.Command.Practicequestion;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Practicequestion
{
    public class PracticequestionUpdateCommandHandler : IRequestHandler<PracticequestionUpdateCommand, bool>
    {
        private readonly IPracticequestionRepository _practicequestionRepository;

        public PracticequestionUpdateCommandHandler(IPracticequestionRepository practicequestionRepository)
        {
            _practicequestionRepository = practicequestionRepository;
        }

        public async Task<bool> Handle(PracticequestionUpdateCommand request, CancellationToken cancellationToken)
        {
            return await _practicequestionRepository.UpdateAsync(request);
        }
    }
}