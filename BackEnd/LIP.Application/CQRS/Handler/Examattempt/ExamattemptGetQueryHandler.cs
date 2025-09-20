using LIP.Application.CQRS.Query.Examattempt;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examattempt
{
    public class ExamattemptGetQueryHandler : IRequestHandler<ExamattemptGetQuery, LIP.Domain.Entities.Examattempt?>
    {
        private readonly IExamattemptRepository _examattemptRepository;

        public ExamattemptGetQueryHandler(IExamattemptRepository examattemptRepository)
        {
            _examattemptRepository = examattemptRepository;
        }

        public async Task<LIP.Domain.Entities.Examattempt?> Handle(ExamattemptGetQuery request, CancellationToken cancellationToken)
        {
            return await _examattemptRepository.GetAsync(request);
        }
    }
}