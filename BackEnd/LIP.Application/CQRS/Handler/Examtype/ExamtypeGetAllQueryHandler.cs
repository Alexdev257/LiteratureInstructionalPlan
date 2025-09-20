using LIP.Application.CQRS.Query.Examtype;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examtype
{
    public class ExamtypeGetAllQueryHandler : IRequestHandler<ExamtypeGetAllQuery, IEnumerable<LIP.Domain.Entities.Examtype>>
    {
        private readonly IExamtypeRepository _examtypeRepository;

        public ExamtypeGetAllQueryHandler(IExamtypeRepository examtypeRepository)
        {
            _examtypeRepository = examtypeRepository;
        }

        public async Task<IEnumerable<LIP.Domain.Entities.Examtype>> Handle(ExamtypeGetAllQuery request, CancellationToken cancellationToken)
        {
            return await _examtypeRepository.GetAllAsync(request);
        }
    }
}