using LIP.Application.CQRS.Command.Answerguide;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Answerguide
{
    public class AnswerguideUpdateCommandHandler : IRequestHandler<AnswerguideUpdateCommand, bool>
    {
        private readonly IAnswerguideRepository _answerguideRepository;

        public AnswerguideUpdateCommandHandler(IAnswerguideRepository answerguideRepository)
        {
            _answerguideRepository = answerguideRepository;
        }

        public async Task<bool> Handle(AnswerguideUpdateCommand request, CancellationToken cancellationToken)
        {
            return await _answerguideRepository.UpdateAsync(request);
        }
    }
}