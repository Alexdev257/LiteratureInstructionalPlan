using LIP.Application.CQRS.Command.Answerguide;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Answerguide
{
    public class AnswerguideCreateCommandHandler : IRequestHandler<AnswerguideCreateCommand, bool>
    {
        private readonly IAnswerguideRepository _answerguideRepository;

        public AnswerguideCreateCommandHandler(IAnswerguideRepository answerguideRepository)
        {
            _answerguideRepository = answerguideRepository;
        }

        public async Task<bool> Handle(AnswerguideCreateCommand request, CancellationToken cancellationToken)
        {
            return await _answerguideRepository.CreateAsync(request);
        }
    }
}