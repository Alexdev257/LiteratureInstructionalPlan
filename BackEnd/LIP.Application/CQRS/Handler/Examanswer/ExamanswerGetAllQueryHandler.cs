using LIP.Application.CQRS.Query.Examanswer;
using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using MediatR;

namespace LIP.Application.CQRS.Handler.Examanswer
{
    public class ExamanswerGetAllQueryHandler : IRequestHandler<ExamanswerGetAllQuery, IEnumerable<LIP.Domain.Entities.Examanswer>>
    {
        private readonly IExamanswerRepository _examanswerRepository;

        public ExamanswerGetAllQueryHandler(IExamanswerRepository examanswerRepository)
        {
            _examanswerRepository = examanswerRepository;
        }

        public async Task<IEnumerable<LIP.Domain.Entities.Examanswer>> Handle(ExamanswerGetAllQuery request, CancellationToken cancellationToken)
        {
            return await _examanswerRepository.GetAllAsync(request);
        }
    }
}