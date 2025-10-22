using LIP.Application.CQRS.Query.Practicequestion;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Practicequestion
{
    public class PracticequestionGetAllQueryHandler : IRequestHandler<PracticequestionGetAllQuery, IEnumerable<LIP.Domain.Entities.PracticeQuestion>>
    {
        private readonly IPracticequestionRepository _practicequestionRepository;

        public PracticequestionGetAllQueryHandler(IPracticequestionRepository practicequestionRepository)
        {
            _practicequestionRepository = practicequestionRepository;
        }

        public async Task<IEnumerable<LIP.Domain.Entities.PracticeQuestion>> Handle(PracticequestionGetAllQuery request, CancellationToken cancellationToken)
        {
            return await _practicequestionRepository.GetAllAsync(request);
        }
    }
}