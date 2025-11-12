using LIP.Application.CQRS.Command.Practicequestion;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Practicequestion
{
    public class PracticequestionCreateCommandHandler : IRequestHandler<PracticequestionCreateCommand, bool>
    {
        private readonly IPracticequestionRepository _practicequestionRepository;

        public PracticequestionCreateCommandHandler(IPracticequestionRepository practicequestionRepository)
        {
            _practicequestionRepository = practicequestionRepository;
        }

        public async Task<bool> Handle(PracticequestionCreateCommand request, CancellationToken cancellationToken)
        {
            return await _practicequestionRepository.CreateAsync(request);
        }
    }
}