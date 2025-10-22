using LIP.Application.CQRS.Query.Examtype;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examtype
{
    public class ExamtypeGetQueryHandler : IRequestHandler<ExamtypeGetQuery, LIP.Domain.Entities.ExamType?>
    {
        private readonly IExamtypeRepository _examtypeRepository;

        public ExamtypeGetQueryHandler(IExamtypeRepository examtypeRepository)
        {
            _examtypeRepository = examtypeRepository;
        }

        public async Task<LIP.Domain.Entities.ExamType?> Handle(ExamtypeGetQuery request, CancellationToken cancellationToken)
        {
            return await _examtypeRepository.GetAsync(request);
        }
    }
}