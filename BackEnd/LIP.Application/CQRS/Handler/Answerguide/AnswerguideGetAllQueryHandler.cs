using LIP.Application.CQRS.Query.Answerguide;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Answerguide
{
    public class AnswerguideGetAllQueryHandler : IRequestHandler<AnswerguideGetAllQuery, IEnumerable<LIP.Domain.Entities.AnswerGuide>>
    {
        private readonly IAnswerguideRepository _answerguideRepository;

        public AnswerguideGetAllQueryHandler(IAnswerguideRepository answerguideRepository)
        {
            _answerguideRepository = answerguideRepository;
        }

        public async Task<IEnumerable<LIP.Domain.Entities.AnswerGuide>> Handle(AnswerguideGetAllQuery request, CancellationToken cancellationToken)
        {
            return await _answerguideRepository.GetAllAsync(request);
        }
    }
}