using LIP.Application.CQRS.Query.Exam;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Exam
{
    public class ExamGetAllQueryHandler : IRequestHandler<ExamGetAllQuery, IEnumerable<LIP.Domain.Entities.Exam>>
    {
        private readonly IExamRepository _examRepository;

        public ExamGetAllQueryHandler(IExamRepository examRepository)
        {
            _examRepository = examRepository;
        }

        public async Task<IEnumerable<LIP.Domain.Entities.Exam>> Handle(ExamGetAllQuery request, CancellationToken cancellationToken)
        {
            return await _examRepository.GetAllAsync(request);
        }
    }
}