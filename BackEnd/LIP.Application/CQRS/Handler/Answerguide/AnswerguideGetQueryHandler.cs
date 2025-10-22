using LIP.Application.CQRS.Query.Answerguide;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Answerguide
{
    public class AnswerguideGetQueryHandler : IRequestHandler<AnswerguideGetQuery, LIP.Domain.Entities.AnswerGuide?>
    {
        private readonly IAnswerguideRepository _answerguideRepository;

        public AnswerguideGetQueryHandler(IAnswerguideRepository answerguideRepository)
        {
            _answerguideRepository = answerguideRepository;
        }

        public async Task<LIP.Domain.Entities.AnswerGuide?> Handle(AnswerguideGetQuery request, CancellationToken cancellationToken)
        {
            return await _answerguideRepository.GetAsync(request);
        }
    }
}