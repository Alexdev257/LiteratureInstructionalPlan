using LIP.Application.CQRS.Query.Examtype;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examtype
{
    public class ExamtypeGetAllQueryHandler : IRequestHandler<ExamtypeGetAllQuery, IEnumerable<LIP.Domain.Entities.ExamType>>
    {
        private readonly IExamtypeRepository _examtypeRepository;

        public ExamtypeGetAllQueryHandler(IExamtypeRepository examtypeRepository)
        {
            _examtypeRepository = examtypeRepository;
        }

        public async Task<IEnumerable<LIP.Domain.Entities.ExamType>> Handle(ExamtypeGetAllQuery request, CancellationToken cancellationToken)
        {
            return await _examtypeRepository.GetAllAsync(request);
        }
    }
}