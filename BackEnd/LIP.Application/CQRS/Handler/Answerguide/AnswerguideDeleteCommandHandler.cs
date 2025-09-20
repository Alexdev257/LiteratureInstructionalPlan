using LIP.Application.CQRS.Command.Answerguide;
using LIP.Application.Interface.Repository;
using MediatR;

namespace LIP.Application.CQRS.Handler.Answerguide
{
    public class AnswerguideDeleteCommandHandler : IRequestHandler<AnswerguideDeleteCommand, bool>
    {
        private readonly IAnswerguideRepository _answerguideRepository;

        public AnswerguideDeleteCommandHandler(IAnswerguideRepository answerguideRepository)
        {
            _answerguideRepository = answerguideRepository;
        }

        public async Task<bool> Handle(AnswerguideDeleteCommand request, CancellationToken cancellationToken)
        {
            return await _answerguideRepository.DeleteAsync(request);
        }
    }
}